function analisis(entrada) {

    var i = 0;
    var pila = [];
    var accion;
    var estado = 0;
    var noHayError = true;
    var simbolos = [];
    var simbolos_codigo = [];
    var pasoSecuencia = 0;
    var notas = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    while (noHayError) { // comienza el análisis sintáctico


        pila.push(estado);
        console.log("pila: " + pila);
        console.log("entrada: " + entrada);
        console.log("simbolos_codigo: " + simbolos_codigo);



        //====================================================
        //|   encuentra la acción en la tabla slr             |
        //====================================================
        var tipoDeDato = '';
        if (notas.includes(entrada[0])) { //si el valor de entrada es una de las notas
            tipoDeDato = 'nota';
            accion = tabla[estado][tipoDeDato];
        } else if (!isNaN(entrada[0])) { // si es número
            if (entrada[0].indexOf('.') == -1) { //si no tiene punto decimal se toma como [int]
                tipoDeDato = '[int]';
                accion = tabla[estado][tipoDeDato];
            } else {
                tipoDeDato = '[float]';
                accion = tabla[estado][tipoDeDato];
            }
        } else {
            accion = tabla[estado][entrada[0]];
        }
        console.log("accion: " + accion);

        if (typeof(accion) == 'undefined') { // si no existe el elemento en la tabla hay error
            noHayError = false;
            console.log("--------------------");
            console.log("cadena no aceptada");
        }
        //====================================================



        //====================================================
        //|   encuentra la acción en la tabla slr             |
        //====================================================
        else if (accion[0] == "s") { // si la acción es un shift =======================================================

            estado = accion.replace("s", ""); //remueve 's' de la acción para obtener el estado al que lleva el shift

            //guarda el tipo de dato en la tabla de símbolos
            if (tipoDeDato == 'nota' || tipoDeDato == '[float]' || tipoDeDato == '[int]') {
                simbolos.push({
                        id: tipoDeDato,
                        valor: entrada.shift()
                    } //si es int, float o nota, guarda el valor del lexema
                );
            } else {
                simbolos.push({
                    id: entrada.shift()
                });
            }

            console.log("imprime simbolos: " + JSON.stringify(simbolos, null, '\t'));
        }
        //========================================================================================================
        else if (accion[0] == "r") { // si la acción es un reduce ====================================================

            reduce = reglas[accion[1]][2]; //encuentra el largo de la regla a reducir
            console.log("reduce: " + reduce);


            var subin;
            if (typeof(simbolos[0]) != 'undefined' && simbolos[0].id == 'S') {
                subin = 1; //agrega un subíndice 1 si encuentra un segundo no-terminal S
            } else {
                subin = 0
            }




            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////// GENERACIÓN DE CÓDIGO ////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////

            // función para encontrar tokens en la tabla de símbolos
            function encontrarToken(token) {
                return simbolos.filter(function(sim) {
                    return sim.id === token;
                });

            }


            if (accion[1] == 0) { // si la regla a reducir es la 0: S -> transportar [float] ( S )
                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-1]; //encuentra el no terminal S(1)
                var floatArray = encontrarToken('[float]');
                var float = floatArray[floatArray.length-1]; //encuentra el float guardado en la tabla de simbolos
                pasoSecuencia++; //aumenta un paso en el contador de la secuencia de notas


                //guarda los atributos del no-terminal al que se reducirá la producción
                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S" (solo hay un no-terminal)
                    subindice: subin,
                    instrucciones: `var G={};
                          G.inst = function(octava){` + Suno.instrucciones + `};
                          tansportar(` + float.valor + `,G);`,
                    comienza: pasoSecuencia,
                    fin: pasoSecuencia + 1
                };
            }


            if (accion[1] == 1) { // si la regla a reducir es la 1: S -> acorde ( S )

                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-1]; //encuentra el no terminal S(1)
                pasoSecuencia = Suno.comienza + 1; //reducir pasoSecuencia dependiendo del largo de S

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: `var F={};
                            F.inst = function(tiempoInicialAcorde,banderaTiempoNormal)
                            {` + Suno.instrucciones + `};
                            acorde(` + pasoSecuencia + `,F);`,
                    comienza: Suno.comienza,
                    fin: Suno.comienza + 1
                };


            }


            if (accion[1] == 2) { // si la regla a reducir es la 2: S -> nota
                var notaArray = encontrarToken('nota');
                var nota = notaArray[notaArray.length-1]; // obtiene el valor de la más reciente nota
                pasoSecuencia++;

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde);`,
                    comienza: pasoSecuencia,
                    fin: pasoSecuencia + 1
                };
            }


            if (accion[1] == 3) { // si la regla a reducir es la 3: S -> nota [float]

                var notaArray = encontrarToken('nota');
                var nota = notaArray[notaArray.length-1]; // obtiene el valor de la más reciente nota
                var floatArray = encontrarToken('[float]');
                var float = floatArray[floatArray.length-1];
                pasoSecuencia++;


                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde,` + float.valor + `);`,
                    comienza: pasoSecuencia,
                    fin: pasoSecuencia + 1 //+float
                };


            }


            if (accion[1] == 4) { // si la regla a reducir es la 4: S -> loop [int] ( S )

                var intArray = encontrarToken('[int]');
                var int = intArray[intArray.length-1];

                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-1];

                var longitud = Suno.fin - Suno.comienza; //longitud de la secuencia que se repetirá

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
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



            if (accion[1] == 5) { // si la regla a reducir es la 5: S -> S transportar [float] ( S )


                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-2];
                var Sdos = SArray[SArray.length-1];

                var floatArray = encontrarToken('[float]');
                var float = floatArray[floatArray.length-1];

                pasoSecuencia++;

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: Suno.instrucciones + `var G={};
                                G.inst = function(octava){` + Sdos.instrucciones + `};
                                tansportar(` + float.valor + `,G);`,
                    comienza: pasoSecuencia,
                    fin: pasoSecuencia + 1
                };
            }



            if (accion[1] == 6) { // si la regla a reducir es la 6: S -> S loop [int] ( S )

                var intArray = encontrarToken('[int]');
                var int = intArray[intArray.length-1];

                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-2];
                var Sdos = SArray[SArray.length-1];

                var longitud = Sdos.fin - Sdos.comienza;
                console.log("longitud: " + longitud);
                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
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



            if (accion[1] == 7) { // si la regla a reducir es la 7: S -> S acorde ( S )

                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-2];
                var Sdos = SArray[SArray.length-1];
                // se reduce el contador de la secuencia para que S(2) solo dure un paso
                pasoSecuencia = Suno.comienza + 1;

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: Suno.instrucciones + `var F={};
                        F.inst = function(tiempoInicialAcorde,banderaTiempoNormal)
                        {` + Sdos.instrucciones + `};
                        acorde(` + Suno.fin + `,F);`,
                    comienza: Sdos.comienza,
                    fin: Sdos.comienza + 1
                };
            }


            if (accion[1] == 8) { // si la regla a reducir es la 8: S -> S nota

                var SArray = encontrarToken('S');
                var Suno = SArray[SArray.length-1];

                var notaArray = encontrarToken('nota');
                var nota = notaArray[notaArray.length-1];

                pasoSecuencia++;

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: S.instrucciones + `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde);`,
                    comienza: Suno.comienza,
                    fin: Suno.fin + 1
                };
            }



            if (accion[1] == 9) { // si la regla a reducir es la 9: S -> S nota [float]

                var SArray = encontrarToken('S');
                var S = SArray[SArray.length-1];

                var notaArray = encontrarToken('nota');
                var nota = notaArray[notaArray.length-1];

                var floatArray = encontrarToken('[float]');
                var float = floatArray[floatArray.length-1];

                pasoSecuencia++;

                var S = {
                    id: reglas[accion[1]][0], //en nuestra gramática siempre es "S"
                    subindice: subin,
                    instrucciones: S.instrucciones + `nota(getFreq(\'` + nota.valor + `\')*octava,` + pasoSecuencia + `*banderaTiempoNormal+tiempoInicialAcorde,` + float.valor + `);`,
                    comienza: pasoSecuencia,
                    fin: pasoSecuencia + 1
                };


            }


            ///////////////////////////////////////////////////////////////////////////

            ///////////////////////////////////////////////////////////////////////////

            //////////////////////// termina generación ///////////////////////////////

            /////////////////////////// de código /////////////////////////////////////

            ///////////////////////////////////////////////////////////////////////////

            ///////////////////////////////////////////////////////////////////////////




            // reduce los simbolos de la tabla de símbolos después de reducirlos por el no terminal
            for (var i = 0; i < reduce; i++) {
                pila.pop();
                simbolos.pop();
            }


            simbolos.push(S); //agrega a los símbolos el no terminal al que se redujo
            entrada.unshift(reglas[accion[1]][0]);


            console.log("despues del reduce:------------------------------------------");
            console.log("-- pila: " + pila);
            console.log("-- entrada: " + entrada);
            console.log("-- simbolos: " + JSON.stringify(simbolos, null, '\t'));

            estado = pila.pop();
            console.log("-- accion: " + accion);
            console.log("-- estado: " + estado);
        } //========================================================================================================
        else if (accion == "aceptar") { // si la acción es aceptar la cadena ===========================================

            noHayError = false;
            console.log("--------------------");
            console.log("cadena aceptada");

        } //========================================================================================================
        else { //si la acción es un no terminal, cambia al siguiente estado según la tabla GOTO ====================
            estado = accion;
            entrada.shift();
            //  simbolos.pop();
        } //========================================================================================================

        console.log("--------------------");

    }
    return simbolos; //regresa la tabla de simbolos que solo contiene el no terminal inicial
}
