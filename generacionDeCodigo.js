// función para encontrar tokens en la tabla de símbolos
const tokenFilter = (simbolos) => (token) => simbolos.filter((simbol) => simbol.id === token);

const generacionDeCodigo = (accion, pasoSecuencia, subin, reglas, simbolos, S) => {

    const encontrarToken = tokenFilter(simbolos);

    if (accion[1] === '0') { // si la regla a reducir es la 0: S -> transportar [float] ( S )
        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 1]; //encuentra el no terminal S(1)
        var floatArray = encontrarToken('[float]');
        var float = floatArray[floatArray.length - 1]; //encuentra el float guardado en la tabla de simbolos
        pasoSecuencia++; //aumenta un paso en el contador de la secuencia de notas

        //guarda los atributos del no-terminal al que se reducirá la producción
        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S' (solo hay un no-terminal)
            subindice: subin,
            instrucciones: `var G={};
                G.inst = function(octava){` + Suno.instrucciones + `};
                tansportar(` + float.valor + `,G);`,
            comienza: pasoSecuencia,
            fin: pasoSecuencia + 1
        };
    }

    if (accion[1] === '1') { // si la regla a reducir es la 1: S -> acorde ( S )
        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 1]; //encuentra el no terminal S(1)
        pasoSecuencia = Suno.comienza + 1; //reducir pasoSecuencia dependiendo del largo de S

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: `var F={};
                    F.inst = function(tiempoInicialAcorde,banderaTiempoNormal)
                    {` + Suno.instrucciones + `};
                    acorde(` + pasoSecuencia + `,F);`,
            comienza: Suno.comienza,
            fin: Suno.comienza + 1
        };
    }

    if (accion[1] === '2') { // si la regla a reducir es la 2: S -> nota
        var notaArray = encontrarToken('nota');
        var nota = notaArray[notaArray.length - 1]; // obtiene el valor de la más reciente nota
        pasoSecuencia++;

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde);`,
            comienza: pasoSecuencia,
            fin: pasoSecuencia + 1
        };
    }

    if (accion[1] === '3') { // si la regla a reducir es la 3: S -> nota [float]
        var notaArray = encontrarToken('nota');
        var nota = notaArray[notaArray.length - 1]; // obtiene el valor de la más reciente nota
        var floatArray = encontrarToken('[float]');
        var float = floatArray[floatArray.length - 1];
        pasoSecuencia++;
        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde,` + float.valor + `);`,
            comienza: pasoSecuencia,
            fin: pasoSecuencia + 1 //+float
        };
    }

    if (accion[1] === '4') { // si la regla a reducir es la 4: S -> loop [int] ( S )

        var intArray = encontrarToken('[int]');
        var int = intArray[intArray.length - 1];

        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 1];

        var longitud = Suno.fin - Suno.comienza; //longitud de la secuencia que se repetirá

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: `var L={};
                L.inst = function(repeticiones){
                for(var tiempoInicialAcorde=0;tiempoInicialAcorde<repeticiones*` + longitud + `;tiempoInicialAcorde+=` + longitud + `)
                {` + Suno.instrucciones + `}};
                loop(` + int.valor + `,L);
                tiempoInicialAcorde+=` + longitud * (int.valor - 1) + `;`,
            comienza: Suno.comienza,
            fin: pasoSecuencia + longitud
        };
    }

    if (accion[1] === '5') { // si la regla a reducir es la 5: S -> S transportar [float] ( S )

        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 2];
        var Sdos = SArray[SArray.length - 1];

        var floatArray = encontrarToken('[float]');
        var float = floatArray[floatArray.length - 1];

        pasoSecuencia++;

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: Suno.instrucciones + `var G={};
                        G.inst = function(octava){` + Sdos.instrucciones + `};
                        tansportar(` + float.valor + `,G);`,
            comienza: pasoSecuencia,
            fin: pasoSecuencia + 1
        };
    }

    if (accion[1] === '6') { // si la regla a reducir es la 6: S -> S loop [int] ( S )

        var intArray = encontrarToken('[int]');
        var int = intArray[intArray.length - 1];

        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 2];
        var Sdos = SArray[SArray.length - 1];

        var longitud = Sdos.fin - Sdos.comienza;
        console.log({
            longitud
        });
        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: Suno.instrucciones + `var L={};
            L.inst = function(repeticiones){
                for(var tiempoInicialAcorde=0;tiempoInicialAcorde<repeticiones*` + longitud + `;tiempoInicialAcorde+=` + longitud + `)
                {` + Sdos.instrucciones + `}};
                loop(` + int.valor + `,L);
                tiempoInicialAcorde+=` + longitud * (int.valor - 1) + `;`,
            comienza: Sdos.comienza,
            fin: pasoSecuencia + longitud
        };
    }

    if (accion[1] === '7') { // si la regla a reducir es la 7: S -> S acorde ( S )

        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 2];
        var Sdos = SArray[SArray.length - 1];
        // se reduce el contador de la secuencia para que S(2) solo dure un paso
        pasoSecuencia = Suno.comienza + 1;

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: Suno.instrucciones + `var F={};
                F.inst = function(tiempoInicialAcorde,banderaTiempoNormal)
                {` + Sdos.instrucciones + `};
                acorde(` + Suno.fin + `,F);`,
            comienza: Sdos.comienza,
            fin: Sdos.comienza + 1
        };
    }

    if (accion[1] === '8') { // si la regla a reducir es la 8: S -> S nota

        var SArray = encontrarToken('S');
        var Suno = SArray[SArray.length - 1];

        var notaArray = encontrarToken('nota');
        var nota = notaArray[notaArray.length - 1];

        pasoSecuencia++;

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: S.instrucciones + `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde);`,
            comienza: Suno.comienza,
            fin: Suno.fin + 1
        };
    }

    if (accion[1] === '9') { // si la regla a reducir es la 9: S -> S nota [float]

        var SArray = encontrarToken('S');
        var S = SArray[SArray.length - 1];

        var notaArray = encontrarToken('nota');
        var nota = notaArray[notaArray.length - 1];

        var floatArray = encontrarToken('[float]');
        var float = floatArray[floatArray.length - 1];

        pasoSecuencia++;

        var S = {
            id: reglas[accion[1]][0], //en nuestra gramática siempre es 'S'
            subindice: subin,
            instrucciones: S.instrucciones + `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde,` + float.valor + `);`,
            comienza: pasoSecuencia,
            fin: pasoSecuencia + 1
        };
    }

    return {
        S,
        pasoSecuencia
    };
}