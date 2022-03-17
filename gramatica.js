const tabla = [];

for (i=0; i<=33;i++){
  tabla[i]=[];
}

tabla[0]['transportar']='s2';
tabla[0]['acorde']='s3';
tabla[0]['nota']='s4';
tabla[0]['loop']='s5';
tabla[0]['S']='1';

tabla[1]['transportar']='s6';
tabla[1]['acorde']='s8';
tabla[1]['nota']='s9';
tabla[1]['loop']='s7';
tabla[1]['$']='aceptar';

tabla[2]['[float]']='s10';

tabla[3]['(']='s11';

tabla[4]['transportar']='r2';
tabla[4]['[float]']='s12';
tabla[4][')']='r2';
tabla[4]['acorde']='r2';
tabla[4]['nota']='r2';
tabla[4]['loop']='r2';
tabla[4]['$']='r2';

tabla[5]['[int]']='s13';

tabla[6]['[float]']='s14';

tabla[7]['[int]']='s15';

tabla[8]['(']='s16';

tabla[9]['transportar']='r8';
tabla[9]['[float]']='s17';
tabla[9]['(']='r8';
tabla[9][')']='r8';
tabla[9]['acorde']='r8';
tabla[9]['nota']='r8';
tabla[9]['loop']='r8';
tabla[9]['$']='r8';

tabla[10]['(']='s18';

tabla[11]['transportar']='s2';
tabla[11]['acorde']='s3';
tabla[11]['nota']='s4';
tabla[11]['loop']='s5';
tabla[11]['S']='19';

tabla[12]['transportar']='r3';
tabla[12][')']='r3';
tabla[12]['acorde']='r3';
tabla[12]['nota']='r3';
tabla[12]['loop']='r3';
tabla[12]['$']='r3';

tabla[13]['(']='s20';

tabla[14]['(']='s21';

tabla[15]['(']='s22';

tabla[16]['transportar']='s2';
tabla[16]['acorde']='s3';
tabla[16]['nota']='s4';
tabla[16]['loop']='s5';
tabla[16]['S']='23';

tabla[17]['transportar']='r9';
tabla[17][')']='r9';
tabla[17]['acorde']='r9';
tabla[17]['nota']='r9';
tabla[17]['loop']='r9';
tabla[17]['$']='r9';

tabla[18]['transportar']='s2';
tabla[18]['acorde']='s3';
tabla[18]['nota']='s4';
tabla[18]['loop']='s5';
tabla[18]['S']='24';

tabla[19]['transportar']='s6';
tabla[19][')']='s25';
tabla[19]['acorde']='s8';
tabla[19]['nota']='s9';
tabla[19]['loop']='s7';

tabla[20]['transportar']='s2';
tabla[20]['acorde']='s3';
tabla[20]['nota']='s4';
tabla[20]['loop']='s5';
tabla[20]['S']='26';

tabla[21]['transportar']='s2';
tabla[21]['acorde']='s3';
tabla[21]['nota']='s4';
tabla[21]['loop']='s5';
tabla[21]['S']='27';

tabla[22]['transportar']='s2';
tabla[22]['acorde']='s3';
tabla[22]['nota']='s4';
tabla[22]['loop']='s5';
tabla[22]['S']='28';

tabla[23]['transportar']='s6';

tabla[23][')']='s29';
tabla[23]['acorde']='s8';
tabla[23]['nota']='s9';
tabla[23]['loop']='s7';

tabla[24]['transportar']='s6';
tabla[24][')']='s30';
tabla[24]['acorde']='s8';
tabla[24]['nota']='s9';
tabla[24]['loop']='s7';

tabla[25]['transportar']='r1';
tabla[25][')']='r1';
tabla[25]['acorde']='r1';
tabla[25]['nota']='r1';
tabla[25]['loop']='r1';
tabla[25]['$']='r1';

tabla[26]['transportar']='s6';
tabla[26][')']='s31';
tabla[26]['acorde']='s8';
tabla[26]['nota']='s9';
tabla[26]['loop']='s7';

tabla[27]['transportar']='s6';
tabla[27][')']='s32';
tabla[27]['acorde']='s8';
tabla[27]['nota']='s9';
tabla[27]['loop']='s7';

tabla[28]['transportar']='s6';
tabla[28][')']='s33';
tabla[28]['acorde']='s8';
tabla[28]['nota']='s9';
tabla[28]['loop']='s7';

tabla[29]['transportar']='r7';
tabla[29][')']='r7';
tabla[29]['acorde']='r7';
tabla[29]['nota']='r7';
tabla[29]['loop']='r7';
tabla[29]['$']='r7';

tabla[30]['transportar']='r0';
tabla[30][')']='r0';
tabla[30]['acorde']='r0';
tabla[30]['nota']='r0';
tabla[30]['loop']='r0';
tabla[30]['$']='r0';

tabla[31]['transportar']='r4';
tabla[31][')']='r4';
tabla[31]['acorde']='r4';
tabla[31]['nota']='r4';
tabla[31]['loop']='r4';
tabla[31]['$']='r4';

tabla[32]['transportar']='r5';
tabla[32][')']='r5';
tabla[32]['acorde']='r5';
tabla[32]['nota']='r5';
tabla[32]['loop']='r5';
tabla[32]['$']='r5';

tabla[33]['transportar']='r6';
tabla[33][')']='r6';
tabla[33]['acorde']='r6';
tabla[33]['nota']='r6';
tabla[33]['loop']='r6';
tabla[33]['$']='r6';

const reglas = [];
reglas[0] = ['S','S -> transportar [float] ( S )','5'];
reglas[1] = ['S','S -> acorde ( S )','4'];
reglas[2] = ['S','S -> nota','1'];
reglas[3] = ['S','S -> nota [float]','2'];
reglas[4] = ['S','S -> loop [int] ( S )','5'];
reglas[5] = ['S','S -> S transportar [float] ( S )','6'];
reglas[6] = ['S','S -> S loop [int] ( S )','6'];
reglas[7] = ['S','S -> S acorde ( S )','5'];
reglas[8] = ['S','S -> S nota','2'];
reglas[9] = ['S','S -> S nota [float]','3'];
