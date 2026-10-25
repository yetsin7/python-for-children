"use strict";

window.CHILD_LESSONS = [
  {
    id: 1, emoji: "👋", title: "¡Hola, Python!", story: "El robot Pipo acaba de despertar. ¡Dale su primera instrucción!",
    idea: "Un programa es una lista de instrucciones para la computadora. Python las sigue en orden. print(...) le pide que muestre un mensaje en la pantalla.",
    example: "print(\"¡Hola, mundo!\")",
    challenge: "Haz que Pipo te salude. Cambia el mensaje por tu nombre o inventa un saludo divertido.",
    starter: "print(\"¡Hola, explorador!\")",
    hint: "El mensaje va entre comillas y dentro de los paréntesis de print.",
    question: "¿Qué hace print(\"¡Hola!\")?",
    options: ["Muestra ¡Hola! en la pantalla.", "Apaga la computadora.", "Guarda un dibujo."],
    answer: 0, why: "¡Exacto! print muestra en la pantalla lo que escribiste entre sus paréntesis."
  },
  {
    id: 2, emoji: "💬", title: "Palabras con poderes", story: "Pipo encontró una caja de palabras mágicas. ¡Vamos a llenarla de mensajes!",
    idea: "Las palabras y frases se llaman texto. En Python, el texto va entre comillas. Puedes usar letras, espacios, signos y hasta emojis.",
    example: "print(\"¡Pipo encontró un tesoro!\")\nprint(\"💎💎💎\")",
    challenge: "Crea un letrero para la aventura: escribe dos mensajes y agrega un emoji.",
    starter: "print(\"Mi aventura empieza\")\nprint(\"🚀\")",
    hint: "Cada print puede mostrar una línea. No olvides abrir y cerrar las comillas.",
    question: "¿Cómo sabe Python dónde empieza y termina un mensaje?",
    options: ["Por las comillas.", "Por el color de las letras.", "Por un dibujo."],
    answer: 0, why: "Las comillas marcan el principio y el final del texto."
  },
  {
    id: 3, emoji: "🔢", title: "Números en acción", story: "La puerta del castillo tiene un acertijo matemático. ¡Ayuda a Pipo a resolverlo!",
    idea: "Python también es una calculadora. Usa + para sumar, - para restar y * para multiplicar. Puedes mostrar la respuesta con print.",
    example: "print(8 + 4)\nprint(3 * 5)",
    challenge: "Calcula cuántas galletas hay en 4 platos con 6 galletas cada uno. ¡Prueba también otra cuenta!",
    starter: "print(4 * 6)",
    hint: "Multiplicar significa sumar el mismo número varias veces.",
    question: "¿Qué símbolo usamos para multiplicar en Python?",
    options: ["x", "*", "%"],
    answer: 1, why: "Python usa el asterisco * para multiplicar."
  },
  {
    id: 4, emoji: "📦", title: "Cajas de memoria", story: "¡Pipo quiere guardar el nombre de su mascota robot en una caja!",
    idea: "Una variable es una caja con nombre donde guardamos un dato. Usa = para guardar algo y escribe el nombre de la caja para usarlo.",
    example: "mascota = \"Chispa\"\nprint(mascota)",
    challenge: "Guarda en variables tu nombre y tu animal favorito. ¡Después muéstralos!",
    starter: "nombre = \"Aventurero\"\nprint(nombre)",
    hint: "Primero escribe un nombre, después =, y luego el dato. No hace falta poner comillas al usar la variable.",
    question: "¿Qué hace nombre = \"Luz\"?",
    options: ["Guarda el texto Luz en una caja llamada nombre.", "Borra la computadora.", "Suma dos números."],
    answer: 0, why: "¡Sí! Crea la variable nombre y guarda ahí el texto Luz."
  },
  {
    id: 5, emoji: "🎤", title: "Habla con tu programa", story: "Pipo quiere conocerte. ¡Ahora el programa puede hacerte una pregunta!",
    idea: "input(\"pregunta\") muestra una pregunta y espera tu respuesta. La respuesta es texto y puedes guardarla en una variable. Escríbela en la cajita de entrada antes de ejecutar.",
    example: "nombre = input(\"¿Cómo te llamas? \")\nprint(\"¡Hola, \" + nombre + \"!\")",
    challenge: "Haz una pregunta diferente y usa la respuesta en un mensaje de bienvenida.",
    starter: "color = input(\"¿Cuál es tu color favorito? \")\nprint(\"¡Me gusta el \" + color + \"!\")",
    hint: "Escribe tu respuesta en «Respuesta para input» antes de ejecutar. Para unir textos, usa +.",
    question: "¿Qué hace input()?",
    options: ["Espera a que alguien escriba una respuesta.", "Dibuja una estrella.", "Repite el programa para siempre."],
    answer: 0, why: "input() pregunta y espera que la persona escriba algo."
  },
  {
    id: 6, emoji: "🧭", title: "El robot elige un camino", story: "Hay dos puertas: una lleva al tesoro y la otra al jardín. ¡Pipo puede elegir!",
    idea: "if significa «si». Python puede elegir qué hacer según una respuesta. else significa «si no». No olvides los dos puntos y los espacios al inicio de la línea de adentro.",
    example: "llueve = True\nif llueve:\n    print(\"¡Saca el paraguas!\")\nelse:\n    print(\"¡Vamos al parque!\")",
    challenge: "Cambia el ejemplo para que Pipo elija entre dos caminos o dos meriendas.",
    starter: "tesoro = True\nif tesoro:\n    print(\"¡Encontramos oro!\")\nelse:\n    print(\"¡Sigamos buscando!\")",
    hint: "La línea después de if termina con :. Las instrucciones que dependen de él llevan cuatro espacios.",
    question: "¿Qué significa else?",
    options: ["Si no se cumple la condición.", "Repite una instrucción.", "Guarda un número."],
    answer: 0, why: "else describe lo que Python hace cuando la condición del if no se cumple."
  },
  {
    id: 7, emoji: "🔁", title: "Repite y ahorra trabajo", story: "¡Pipo tiene que saludar a tres amigos! Una repetición le ahorra escribirlo tres veces.",
    idea: "Un ciclo repite instrucciones. for amigo in range(3) repite tres veces lo que está debajo. range(3) cuenta 0, 1 y 2: ¡son tres vueltas!",
    example: "for vuelta in range(3):\n    print(\"¡Hola, amigo!\")",
    challenge: "Haz que Pipo repita una frase 5 veces. Cambia también la frase.",
    starter: "for vuelta in range(5):\n    print(\"¡Podemos hacerlo!\")",
    hint: "Cambia el número dentro de range(...). La instrucción repetida lleva cuatro espacios.",
    question: "¿Cuántas veces se repite for vuelta in range(3)?",
    options: ["2 veces.", "3 veces.", "4 veces."],
    answer: 1, why: "range(3) cuenta 0, 1 y 2. Son tres números y, por tanto, tres vueltas."
  },
  {
    id: 8, emoji: "⏳", title: "Cuenta regresiva", story: "¡El cohete de Pipo está listo! Usemos while para hacer la cuenta regresiva.",
    idea: "while significa «mientras». Repite instrucciones mientras algo sea verdadero. Cambia el número dentro del ciclo para que la condición deje de cumplirse y el programa pueda terminar.",
    example: "cuenta = 3\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta = cuenta - 1\nprint(\"¡Despegue!\")",
    challenge: "Haz una cuenta regresiva desde 5 y cambia el mensaje del despegue.",
    starter: "cuenta = 5\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta = cuenta - 1\nprint(\"¡Despegue!\")",
    hint: "La línea cuenta = cuenta - 1 hace que el número baje para que el ciclo termine.",
    question: "¿Por qué cambia cuenta dentro del ciclo?",
    options: ["Para que algún día la cuenta llegue a 0 y termine.", "Para decorar el código.", "Para cambiar el color de la pantalla."],
    answer: 0, why: "Sin cambiar cuenta, seguiría siendo mayor que 0 y el ciclo no terminaría."
  },
  {
    id: 9, emoji: "🛠️", title: "Crea tus propios poderes", story: "Pipo quiere tener un superpoder que pueda usar una y otra vez.",
    idea: "Una función es un grupo de instrucciones con nombre. def crea la función y () la pone en marcha. Puedes llamarla todas las veces que quieras.",
    example: "def saludar():\n    print(\"¡Hola, equipo!\")\n\nsaludar()\nsaludar()",
    challenge: "Crea una función con un nombre divertido. Haz que muestre un mensaje y úsala dos veces.",
    starter: "def baile_robot():\n    print(\"🤖 ¡Bip, bop!\")\n\nbaile_robot()\nbaile_robot()",
    hint: "La función empieza con def y :. Las instrucciones de dentro llevan cuatro espacios.",
    question: "¿Qué hay que escribir para usar una función llamada jugar?",
    options: ["jugar()", "def jugar", "play!"],
    answer: 0, why: "La función se ejecuta al escribir su nombre seguido de paréntesis: jugar()."
  },
  {
    id: 10, emoji: "🎒", title: "La mochila de aventuras", story: "Pipo necesita una lista para no olvidar nada antes de salir.",
    idea: "Una lista guarda varios elementos en orden. Se escribe entre corchetes. Usa comas para separar las cosas y .append(...) para agregar una nueva.",
    example: "mochila = [\"mapa\", \"agua\"]\nmochila.append(\"galletas\")\nprint(mochila)",
    challenge: "Haz una lista para tu aventura y añade una cosa más. ¡Muestra la lista al final!",
    starter: "mochila = [\"mapa\", \"linterna\"]\nmochila.append(\"tesoro\")\nprint(mochila)",
    hint: "Escribe los elementos entre [corchetes], separados por comas.",
    question: "¿Cómo agregamos una cosa nueva al final de una lista llamada mochila?",
    options: ["mochila.append(\"cosa\")", "mochila + 1", "print.append"],
    answer: 0, why: "append agrega un elemento al final de la lista mochila."
  },
  {
    id: 11, emoji: "🕵️", title: "Detectives de errores", story: "¡El mapa de Pipo no funciona! Los detectives revisan cada pista, paso a paso.",
    idea: "Los errores son pistas, no fracasos. Lee la última línea del mensaje, comprueba que cada paréntesis y comilla tenga su pareja y cambia una cosa por vez.",
    example: "mensaje = \"¡Pista encontrada!\"\nprint(mensaje)",
    challenge: "Cambia el mensaje, ejecútalo y luego quita una comilla a propósito. Lee la pista de Python y vuelve a ponerla.",
    starter: "mensaje = \"¡Pista encontrada!\"\nprint(mensaje)",
    hint: "Una comilla que no tiene pareja suele causar SyntaxError. Compara la línea con el ejemplo.",
    question: "¿Qué conviene hacer cuando aparece un error?",
    options: ["Leer la pista y revisar el código con calma.", "Cerrar todo y rendirse.", "Borrar todas las instrucciones."],
    answer: 0, why: "Los errores nos dan información para encontrar y corregir un problema."
  },
  {
    id: 12, emoji: "🎮", title: "¡Tu primer mini juego!", story: "¡Llegó la última misión! Mezcla tus poderes y crea un juego de adivinanzas.",
    idea: "Los proyectos grandes se construyen en pasos pequeños. Este juego pregunta un número, comprueba la respuesta y usa una pista. ¡Puedes cambiar el número secreto!",
    example: "secreto = 7\nrespuesta = int(input(\"Adivina el número del 1 al 10: \"))\nif respuesta == secreto:\n    print(\"¡Ganaste! 🏆\")\nelse:\n    print(\"¡Casi! El número era\", secreto)",
    challenge: "Cambia el número secreto y los mensajes. Prueba adivinarlo. Si quieres, usa varias preguntas y pistas.",
    starter: "secreto = 7\nrespuesta = int(input(\"Adivina el número del 1 al 10: \"))\nif respuesta == secreto:\n    print(\"¡Ganaste! 🏆\")\nelse:\n    print(\"¡Casi! El número era\", secreto)",
    hint: "Escribe un número, sin palabras, en «Respuesta para input». int(...) convierte el texto en número.",
    question: "¿Qué comprueba respuesta == secreto?",
    options: ["Si los dos valores son iguales.", "Si hace frío.", "Si la lista está vacía."],
    answer: 0, why: "== compara los valores. Si son iguales, la respuesta es verdadera."
  }
];
