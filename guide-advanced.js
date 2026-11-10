"use strict";

/** Beginner guide for missions 13 to 32; same fields as guide-basics.js. */
window.CHILD_GUIDE_ADVANCED = [
  {
    words: [["Parámetro", "Una caja que la función recibe para trabajar. Aquí se llama puntos."], ["return", "Significa «devuelve». La función entrega su resultado a quien la llamó."], ["Argumento", "El dato real que envías al llamar la función, como el 5 en puntos_dobles(5)."]],
    lines: ["Crea una función llamada puntos_dobles. Entre los paréntesis está el parámetro puntos: ahí llegará el número que le envíes.", "La nota entre tres comillas explica qué hace la función. No muestra nada en pantalla.", "Un comentario con una pregunta para ti. Lo que falta es una línea que empiece con return."],
    output: "",
    note: "No aparece nada todavía. Completa la función con return puntos * 2 y agrega al final print(puntos_dobles(5)). Entonces verás 10.",
    oops: "Si ves None en la pantalla, a la función le falta el return: hizo la cuenta pero no entregó el resultado."
  },
  {
    words: [["Módulo", "Una caja de herramientas que ya viene lista para usar."], ["import", "Significa «traer». Trae un módulo a tu programa."], ["sqrt", "Abreviatura de «raíz cuadrada»: el número que multiplicado por sí mismo da el otro. 9 × 9 = 81."]],
    lines: ["Trae la caja de herramientas de matemáticas, que se llama math.", "math.sqrt quiere decir: de la caja math, usa la herramienta sqrt. Calcula la raíz cuadrada de 81 y la muestra."],
    output: "9.0",
    note: "Aparece 9.0 y no 9 porque esta herramienta siempre responde con un número con punto decimal. Vale lo mismo.",
    oops: "¿NameError que menciona math? Falta la línea import math al principio, o la escribiste con mayúsculas."
  },
  {
    words: [["try", "Significa «intenta». Debajo va lo que podría fallar."], ["except", "Significa «excepto» o «si falla». Debajo va lo que hay que hacer cuando ocurre el error."], ["ValueError", "Error que aparece cuando un dato no sirve para lo que se pidió."]],
    lines: ["Avisa a Python: intenta hacer lo de abajo, pero puede fallar.", "Intenta convertir el texto \"nueve\" en número. No puede, porque int solo entiende cifras como \"9\".", "Si ocurre un ValueError, en vez de detener todo el programa, haz lo que está debajo.", "Un comentario con una pregunta para ti. Aquí falta una instrucción de verdad."],
    output: "",
    note: "Si lo ejecutas así, Python se queja: debajo de except tiene que haber al menos una instrucción. Cambia el comentario por print(\"Escribe el número con cifras, por ejemplo 9\").",
    oops: "¿IndentationError justo después de except? Falta la instrucción de adentro, o le faltan sus cuatro espacios."
  },
  {
    words: [["Archivo", "Un documento guardado en la computadora. No se borra al cerrar el programa."], ["open", "Significa «abrir». Abre un archivo para escribir en él o para leerlo."], ["with", "Significa «con». Usa el archivo y lo cierra solito al terminar."], ["\"w\"", "Viene de «write», escribir. Abre el archivo para guardar texto nuevo."]],
    lines: ["Abre un archivo llamado nota.txt para escribir y lo llama archivo. Si no existía, lo crea.", "Escribe el texto dentro del archivo. En la pantalla no se ve nada todavía.", "Abre el mismo archivo otra vez, ahora solo para leer.", "Lee todo lo que hay en el archivo y lo muestra en la pantalla."],
    output: "Pipo encontró 10 estrellas",
    note: "Busca en la carpeta donde guardaste tu programa: ahí apareció un archivo nuevo llamado nota.txt. ¡Ábrelo con doble clic!",
    oops: "Cuidado: abrir con \"w\" borra lo que el archivo tenía antes y empieza de cero. Si quieres agregar sin borrar, usa \"a\"."
  },
  {
    words: [["CSV", "Una tabla escrita como texto: cada renglón es una fila y las comas separan las columnas."], ["Fila", "Un renglón de la tabla, con los datos de una sola persona o cosa."], ["Columna", "Un mismo tipo de dato para todas las filas, como «nombre» o «puntos»."]],
    lines: ["Trae la caja de herramientas csv, que sabe leer tablas.", "Trae StringIO, una herramienta que permite tratar un texto como si fuera un archivo.", "Crea una tabla pequeña. La primera fila tiene los títulos de las columnas. Los símbolos \\n significan «salto de línea»: ahí empieza una fila nueva.", "Recorre la tabla fila por fila. En cada vuelta, fila guarda los datos de una persona.", "Muestra el nombre y los puntos de esa fila, buscándolos por el título de su columna."],
    output: "Ana tiene 8 puntos\nLeo tiene 12 puntos",
    oops: "¿KeyError? El título que escribiste entre corchetes no coincide con el de la primera fila. Tienen que ser idénticos: nombre no es lo mismo que Nombre."
  },
  {
    words: [["Versión", "Una foto de cómo estaba tu proyecto en un momento."], ["Git", "Una herramienta que guarda versiones, como los puntos de guardado de un videojuego."], ["enumerate", "Significa «enumerar». Recorre una lista y además va contando: 1, 2, 3…"]],
    lines: ["Crea una lista con la primera versión del juego.", "Agrega una segunda versión al final de la lista.", "Recorre la lista. En cada vuelta, numero guarda la cuenta (empezando en 1) y version guarda el texto.", "Muestra el número de versión y qué cambió."],
    output: "Versión 1 : El juego empieza\nVersión 2 : Ahora también tiene estrellas",
    note: "Este programa imita la idea de Git con una lista. El Git de verdad se usa desde la terminal y lo aprenderás más adelante.",
    oops: "Si los números empiezan en 0, falta start=1 dentro de enumerate."
  },
  {
    words: [["Prueba", "Un pequeño examen que el programa se hace a sí mismo."], ["assert", "Significa «afirmar». Dice: estoy seguro de que esto es verdad. Si no lo es, detiene todo y avisa."], ["Esperado", "El resultado que crees que debe salir antes de ejecutar."]],
    lines: ["Crea una función que recibe dos números: los puntos actuales y los nuevos.", "Devuelve la suma de los dos.", "La prueba: afirma que sumar 4 y 3 da 7. Si es verdad, no pasa nada y el programa sigue.", "Como la prueba pasó, se muestra este mensaje."],
    output: "¡Prueba superada!",
    note: "Cambia el 7 por un 8 y ejecuta: verás AssertionError. Así avisa una prueba cuando algo no coincide.",
    oops: "¿AssertionError sin querer? Haz la cuenta en papel. O el resultado esperado está mal, o la función tiene un error. La prueba no sabe cuál: te toca investigar."
  },
  {
    words: [["Clase", "Un molde para crear cosas parecidas, como un molde de galletas."], ["Objeto", "Cada cosa creada con el molde. Aquí, cada robot."], ["self", "Significa «yo mismo». Es la forma en que un objeto habla de sus propios datos."], ["__init__", "La receta que se sigue al crear un objeto nuevo. Lleva dos guiones bajos a cada lado."]],
    lines: ["Crea un molde llamado Robot. Los nombres de clases empiezan con mayúscula.", "Esta función especial se ejecuta sola cada vez que se crea un robot. Recibe el nombre que le des.", "Guarda ese nombre dentro del robot. self.nombre significa «mi nombre».", "Crea una acción que todos los robots pueden hacer.", "Muestra un saludo con el nombre guardado en ese robot.", "Usa el molde para crear un robot llamado Pipo y lo guarda en la caja robot.", "Le pide a ese robot que salude."],
    output: "¡Hola! Soy Pipo",
    oops: "¿TypeError que dice que falta un argumento? Escribiste Robot() sin nombre. El molde necesita un nombre entre los paréntesis: Robot(\"Luna\")."
  },
  {
    words: [["Tipo", "La clase de dato: texto, número entero, verdadero o falso."], ["str", "Viene de «string». Es el tipo de los textos."], ["Anotación", "Una etiqueta que dice qué tipo de dato se espera. Ayuda a las personas a leer el código."]],
    lines: ["Crea una función con etiquetas: nombre debe ser texto (str), puntos debe ser un número entero (int), y la flecha -> str dice que devuelve un texto.", "Une los textos. str(puntos) convierte el número en texto, porque con + no se puede pegar un texto con un número.", "Llama a la función con el nombre \"Pipo\" y el número 5, y muestra lo que devuelve."],
    output: "Pipo tiene 5 puntos",
    oops: "¿TypeError que habla de str e int? Intentaste pegar un texto con un número. Envuelve el número con str( )."
  },
  {
    words: [["Algoritmo", "Una receta de pasos para resolver un problema."], ["Buscar", "Revisar las cosas una por una hasta encontrar la que quieres."], ["Posición", "El lugar de un elemento en la lista. Python empieza a contar desde 0."]],
    lines: ["Crea una lista con cuatro tesoros.", "Guarda en una caja el tesoro que queremos encontrar.", "Recorre la lista. En cada vuelta, lugar guarda la posición (0, 1, 2, 3) y tesoro guarda el objeto.", "Pregunta: ¿este tesoro es el que buscamos?", "Si lo es, muestra en qué lugar está. Tiene ocho espacios porque está dentro del if, que está dentro del for."],
    output: "¡Está en el lugar 2 !",
    note: "Dice 2 y no 3 porque Python cuenta desde 0: concha es 0, hoja es 1 y diamante es 2.",
    oops: "¿No aparece nada? El objeto que buscas no está en la lista, o está escrito distinto. \"Diamante\" con mayúscula no es igual a \"diamante\"."
  },
  {
    words: [["Fecha", "Un día del calendario: año, mes y día."], ["date", "Significa «fecha». Es la herramienta de Python para guardar un día."], ["from … import", "Significa «de esta caja, trae solo esta herramienta»."]],
    lines: ["De la caja de herramientas datetime, trae solo la herramienta date.", "Guarda el 1 de enero de 2026. El orden siempre es año, mes, día.", "Guarda el 10 de enero de 2026.", "Resta las dos fechas. El resultado tiene una parte llamada .days que dice cuántos días pasaron."],
    output: "Pasaron 9 días",
    oops: "¿ValueError? Escribiste un día o un mes que no existe, como el mes 13 o el día 31 de un mes de 30 días."
  },
  {
    words: [["Decimal", "Un número con partes más pequeñas que uno, como 1.25. También es la herramienta de Python para sumarlos sin errores."], ["Punto decimal", "En Python los decimales se escriben con punto, no con coma: 1.25."], ["Exacto", "Sin ningún error, ni siquiera pequeñito. Con dinero siempre queremos cuentas exactas."]],
    lines: ["De la caja decimal, trae la herramienta Decimal.", "Guarda el precio del jugo. Va entre comillas para que Decimal lo lea exactamente como está escrito.", "Guarda el precio de una fruta.", "Suma un jugo y dos frutas, y muestra el total."],
    output: "2.05",
    oops: "Si escribes 1,25 con coma, Python entiende otra cosa. Usa siempre el punto para los decimales."
  },
  {
    words: [["Base de datos", "Un lugar ordenado para guardar mucha información y encontrarla rápido."], ["Diccionario", "Una caja con etiquetas: buscas por la etiqueta y obtienes el dato. Va entre llaves { }."], ["Clave", "La etiqueta de un dato en el diccionario, como \"nombre\"."]],
    lines: ["Empieza una lista llamada jugadores. El corchete queda abierto porque la lista sigue en las líneas de abajo.", "Un diccionario con los datos de Mia: su nombre y sus puntos.", "Otro diccionario con los datos de Leo.", "Cierra la lista.", "Recorre la lista. En cada vuelta, jugador guarda los datos de una persona.", "Pregunta: ¿los puntos de este jugador son más de 10?", "Si es así, muestra su nombre."],
    output: "Leo hizo más de 10 puntos",
    oops: "¿SyntaxError? En listas largas es fácil olvidar una coma entre los diccionarios o una llave de cierre }. Cuenta: cada { necesita su }."
  },
  {
    words: [["Transacción", "Un grupo de cambios que se hacen todos juntos o no se hace ninguno."], ["Copia", "Un duplicado para poder volver atrás si algo sale mal."], ["Restaurar", "Dejar todo como estaba antes."]],
    lines: ["Crea una lista con dos puntajes.", "Hace una copia de la lista antes de cambiarla, por si algo sale mal.", "Intenta hacer lo de abajo.", "Trata de convertir \"tres\" en número. Falla, porque no está escrito con cifras.", "Esta línea no llega a ejecutarse: el error ocurrió justo antes.", "Si hubo un ValueError, sigue por aquí.", "Recupera la lista original desde la copia.", "Explica con amabilidad qué pasó.", "Este else pertenece al try: significa «si nada falló».", "Solo se ejecutaría si todo hubiera salido bien."],
    output: "No guardamos un puntaje que no es número",
    note: "Cambia \"tres\" por \"3\" y ejecuta otra vez: ahora no hay error y verás los nuevos puntajes.",
    oops: "Si escribes copia = puntos sin .copy(), no creas una copia: solo otro nombre para la misma lista, y los cambios afectarían a las dos."
  },
  {
    words: [["Organizar", "Poner cada cosa en su lugar para encontrarla fácil."], ["Tarea", "Un solo trabajo. Cada función debería encargarse de una tarea."], ["Reutilizar", "Usar la misma función muchas veces sin volver a escribirla."]],
    lines: ["Primera función: su única tarea es calcular.", "Devuelve 10 puntos por cada victoria.", "Segunda función: su única tarea es mostrar.", "Muestra el nombre y los puntos.", "Llama a la primera función con 3 victorias y guarda el resultado en la caja puntos.", "Llama a la segunda función con el nombre y los puntos calculados."],
    output: "Pipo ganó 30 puntos",
    oops: "¿NameError? Las funciones se crean antes de usarlas. Las líneas con def van arriba; las llamadas van abajo."
  },
  {
    words: [["API", "Un acuerdo para que dos programas se hablen: uno pregunta y el otro responde."], ["Petición", "El mensaje que un programa envía para pedir algo."], ["Respuesta", "Lo que el otro programa contesta."]],
    lines: ["Un diccionario que imita una petición: dice qué acción se pide y qué se busca.", "Un diccionario que imita la respuesta: dice si lo encontró y de qué color es.", "Pregunta: ¿el dato \"encontrado\" de la respuesta es verdadero?", "Si lo es, muestra un mensaje con el color que venía en la respuesta."],
    output: "¡Encontré una estrella dorado !",
    note: "Aquí los dos programas son imaginarios. En una API de verdad, la petición viaja por internet hasta otra computadora.",
    oops: "¿KeyError? Pediste una etiqueta que no existe en el diccionario. Revisa que esté escrita igual, con sus comillas."
  },
  {
    words: [["Diseñar", "Pensar y planear antes de construir."], ["in", "Significa «en» o «dentro de». Pregunta si algo está dentro de un grupo."], ["Valor", "El dato guardado bajo una clave. Aquí, el precio de cada producto."]],
    lines: ["Un diccionario de precios: cada producto es una clave y su precio es el valor.", "Guarda el producto que la persona quiere comprar.", "Pregunta: ¿ese producto está entre las claves del diccionario?", "Si está, busca su precio y lo muestra.", "Si no está, sigue por aquí.", "Avisa con amabilidad que ese producto no existe."],
    output: "Cuesta 2 puntos",
    note: "Cambia \"estrella\" por \"cometa\" y verás el otro mensaje.",
    oops: "Preguntar con in antes de buscar evita un KeyError. Es como mirar el menú antes de pedir."
  },
  {
    words: [["Validar", "Revisar que un dato tenga sentido antes de usarlo."], ["Dígito", "Cada una de las cifras del 0 al 9."], ["isdigit", "Pregunta en inglés: «¿son solo dígitos?». Responde verdadero o falso."], ["Dato privado", "Información que no se comparte: contraseñas, dirección, teléfono."]],
    lines: ["Guarda una respuesta como texto, igual que la entregaría input.", "Pregunta: ¿el texto tiene solo cifras?", "Si es así, ya es seguro convertirlo en número.", "Segunda revisión: ¿el número está entre 0 y 100? <= significa «menor o igual».", "Si pasa las dos revisiones, se acepta.", "Si es un número pero está fuera del límite, sigue por aquí.", "Explica cuál es el límite.", "Este else es del primer if: llega aquí si el texto no eran solo cifras.", "Explica qué debe escribir la persona."],
    output: "Puntaje aceptado: 12",
    note: "Prueba con \"250\" y con \"hola\": cada uno va por un camino distinto.",
    oops: "Fíjate bien en la sangría: cada else tiene que estar alineado con el if al que responde."
  },
  {
    words: [["Prueba completa", "Una prueba que revisa varias partes trabajando juntas."], ["Conectar", "Hacer que una función use el resultado de otra."], ["Regla", "Algo que el programa siempre debe cumplir."]],
    lines: ["Primera función: calcula los puntos.", "Devuelve 2 puntos por cada vuelta.", "Segunda función: arma la frase final.", "Usa la primera función dentro de la segunda, convierte el número en texto y une todo.", "Prueba pequeña: revisa solamente la primera función.", "Prueba completa: revisa las dos funciones trabajando juntas.", "Si las dos pruebas pasaron, se muestra este mensaje."],
    output: "¡El juego completo pasó las pruebas!",
    oops: "Si cambias la regla de puntos, también tienes que cambiar los resultados esperados en las dos pruebas. ¡Las pruebas te recuerdan todo lo que depende de ese cambio!"
  },
  {
    words: [["Proyecto final", "Un programa tuyo, de principio a fin, que usa lo que aprendiste."], ["Plan", "La lista de pasos que escribes antes de empezar."], ["Mejorar", "Agregar una cosa pequeña cada vez y probar que siga funcionando."]],
    lines: ["Crea una función que recibe el nombre de quien juega.", "Da la bienvenida usando ese nombre.", "Explica cuál es la misión.", "Llama a la función para empezar la aventura."],
    output: "¡Bienvenido, Explorador !\nTu misión: encontrar tres estrellas ⭐",
    note: "Este es solo el comienzo. Agrega una pregunta con input, una decisión con if y una prueba con assert.",
    oops: "Si tu proyecto se vuelve muy grande y algo falla, vuelve a la última versión que funcionaba y agrega las cosas de una en una."
  }
];
