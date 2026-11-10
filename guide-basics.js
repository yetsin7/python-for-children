"use strict";

/**
 * Beginner guide for missions 1 to 12.
 * words: new vocabulary; lines: one explanation per non-empty example line;
 * output: exact screen text; note: optional remark about the output; oops: common mistake and its fix.
 */
window.CHILD_GUIDE_BASICS = [
  {
    words: [["Programa", "Una lista de instrucciones para la computadora, como los pasos de una receta."], ["Instrucción", "Una sola orden. Cada línea que escribes es una instrucción."], ["print", "Palabra en inglés que significa «imprimir». En Python quiere decir: muestra esto en la pantalla."], ["Ejecutar", "Pedirle a la computadora que haga lo que dice tu programa. En IDLE se hace con la tecla F5."]],
    lines: ["print es la orden de mostrar. Los paréntesis ( ) son como una bandeja: adentro va lo que quieres mostrar. Las comillas \" \" avisan que es un mensaje de texto, tal cual lo escribiste."],
    output: "¡Hola, mundo!",
    oops: "¿Salió un mensaje rojo que dice SyntaxError? Casi siempre falta una comilla o un paréntesis. Cuenta: debe haber dos comillas y dos paréntesis. Y fíjate que print esté todo en minúsculas: Print con mayúscula no funciona."
  },
  {
    words: [["Texto", "Letras, palabras o frases. En Python siempre va entre comillas."], ["Comillas", "El símbolo \" que abre y cierra un texto. Se escribe con Shift + 2."], ["Línea", "Un renglón de tu programa. Python lee las líneas de arriba hacia abajo."]],
    lines: ["Muestra el primer mensaje. Todo lo que está entre las dos comillas aparece igualito en la pantalla.", "Muestra una segunda línea. Los emojis también son texto, por eso van entre comillas."],
    output: "¡Pipo encontró un tesoro!\n💎💎💎",
    oops: "Si solo ves un mensaje, revisa que haya un print en cada línea. Si ves un error, busca la comilla que falta: cada texto necesita una para abrir y otra para cerrar."
  },
  {
    words: [["Número", "Una cantidad. Los números se escriben sin comillas."], ["Operación", "Una cuenta: sumar, restar o multiplicar."], ["Asterisco *", "El símbolo para multiplicar. Se escribe con Shift y la tecla del signo +."]],
    lines: ["Python primero hace la suma 8 + 4 y después print muestra el resultado. No hay comillas porque queremos la cuenta, no el texto.", "El asterisco * significa «por». Python calcula 3 por 5 y muestra el resultado."],
    output: "12\n15",
    oops: "¿Apareció 8 + 4 en vez de 12? Entonces pusiste comillas. Con comillas Python copia el texto; sin comillas hace la cuenta. ¡Pruébalo de las dos formas para ver la diferencia!"
  },
  {
    words: [["Variable", "Una caja con nombre donde guardas un dato para usarlo después."], ["Signo =", "En Python significa «guarda». Lo de la derecha se guarda en la caja de la izquierda."], ["Dato", "Un pedacito de información: un nombre, un número, una palabra."]],
    lines: ["Crea una caja llamada mascota y guarda adentro el texto \"Chispa\". En la pantalla todavía no aparece nada: guardar no es mostrar.", "Muestra lo que hay dentro de la caja mascota. No lleva comillas porque queremos el contenido de la caja, no la palabra mascota."],
    output: "Chispa",
    oops: "Si aparece la palabra mascota en vez de Chispa, pusiste comillas en el print: quítalas. Si aparece NameError, el nombre de la caja está escrito distinto en las dos líneas. Tienen que ser idénticos, letra por letra."
  },
  {
    words: [["input", "Palabra en inglés que significa «entrada». Hace una pregunta y espera a que escribas."], ["Respuesta", "Lo que tú escribes con el teclado. Termina cuando presionas Enter."], ["Unir textos", "Pegar un texto con otro usando el signo +."]],
    lines: ["input muestra la pregunta y el programa se queda esperando. Cuando escribes tu nombre y presionas Enter, tu respuesta se guarda en la caja nombre.", "Pega tres textos con el signo +: el saludo, lo que hay en la caja nombre y el signo de admiración. Después muestra todo junto."],
    output: "¿Cómo te llamas? Lía\n¡Hola, Lía!",
    note: "En este ejemplo la persona escribió Lía. Tú verás el nombre que escribas.",
    oops: "¿El programa parece congelado? No está roto: está esperando tu respuesta. Haz clic en la ventana donde apareció la pregunta, escribe y presiona Enter."
  },
  {
    words: [["if", "Palabra en inglés que significa «si». Sirve para preguntar antes de actuar."], ["else", "Significa «si no». Dice qué hacer cuando la respuesta es no."], ["True y False", "«Verdadero» y «falso» en inglés. Se escriben con la primera letra mayúscula."], ["Sangría", "Los cuatro espacios al inicio de una línea. Indican que esa línea está dentro del if o del else."]],
    lines: ["Guarda en la caja llueve el valor True, que significa «verdadero». Es como decir: sí, está lloviendo.", "Pregunta: ¿lo que hay en llueve es verdadero? Los dos puntos : avisan que debajo viene lo que hay que hacer.", "Esta línea empieza con cuatro espacios. Solo se ejecuta si la respuesta fue sí.", "else significa «si no». Marca el otro camino y también termina con dos puntos.", "Esta línea, con sus cuatro espacios, solo se ejecuta si la respuesta fue no."],
    output: "¡Saca el paraguas!",
    note: "Cambia True por False y ejecútalo otra vez: ahora Pipo elegirá el otro camino.",
    oops: "¿IndentationError? Faltan los cuatro espacios al inicio de las líneas de adentro. ¿SyntaxError? Seguramente faltan los dos puntos : al final de if o de else."
  },
  {
    words: [["Ciclo", "Una forma de repetir instrucciones sin escribirlas muchas veces."], ["for", "Palabra en inglés que aquí significa «para cada». Empieza un ciclo."], ["range", "Significa «rango». range(3) quiere decir: da tres vueltas."], ["Vuelta", "Cada una de las veces que se repite el ciclo."]],
    lines: ["Empieza un ciclo de tres vueltas. La caja vuelta guarda el número de la vuelta actual: primero 0, luego 1 y al final 2.", "Esta línea está dentro del ciclo porque tiene cuatro espacios. Se ejecuta una vez en cada vuelta."],
    output: "¡Hola, amigo!\n¡Hola, amigo!\n¡Hola, amigo!",
    oops: "Si el mensaje sale una sola vez, le faltan los cuatro espacios y quedó fuera del ciclo. Recuerda: lo que quieres repetir va con sangría, debajo de la línea del for."
  },
  {
    words: [["while", "Palabra en inglés que significa «mientras». Repite mientras algo siga siendo cierto."], ["Condición", "Una pregunta que se responde con sí o no, como «¿cuenta es mayor que 0?»."], ["Signo >", "Significa «mayor que». 3 > 0 es verdadero; 0 > 0 es falso."]],
    lines: ["Crea la caja cuenta y guarda el número 3.", "Pregunta: ¿cuenta es mayor que 0? Mientras la respuesta sea sí, repite las líneas de abajo.", "Muestra el número que hay ahora en la caja.", "Saca el número de la caja, le resta 1 y guarda el resultado en la misma caja. Así baja de 3 a 2, de 2 a 1 y de 1 a 0.", "Esta línea no tiene espacios al inicio: ya está fuera del ciclo. Se ejecuta una sola vez, cuando cuenta llega a 0."],
    output: "3\n2\n1\n¡Despegue!",
    oops: "¿Los números no paran de salir? Olvidaste la línea que resta 1, así que la condición nunca deja de ser cierta. Presiona Ctrl + C para detener el programa y agrégala."
  },
  {
    words: [["Función", "Un grupo de instrucciones con nombre. Es como enseñarle un truco nuevo a Pipo."], ["def", "Viene de «definir». Sirve para crear una función."], ["Llamar", "Usar la función. Se hace escribiendo su nombre con paréntesis: saludar()."]],
    lines: ["def crea una función llamada saludar. Los paréntesis vacíos dicen que no necesita datos. Los dos puntos avisan que debajo van sus instrucciones.", "Las tres comillas guardan una nota que explica para qué sirve la función. Es para las personas; no muestra nada en pantalla.", "Las líneas que empiezan con # son comentarios: Python las ignora. Aquí hay una pregunta para ti: ¿qué instrucción falta?"],
    output: "",
    note: "¡No aparece nada, y está bien! Crear una función es como escribir una receta: todavía nadie cocinó. Agrega un print dentro de la función y después escribe saludar() al final, sin espacios al inicio, para llamarla.",
    oops: "Si agregaste el print y aún no aparece nada, te falta llamar a la función. Escribe saludar() en la última línea, pegado al borde izquierdo."
  },
  {
    words: [["Lista", "Una fila de cosas guardadas en orden, dentro de una sola caja."], ["Corchetes [ ]", "Los símbolos que abren y cierran una lista."], ["append", "Palabra en inglés que significa «agregar al final»."], ["Elemento", "Cada una de las cosas que hay en la lista."]],
    lines: ["Crea una lista llamada mochila con dos cosas. Van entre corchetes y separadas por una coma.", "El punto significa «haz esto con la mochila». append agrega \"galletas\" al final de la lista.", "Muestra la lista completa, con sus corchetes y comas."],
    output: "['mapa', 'agua', 'galletas']",
    note: "Python muestra los textos de una lista con comillas simples. Es normal: son los mismos textos.",
    oops: "¿SyntaxError? Revisa las comas entre las cosas y que el corchete de cierre ] esté en su lugar. Cada texto de la lista necesita sus propias comillas."
  },
  {
    words: [["Error", "Un mensaje de Python que avisa que no entendió algo. Es una pista, no un regaño."], ["SyntaxError", "Error de escritura: falta o sobra un símbolo."], ["Depurar", "Buscar y arreglar un error, como hace un detective."]],
    lines: ["Guarda un texto en la caja mensaje.", "Muestra lo que hay en la caja mensaje."],
    output: "¡Pista encontrada!",
    note: "Ahora quita una comilla a propósito y ejecuta. Lee el mensaje rojo: dice en qué línea está el problema. Vuelve a poner la comilla y mira cómo desaparece.",
    oops: "Cuando veas un error: respira, lee la última línea del mensaje, busca el número de línea y compara esa línea con el ejemplo, símbolo por símbolo. Arregla una sola cosa y prueba otra vez."
  },
  {
    words: [["int", "Viene de «integer», que significa número entero. Convierte un texto en número."], ["Signo ==", "Dos signos iguales juntos preguntan «¿son iguales?». Un solo = guarda; dos == comparan."], ["Proyecto", "Un programa que junta varias ideas para hacer algo completo."]],
    lines: ["Guarda el número secreto en una caja. Puedes cambiarlo por otro.", "Aquí pasan tres cosas, de adentro hacia afuera: input hace la pregunta y espera; int convierte lo que escribiste en un número; y el resultado se guarda en la caja respuesta.", "Pregunta: ¿la respuesta es igual al secreto? Fíjate en los dos signos ==.", "Si son iguales, muestra el mensaje de victoria.", "Si no son iguales, sigue por este otro camino.", "Muestra un mensaje y, después de la coma, el número que hay en la caja secreto."],
    output: "Adivina el número del 1 al 10: 7\n¡Ganaste! 🏆",
    note: "En este ejemplo la persona escribió 7. Si escribes otro número, verás el otro mensaje.",
    oops: "¿ValueError? Escribiste letras u otra cosa que no es un número, y int no pudo convertirlo. Ejecuta de nuevo y escribe solo cifras, como 7. ¿Siempre pierdes aunque aciertes? Revisa que hayas usado == y no un solo =."
  }
];
