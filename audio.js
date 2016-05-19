
//====================================================
//|   obtiene frecuencia de la nota                  |
//====================================================
function getFreq(nota){
  var frecuencia;
    switch(nota) {
    case 'c':
        frecuencia = 261.63;
        break;
    case 'd':
        frecuencia = 293.66;
        break;
    case 'e':
        frecuencia = 329.63;
        break;
    case 'f':
        frecuencia = 349.23;
        break;
    case 'g':
        frecuencia = 392;
        break;
    case 'a':
        frecuencia = 440;
    break;
    case 'b':
        frecuencia = 493.88
    break;

    case 'silencio':
       frecuencia = 0;
    }
  return frecuencia;
}
//====================================================



var context = new AudioContext();
var Instrumento = {};

Instrumento.play = function(simbolos) {

    var startTime = context.currentTime;
    var tempo = 80;
    var largoDeNota = (60 / tempo) / 2;
    var stopTime = largoDeNota;

    //====================================================
    //|    función para reproducir las notas             |
    //====================================================
    function nota(freq, orden, stopT) {
        var startT = startTime + (orden * largoDeNota);
        var oscillator = context.createOscillator();
        oscillator.connect(context.destination);
        oscillator.frequency.value = freq;

        if (stopT === undefined || stopT === null) {
            var stopT = stopTime;
        }
        oscillator.start(startT);
        oscillator.stop(startT + stopT);
    }//===================================================



    //====================================================
    //|    función para transportar las notas            |
    //====================================================
    var octava;
    if (typeof(octava == 'undefined')) {
        octava = 1;
    }

    function tansportar(octava, S) {
        S.inst(octava);
    }//===================================================

    //====================================================
    //|    función para generar los acordes              |
    //====================================================
    var banderaTiempoNormal;
    if (typeof(banderaTiempoNormal == 'undefined')) {
        banderaTiempoNormal = 1;
    }
    var tiempoInicialAcorde;
    if (typeof(tiempoInicialAcorde == 'undefined')) {
        tiempoInicialAcorde = 0;
    }
    function acorde(tiempoInicial, S) {
        var banderaTiempoNormal = 0;
        S.inst(tiempoInicial, banderaTiempoNormal);
    }//===================================================

    //====================================================
    //|    función para generar los loops                |
    //====================================================
    function loop(repeticiones, S) {
        S.inst(repeticiones);
    }//===================================================





    console.log(simbolos[0].instrucciones);
    eval(simbolos[0].instrucciones);




};
