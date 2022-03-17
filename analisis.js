const notas = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const analisis = (cadenaEntrada) => {
    const entrada = cadenaEntrada.split(' ');
    entrada.push('$');

    const pila = [];
    let accion;
    let estado = 0;
    let continuaAnalisis = true;
    const simbolos = [];
    let pasoSecuencia = 0;
    let S = '';

    while (continuaAnalisis) { // comienza el análisis sintáctico

        pila.push(estado);
        console.log('pila: ' + pila);
        console.log('entrada: ' + entrada);

        //====================================================
        //|   encuentra la acción en la tabla slr             |
        //====================================================
        let tipoDeDato = null;
        if (notas.includes(entrada[0])) { //si el valor de entrada es una de las notas
            tipoDeDato = 'nota';
        } else if (!isNaN(entrada[0])) { // si es número
            if (entrada[0].indexOf('.') === -1) { //si no tiene punto decimal se toma como [int]
                tipoDeDato = '[int]';
            } else {
                tipoDeDato = '[float]';
            }
        }
        accion = tipoDeDato ? tabla[estado][tipoDeDato] : tabla[estado][entrada[0]];
        console.log('accion: ' + accion);

        if (accion === undefined) { // si no existe el elemento en la tabla hay error
            console.log('--------------------');
            console.log('cadena no aceptada');
            return;
        }
        //====================================================

        //====================================================
        //|   encuentra la acción en la tabla slr             |
        //====================================================
        else if (accion[0] === 's') { // si la acción es un shift =======================================================

            estado = accion.replace('s', ''); //remueve 's' de la acción para obtener el estado al que lleva el shift

            //guarda el tipo de dato en la tabla de símbolos
            if (tipoDeDato === 'nota' || tipoDeDato === '[float]' || tipoDeDato == '[int]') {
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

            console.log('imprime simbolos: ' + JSON.stringify(simbolos, null, '\t'));
        }
        //========================================================================================================
        else if (accion[0] === 'r') { // si la acción es un reduce ====================================================

            reduce = reglas[accion[1]][2]; //encuentra el largo de la regla a reducir
            console.log('reduce: ' + reduce);

            //agrega un subíndice 1 si encuentra un segundo no-terminal S
            const subin = (typeof(simbolos[0]) !== 'undefined' && simbolos[0].id === 'S') ? 1 : 0;

            ({ S, pasoSecuencia } = generacionDeCodigo(accion, pasoSecuencia, subin, reglas, simbolos, S));
  
            // reduce los simbolos de la tabla de símbolos después de reducirlos por el no terminal
            for (let i = 0; i < reduce; i++) {
                pila.pop();
                simbolos.pop();
            }

            simbolos.push(S); //agrega a los símbolos el no terminal al que se redujo
            entrada.unshift(reglas[accion[1]][0]);

            console.log('despues del reduce:------------------------------------------');
            console.log('-- pila: ' + pila);
            console.log('-- entrada: ' + entrada);
            console.log('-- simbolos: ' + JSON.stringify(simbolos, null, '\t'));

            estado = pila.pop();
            console.log('-- accion: ' + accion);
            console.log('-- estado: ' + estado);
        } //========================================================================================================
        else if (accion === 'aceptar') { // si la acción es aceptar la cadena ===========================================
            continuaAnalisis = false;
            console.log('--------------------');
            console.log('cadena aceptada');

        } //========================================================================================================
        else { //si la acción es un no terminal, cambia al siguiente estado según la tabla GOTO ====================
            estado = accion;
            entrada.shift();
        } //========================================================================================================

        console.log('--------------------');

    }
    return simbolos; //regresa la tabla de simbolos que solo contiene el no terminal inicial
}
