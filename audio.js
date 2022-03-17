const context = new AudioContext();
let startTime;
const tempo = 80;
const largoDeNota = (60 / tempo) / 2;
const octava = 1;
let banderaTiempoNormal;
let tiempoInicialAcorde;       

const playInput = (simbolos) => {
    banderaTiempoNormal = 1;
    tiempoInicialAcorde = 0;        
    startTime = context.currentTime;
    console.log(simbolos[0].instrucciones);
    eval(simbolos[0].instrucciones);
};

//====================================================
//|   obtiene frecuencia de la nota                  |
//====================================================
const getFreq = (nota) => {
  let frecuencia;
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
            frecuencia = 493.88;
            break;
    }
  return frecuencia;
}
//====================================================


//====================================================
//|    función para reproducir las notas             |
//====================================================
const nota = (freq, orden, stopT = largoDeNota) => {
    const startT = startTime + (orden * largoDeNota);
    const oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.frequency.value = freq;

    oscillator.start(startT);
    oscillator.stop(startT + stopT);
}//===================================================

//====================================================
//|    función para transportar las notas            |
//====================================================

const tansportar = (octava = 1, S) => {
    S.inst(octava);
}
//===================================================

//====================================================
//|    función para generar los acordes              |
//====================================================

const acorde = (tiempoInicial, S) => {
    S.inst(tiempoInicial, 0);
}
//===================================================

//====================================================
//|    función para generar los loops                |
//====================================================
const loop = (repeticiones, S) => {
    S.inst(repeticiones);
}
//===================================================

