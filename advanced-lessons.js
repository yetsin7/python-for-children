"use strict";

window.ADVANCED_CHILD_LESSONS = [
  {
    id: 13, emoji: "🎲", title: "Puntos y reglas", story: "¡Pipo ganó puntos! Una función puede recibir un número y devolver una respuesta.",
    idea: "Las funciones también pueden recibir información entre paréntesis. return devuelve un resultado para que el programa lo use después.",
    example: "def puntos_dobles(puntos):\n    return puntos * 2\n\nresultado = puntos_dobles(5)\nprint(resultado)",
    challenge: "Cambia la función para regalar 3 puntos extra en vez de duplicarlos.",
    starter: "def puntos_extra(puntos):\n    return puntos + 3\n\nprint(puntos_extra(5))",
    hint: "Cambia la operación después de return. La función de este ejemplo entrega 8.",
    question: "¿Qué hace return dentro de una función?",
    options: ["Devuelve un resultado.", "Repite el código.", "Cierra el navegador."],
    answer: 0, why: "return devuelve el resultado para que otra parte del programa pueda usarlo."
  },
  {
    id: 14, emoji: "🧰", title: "Herramientas de Python", story: "Python tiene una caja de herramientas lista para resolver problemas.",
    idea: "Un módulo es una caja con herramientas que otra persona preparó. import math permite usar herramientas de matemáticas, como sqrt para una raíz cuadrada.",
    example: "import math\n\nprint(math.sqrt(81))",
    challenge: "Prueba math.ceil(4.2) y math.floor(4.8). ¿Qué diferencia encuentras?",
    starter: "import math\n\nprint(math.sqrt(81))\nprint(math.ceil(4.2))",
    hint: "Escribe math. antes del nombre de la herramienta.",
    question: "¿Qué hace import math?",
    options: ["Prepara las herramientas de matemáticas.", "Borra los números.", "Crea una ventana."],
    answer: 0, why: "import carga un módulo para poder usar las herramientas que contiene."
  },
  {
    id: 15, emoji: "🧯", title: "Una red para los errores", story: "¿Y si alguien escribe una letra donde esperábamos un número? Pipo puede responder con amabilidad.",
    idea: "try prueba unas instrucciones. Si algo sale mal, except permite responder al error sin cerrar el programa. No es para esconder errores, sino para ayudar a la persona.",
    example: "try:\n    edad = int(\"nueve\")\n    print(edad)\nexcept ValueError:\n    print(\"Escribe tu edad usando números\")",
    challenge: "Cambia el mensaje para explicar con amabilidad qué debe escribir la persona.",
    starter: "try:\n    numero = int(\"nueve\")\nexcept ValueError:\n    print(\"¡Ups! Prueba con un número, como 9\")",
    hint: "El código que puede fallar va debajo de try. La respuesta al error va debajo de except.",
    question: "¿Qué hace except en un bloque try?",
    options: ["Ayuda a decidir qué hacer si ocurre un error.", "Repite todo para siempre.", "Convierte texto en una lista."],
    answer: 0, why: "except da una respuesta especial cuando ocurre el error que estamos esperando."
  },
  {
    id: 16, emoji: "📓", title: "Guardar una nota", story: "Pipo no quiere olvidar su puntaje cuando termina una partida.",
    idea: "Un archivo guarda texto para leerlo después. Con open(..., \"w\") abrimos un archivo para escribir; with lo cierra ordenadamente al terminar.",
    example: "with open(\"nota.txt\", \"w\") as archivo:\n    archivo.write(\"Pipo encontró 10 estrellas\")\n\nwith open(\"nota.txt\") as archivo:\n    print(archivo.read())",
    challenge: "Cambia la nota para guardar tu propio récord. ¿Qué ocurre si escribes otra nota con el mismo nombre de archivo?",
    starter: "with open(\"mi-record.txt\", \"w\") as archivo:\n    archivo.write(\"Mi mejor puntaje es 10\")\n\nwith open(\"mi-record.txt\") as archivo:\n    print(archivo.read())",
    hint: "El nombre del archivo va entre comillas. En este laboratorio los archivos viven solo mientras la consola está abierta.",
    question: "¿Para qué sirve with open(...)?",
    options: ["Abre un archivo y ayuda a cerrarlo ordenadamente.", "Abre una página de internet.", "Suma los puntos."],
    answer: 0, why: "with se ocupa del archivo y lo cierra al terminar el bloque."
  },
  {
    id: 17, emoji: "📊", title: "Organiza una tabla", story: "Pipo anotó los puntos de tres amigos y quiere leerlos ordenadamente.",
    idea: "CSV es un formato sencillo para guardar filas y columnas, como una pequeña tabla de cuaderno. El módulo csv ayuda a leer sus filas sin separar el texto a mano.",
    example: "import csv\nfrom io import StringIO\n\ntabla = StringIO(\"nombre,puntos\\nAna,8\\nLeo,12\\n\")\nfor fila in csv.DictReader(tabla):\n    print(fila[\"nombre\"], \"tiene\", fila[\"puntos\"], \"puntos\")",
    challenge: "Agrega una fila más a la tabla y cambia los nombres o los puntos.",
    starter: "import csv\nfrom io import StringIO\n\ntabla = StringIO(\"nombre,puntos\\nMia,7\\nTom,11\\n\")\nfor fila in csv.DictReader(tabla):\n    print(fila[\"nombre\"], fila[\"puntos\"])",
    hint: "Cada fila nueva empieza en otra línea. Las comas separan las columnas.",
    question: "¿Qué representa una fila de CSV?",
    options: ["Los datos de una persona o cosa en varias columnas.", "Una instrucción secreta.", "Un dibujo."],
    answer: 0, why: "Cada fila guarda juntos los valores de sus columnas, como nombre y puntos."
  },
  {
    id: 18, emoji: "🕰️", title: "Volver a una versión anterior", story: "Pipo probó un cambio en su juego y quiere recordar cómo era antes.",
    idea: "Git es una herramienta para guardar versiones de un proyecto, como puntos de guardado de un videojuego. Un mensaje corto puede contar qué cambió en cada punto.",
    example: "versiones = [\"El juego empieza\"]\nversiones.append(\"Ahora también tiene estrellas\")\n\nfor numero, version in enumerate(versiones, start=1):\n    print(\"Versión\", numero, \":\", version)",
    challenge: "Guarda tres versiones imaginarias del mismo juego y escribe qué cambió cada vez.",
    starter: "versiones = [\"Pipo saluda\", \"Pipo encuentra una estrella\"]\nversiones.append(\"Pipo gana puntos\")\nprint(versiones)",
    hint: "append agrega un punto nuevo al final de la lista de versiones.",
    question: "¿Para qué sirve guardar distintas versiones?",
    options: ["Para recordar los cambios y poder comparar el proyecto.", "Para que Python hable más alto.", "Para borrar los mensajes."],
    answer: 0, why: "Las versiones cuentan la historia de los cambios y ayudan a volver a un estado anterior."
  },
  {
    id: 19, emoji: "🧪", title: "Pruebas de detective", story: "Antes de entregar un invento, Pipo comprueba que sus reglas funcionan.",
    idea: "Una prueba compara lo que esperamos con lo que el programa realmente devuelve. assert detiene la prueba si los dos resultados no coinciden.",
    example: "def sumar_puntos(actuales, nuevos):\n    return actuales + nuevos\n\nassert sumar_puntos(4, 3) == 7\nprint(\"¡Prueba superada!\")",
    challenge: "Agrega otra prueba para sumar 10 y 2. Después cambia una respuesta a propósito para ver el error.",
    starter: "def sumar_puntos(actuales, nuevos):\n    return actuales + nuevos\n\nassert sumar_puntos(10, 2) == 12\nprint(\"¡Punto comprobado!\")",
    hint: "Escribe assert, después la función con sus datos, y al final == junto al resultado esperado.",
    question: "¿Qué hace assert?",
    options: ["Comprueba si una idea es verdadera.", "Añade color a la pantalla.", "Pregunta el nombre."],
    answer: 0, why: "assert comprueba una condición y avisa si el resultado no coincide."
  },
  {
    id: 20, emoji: "🤖", title: "Crea un personaje", story: "¡Pipo tiene amigos! Una clase sirve como molde para crear personajes parecidos.",
    idea: "Una clase describe cosas que varios objetos pueden tener. Cada personaje puede tener su propio nombre y usar una acción, como saludar.",
    example: "class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def saludar(self):\n        print(\"¡Hola! Soy\", self.nombre)\n\nrobot = Robot(\"Pipo\")\nrobot.saludar()",
    challenge: "Crea un segundo robot con otro nombre y haz que salude.",
    starter: "class Robot:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def saludar(self):\n        print(\"¡Hola! Soy\", self.nombre)\n\nRobot(\"Chispa\").saludar()",
    hint: "Cambia el texto dentro de Robot(...). Cada objeto puede tener un nombre distinto.",
    question: "¿Qué es una clase?",
    options: ["Un molde que describe cómo crear objetos.", "Una contraseña.", "Un ciclo que se repite."],
    answer: 0, why: "Una clase es como un molde; cada objeto creado puede tener sus propios datos."
  },
  {
    id: 21, emoji: "🏷️", title: "Etiquetas para tus datos", story: "Pipo deja etiquetas para que otros programadores entiendan qué datos espera una función.",
    idea: "Una anotación de tipo es una pista para las personas y las herramientas. nombre: str indica texto; puntos: int indica un número entero. Python no cambia el tipo por tener esa etiqueta.",
    example: "def mensaje(nombre: str, puntos: int) -> str:\n    return nombre + \" tiene \" + str(puntos) + \" puntos\"\n\nprint(mensaje(\"Pipo\", 5))",
    challenge: "Agrega una anotación para una función que recibe un nombre y devuelve un saludo.",
    starter: "def saludar(nombre: str) -> str:\n    return \"¡Hola, \" + nombre + \"!\"\n\nprint(saludar(\"Mia\"))",
    hint: "Escribe : str junto a un dato de texto y -> str después de los paréntesis.",
    question: "¿Para quién son principalmente las anotaciones de tipo?",
    options: ["Para ayudar a entender y revisar el código.", "Para que la computadora adivine colores.", "Para reemplazar todas las pruebas."],
    answer: 0, why: "Las anotaciones son pistas para quienes leen el programa y para las herramientas que lo revisan."
  },
  {
    id: 22, emoji: "🔍", title: "Busca el tesoro paso a paso", story: "Pipo escondió un diamante en una lista. ¡Es hora de buscarlo sin saltarse pistas!",
    idea: "Un algoritmo es una receta de pasos. Buscar uno por uno es sencillo: miramos cada elemento hasta hallar el que queremos.",
    example: "tesoros = [\"concha\", \"hoja\", \"diamante\", \"pluma\"]\nbuscar = \"diamante\"\n\nfor lugar, tesoro in enumerate(tesoros):\n    if tesoro == buscar:\n        print(\"¡Está en el lugar\", lugar, \"!\")",
    challenge: "Cambia la lista y busca otro objeto. ¿Qué pasa si el objeto no está?",
    starter: "tesoros = [\"llave\", \"mapa\", \"corona\"]\nbuscar = \"mapa\"\n\nfor lugar, tesoro in enumerate(tesoros):\n    if tesoro == buscar:\n        print(\"¡Encontré\", tesoro, \"en el lugar\", lugar)",
    hint: "El ciclo revisa cada objeto. if comprueba si es el tesoro que buscas.",
    question: "¿Qué hace un algoritmo?",
    options: ["Sigue pasos ordenados para resolver un problema.", "Guarda una foto.", "Es el nombre de una carpeta."],
    answer: 0, why: "Un algoritmo es una secuencia clara de pasos para llegar a una solución."
  },
  {
    id: 23, emoji: "📅", title: "Un calendario para Pipo", story: "Pipo quiere saber cuántos días pasaron entre dos fechas imaginarias.",
    idea: "Python tiene herramientas para representar fechas y horas. El módulo datetime ayuda a escribir una fecha en orden: año, mes y día.",
    example: "from datetime import date\n\ninicio = date(2026, 1, 1)\nfiesta = date(2026, 1, 10)\nprint(\"Pasaron\", (fiesta - inicio).days, \"días\")",
    challenge: "Cambia las dos fechas imaginarias. ¿Cuántos días pasan entre ellas?",
    starter: "from datetime import date\n\ninicio = date(2026, 3, 1)\nfiesta = date(2026, 3, 8)\nprint(\"Pasan\", (fiesta - inicio).days, \"días\")",
    hint: "Usa el orden año, mes, día. La diferencia entre dos fechas tiene una cantidad de días.",
    question: "¿Qué información guarda date?",
    options: ["Una fecha con año, mes y día.", "Una lista de amigos.", "Un sonido."],
    answer: 0, why: "date representa una fecha y permite compararla con otras fechas."
  },
  {
    id: 24, emoji: "🪙", title: "La tienda de estrellas", story: "Pipo compró un jugo y dos frutas. ¡Calculemos el precio sin perder monedas!",
    idea: "Los números decimales guardan partes de una unidad. Para dinero conviene Decimal, que suma cantidades como 0.10 y 0.20 de forma exacta.",
    example: "from decimal import Decimal\n\njugo = Decimal(\"1.25\")\nfruta = Decimal(\"0.40\")\nprint(jugo + fruta + fruta)",
    challenge: "Agrega el precio de otra cosa y calcula el total de tu tienda.",
    starter: "from decimal import Decimal\n\njugo = Decimal(\"1.25\")\ngalleta = Decimal(\"0.50\")\nprint(jugo + galleta)",
    hint: "Escribe el precio como texto entre comillas dentro de Decimal(...).",
    question: "¿Por qué ayuda Decimal con el dinero?",
    options: ["Para guardar cantidades de dinero con más exactitud.", "Para dibujar monedas.", "Para ordenar nombres."],
    answer: 0, why: "Decimal evita algunas sorpresas de redondeo de los números decimales normales."
  },
  {
    id: 25, emoji: "🗄️", title: "Una biblioteca de datos", story: "Pipo quiere guardar muchos puntajes y encontrarlos después.",
    idea: "Una base de datos organiza información para buscarla más adelante. SQL es un lenguaje para pedir datos; imagina una tabla como una libreta con columnas.",
    example: "jugadores = [\n    {\"nombre\": \"Mia\", \"puntos\": 9},\n    {\"nombre\": \"Leo\", \"puntos\": 12},\n]\n\nfor jugador in jugadores:\n    if jugador[\"puntos\"] > 10:\n        print(jugador[\"nombre\"], \"hizo más de 10 puntos\")",
    challenge: "Agrega una persona a la tabla y encuentra a quienes tienen más de 5 puntos.",
    starter: "jugadores = [{\"nombre\": \"Sol\", \"puntos\": 8}]\nfor jugador in jugadores:\n    print(jugador[\"nombre\"], jugador[\"puntos\"])",
    hint: "Cada diccionario guarda nombre y puntos. Recorre la lista con for.",
    question: "¿Qué guarda una tabla?",
    options: ["Información en filas y columnas.", "Solo dibujos.", "Instrucciones para mover el ratón."],
    answer: 0, why: "Una tabla organiza datos relacionados en filas y columnas, como una hoja de cálculo."
  },
  {
    id: 26, emoji: "🛟", title: "Cuida tus cambios", story: "Pipo está a punto de guardar un cambio importante. Primero prepara una copia por si algo sale mal.",
    idea: "Una transacción es un grupo de cambios que conviene hacer completo. Una estrategia sencilla es guardar una copia y restaurarla si aparece un problema.",
    example: "puntos = [4, 7]\ncopia = puntos.copy()\n\ntry:\n    nuevo = int(\"tres\")\n    puntos.append(nuevo)\nexcept ValueError:\n    puntos = copia\n    print(\"No guardamos un puntaje que no es número\")\nelse:\n    print(\"Nuevos puntajes:\", puntos)",
    challenge: "Imagina que una operación falla. ¿Qué información copiarías antes de cambiarla?",
    starter: "inventario = [\"mapa\", \"agua\"]\ncopia = inventario.copy()\ninventario.append(\"linterna\")\nprint(\"Antes:\", copia)\nprint(\"Ahora:\", inventario)",
    hint: "copy() crea una copia de la lista antes de empezar a cambiarla.",
    question: "¿Para qué sirve conservar una copia antes de un cambio?",
    options: ["Para poder recuperar los datos anteriores si algo falla.", "Para que haya dos pantallas.", "Para ocultar el programa."],
    answer: 0, why: "Una copia segura permite recuperar los datos si el cambio no sale bien."
  },
  {
    id: 27, emoji: "🧩", title: "Ordena tu proyecto", story: "Un programa crece y necesita cajones para que cada parte encuentre su lugar.",
    idea: "Un proyecto es más fácil de entender cuando lo dividimos en piezas pequeñas. Una función puede hacer una tarea, otra mostrar los resultados y otra pedir los datos.",
    example: "def calcular_puntos(victorias):\n    return victorias * 10\n\ndef mostrar_resultado(nombre, puntos):\n    print(nombre, \"ganó\", puntos, \"puntos\")\n\npuntos = calcular_puntos(3)\nmostrar_resultado(\"Pipo\", puntos)",
    challenge: "Agrega una función que explique una regla y llámala desde el programa.",
    starter: "def calcular_puntos(victorias):\n    return victorias * 10\n\nprint(calcular_puntos(2))",
    hint: "Elige un nombre para cada tarea y escribe las instrucciones de esa tarea dentro de su función.",
    question: "¿Por qué dividir un proyecto en piezas pequeñas?",
    options: ["Para entender, probar y cambiar una parte a la vez.", "Para tener más errores.", "Para no usar nombres."],
    answer: 0, why: "Las piezas pequeñas son más fáciles de entender y de probar por separado."
  },
  {
    id: 28, emoji: "📬", title: "Mensajes entre computadoras", story: "Pipo quiere pedir un dibujo a una biblioteca de dibujos en internet.",
    idea: "Una API es una forma acordada para que dos programas se pidan información. Un programa envía una petición y recibe una respuesta, como una pregunta y su contestación.",
    example: "peticion = {\"accion\": \"buscar\", \"dibujo\": \"estrella\"}\nrespuesta = {\"encontrado\": True, \"color\": \"dorado\"}\n\nif respuesta[\"encontrado\"]:\n    print(\"¡Encontré una estrella\", respuesta[\"color\"], \"!\")",
    challenge: "Inventa otra petición y la respuesta que devolvería tu biblioteca imaginaria.",
    starter: "peticion = {\"accion\": \"buscar\", \"animal\": \"gato\"}\nrespuesta = {\"encontrado\": True, \"sonido\": \"miau\"}\nprint(respuesta[\"sonido\"])",
    hint: "Los diccionarios pueden representar los datos que viajan en una petición y una respuesta.",
    question: "¿Para qué sirve una API?",
    options: ["Para que dos programas se comuniquen siguiendo reglas.", "Para pintar la computadora.", "Para escribir sin guardar."],
    answer: 0, why: "Una API define cómo un programa puede pedir datos o acciones a otro."
  },
  {
    id: 29, emoji: "🛍️", title: "Diseña una tiendita", story: "¡Tu equipo va a crear una tienda de estrellas! Primero escribe las reglas.",
    idea: "Antes de construir una aplicación, aclara qué puede hacer la persona y qué resultado espera. Luego prueba cada regla con ejemplos pequeños.",
    example: "precios = {\"estrella\": 2, \"luna\": 5}\nproducto = \"estrella\"\n\nif producto in precios:\n    print(\"Cuesta\", precios[producto], \"puntos\")\nelse:\n    print(\"No encontramos ese producto\")",
    challenge: "Agrega productos y decide qué mensaje mostrar para uno que no existe.",
    starter: "precios = {\"cohete\": 7, \"robot\": 4}\nprint(\"Productos:\", list(precios))",
    hint: "Cada producto es una llave del diccionario y su precio es el valor.",
    question: "¿Qué conviene decidir antes de construir una aplicación?",
    options: ["Qué puede hacer la persona y qué debería ocurrir.", "El nombre de cada variable secreta.", "Cuántas veces reiniciar."],
    answer: 0, why: "Aclarar las reglas primero ayuda a construir y comprobar la aplicación paso a paso."
  },
  {
    id: 30, emoji: "🔒", title: "Guardianes de los datos", story: "La tiendita de Pipo debe aceptar datos seguros y cuidar la información de sus amigos.",
    idea: "Validar significa comprobar que un dato tenga sentido antes de usarlo. No guardes contraseñas ni datos privados en un juego de práctica.",
    example: "respuesta = \"12\"\n\nif respuesta.isdigit():\n    puntos = int(respuesta)\n    if 0 <= puntos <= 100:\n        print(\"Puntaje aceptado:\", puntos)\n    else:\n        print(\"El puntaje debe estar entre 0 y 100\")\nelse:\n    print(\"Escribe números, sin letras\")",
    challenge: "Cambia el límite del puntaje y prueba un número demasiado grande.",
    starter: "edad = \"9\"\nif edad.isdigit():\n    print(\"Gracias por escribir un número\")\nelse:\n    print(\"Prueba con números, no con letras\")",
    hint: "isdigit() comprueba si el texto contiene solamente dígitos.",
    question: "¿Por qué validamos los datos?",
    options: ["Para comprobarlos antes de usarlos y responder con claridad.", "Para guardar contraseñas.", "Para cambiar el teclado."],
    answer: 0, why: "Validar evita que un dato inesperado rompa una regla o confunda a la persona."
  },
  {
    id: 31, emoji: "🧑‍🤝‍🧑", title: "Prueba el juego completo", story: "Ahora Pipo invita a un amigo a probar el juego de principio a fin.",
    idea: "Una prueba pequeña revisa una regla. Una prueba completa recorre varios pasos juntos: empezar, jugar y ver el resultado.",
    example: "def ganar_puntos(vueltas):\n    return vueltas * 2\n\ndef frase_final(nombre, vueltas):\n    return nombre + \" ganó \" + str(ganar_puntos(vueltas)) + \" puntos\"\n\nassert ganar_puntos(3) == 6\nassert frase_final(\"Pipo\", 3) == \"Pipo ganó 6 puntos\"\nprint(\"¡El juego completo pasó las pruebas!\")",
    challenge: "Cambia una regla y ajusta las pruebas para comprobarla.",
    starter: "def saludar(nombre):\n    return \"¡Hola, \" + nombre + \"!\"\n\nassert saludar(\"Pipo\") == \"¡Hola, Pipo!\"\nprint(\"¡Saludo comprobado!\")",
    hint: "Prueba también lo que ocurre cuando conectas dos funciones.",
    question: "¿Qué comprueba una prueba completa?",
    options: ["Que varias partes funcionen juntas en orden.", "Solo el color de un botón.", "Que el programa tenga un nombre largo."],
    answer: 0, why: "Una prueba completa revisa que las piezas se entiendan cuando se usan juntas."
  },
  {
    id: 32, emoji: "🏆", title: "¡Tu proyecto final!", story: "Llegaste al último nivel. Ahora tú decides qué aventura construir.",
    idea: "Los proyectos buenos empiezan pequeños. Elige una idea, escribe sus reglas, construye una parte, pruébala y luego agrega algo más.",
    example: "def presentar_aventura(nombre):\n    print(\"¡Bienvenido,\", nombre, \"!\")\n    print(\"Tu misión: encontrar tres estrellas ⭐\")\n\npresentar_aventura(\"Explorador\")",
    challenge: "Crea un juego, una historia con decisiones, una tienda de puntos o una lista para una aventura. Incluye una pregunta, una decisión y una prueba.",
    starter: "nombre = input(\"¿Cómo se llama tu héroe? \")\nprint(\"¡Vamos a la aventura,\", nombre, \"!\")",
    hint: "Empieza con un saludo, una regla sencilla y un final. Después puedes añadir listas, funciones o una cuenta de puntos.",
    question: "¿Cuál es una buena forma de empezar un proyecto grande?",
    options: ["Construir y probar primero una parte pequeña.", "Escribir todas las ideas a la vez.", "No probarlo hasta el final."],
    answer: 0, why: "Una parte pequeña que funciona da una base segura para seguir construyendo."
  }
];
