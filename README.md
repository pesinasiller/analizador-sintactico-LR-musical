# analizador-sintactico-LR-musical
analizador sintáctico ascendente y generación de código para compilar música usando el WebAudioApi

## Gramática:
S -> transportar [float] ( S )<br />
S -> acorde ( S )<br />
S -> nota<br />
S -> nota [float]<br />
S -> loop [int] ( S )<br />
S -> S transportar [float] ( S )<br />
S -> S loop [int] ( S )<br />
S -> S acorde ( S )<br />
S -> S nota<br />
S -> S nota [float]<br /><br />
La tabla SLR se puede generar aquí: http://mdaines.github.io/grammophone/

#####Ejemplos:<br />
c d e f g a b <br />
reproduce la escala DO mayor<br />

c transportar 2.0 ( d e f ) <br />
reproducre DO4 RE5 MI5 FA5<br />

acorde ( c e g )<br />
reproduce el acorde DO mayor <br />

loop 2 ( c d e ) f 
reproduce DO RE MI DO RE MI FA<br />
