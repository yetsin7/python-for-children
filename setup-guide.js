"use strict";

/** Step-by-step preparation guide shown before the first mission. */
window.CHILD_SETUP = {
  title: "Prepara tu nave antes de despegar",
  intro: "Antes de la primera misión hay que preparar la computadora. Se hace una sola vez y toma un ratito. Pídele a una persona adulta que se siente contigo: ¡entre dos es más fácil y más divertido!",
  sections: [
    {
      emoji: "🖱️", title: "Conoce tu computadora",
      text: "Estas son las palabras que vamos a usar en todas las misiones.",
      items: [
        "Pantalla: donde ves todo. Ahí aparecerán los mensajes de tus programas.",
        "Teclado: las teclas con letras y números. Con él escribes tus instrucciones.",
        "Ratón o panel táctil: mueve la flechita de la pantalla. Esa flechita se llama cursor.",
        "Hacer clic: apretar una vez el botón izquierdo. Sirve para elegir.",
        "Doble clic: apretar dos veces muy rápido. Sirve para abrir.",
        "Archivo: un trabajo guardado, como un dibujo o un programa. Tus programas serán archivos.",
        "Carpeta: una cajita con nombre donde guardas tus archivos para no perderlos."
      ]
    },
    {
      emoji: "⌨️", title: "Las teclas mágicas",
      text: "Para programar necesitas algunos símbolos especiales. Mira el dibujo de cada tecla: si el símbolo está arriba, mantén apretada la tecla Shift (la de la flecha hacia arriba ⇧) y luego aprieta esa tecla.",
      items: [
        "Comillas \" → Shift + 2. Envuelven los mensajes. Siempre van de a dos: una abre y otra cierra.",
        "Paréntesis ( ) → Shift + 8 abre y Shift + 9 cierra. También van de a dos.",
        "Igual = → Shift + 0. Sirve para guardar cosas en cajas.",
        "Dos puntos : → Shift + la tecla del punto.",
        "Asterisco * → Shift + la tecla del signo más. Sirve para multiplicar.",
        "Enter → la tecla grande de la derecha. Significa «¡listo!» y también baja a la línea siguiente.",
        "Barra espaciadora → la tecla más larga. Escribe un espacio.",
        "Borrar ← → la tecla sobre Enter. Borra la letra anterior. ¡Equivocarse y borrar es parte del juego!",
        "Si tu teclado es distinto, busca el dibujo del símbolo en las teclas. Si está abajo a la derecha de la tecla, usa Alt Gr en lugar de Shift."
      ]
    },
    {
      emoji: "📥", title: "Instala Python (con una persona adulta)",
      text: "Python es el programa que entiende tus instrucciones. Es gratis y seguro si se descarga de su página oficial.",
      items: [
        "Abran el navegador de internet y escriban arriba: python.org/downloads. Presionen Enter.",
        "Hagan clic en el botón grande que dice «Download Python».",
        "Abran el archivo que se descargó haciendo doble clic sobre él.",
        "Si ven una casilla que dice «Add python.exe to PATH», márquenla con un clic. Si no aparece, sigan adelante.",
        "Hagan clic en «Install Now» y esperen. Si la computadora pregunta si permiten cambios, respondan «Sí».",
        "Cuando diga que la instalación terminó bien, cierren esa ventana. ¡Python ya vive en la computadora!"
      ]
    },
    {
      emoji: "📁", title: "Crea tu carpeta de misiones",
      text: "Vamos a guardar todos tus programas en un mismo lugar.",
      items: [
        "Ve al Escritorio: la pantalla principal, donde está el fondo de pantalla.",
        "Haz clic derecho en un lugar vacío.",
        "Elige «Nuevo» y después «Carpeta».",
        "Escribe el nombre mis-misiones y presiona Enter.",
        "¡Listo! Ahí vivirán todos tus programas."
      ]
    },
    {
      emoji: "🐍", title: "Abre IDLE, tu cuaderno de programar",
      text: "IDLE es un programa que llegó junto con Python. Sirve para escribir programas y ejecutarlos. Se dice «áidel».",
      items: [
        "Aprieta la tecla Windows: la que tiene el dibujo de una ventana, abajo a la izquierda.",
        "Escribe IDLE y presiona Enter.",
        "Se abre una ventana blanca con el símbolo >>>. Ahí aparecerán los resultados de tus programas.",
        "Arriba, haz clic en «File» y después en «New File».",
        "Se abre otra ventana, totalmente vacía. Esa es tu hoja para escribir. ¡Ya tienes dos ventanas: una para escribir y otra para ver resultados!"
      ]
    },
    {
      emoji: "🚀", title: "Escribe y ejecuta tu primer programa",
      text: "Estos son los cuatro pasos que repetirás en todas las misiones: escribir, guardar, ejecutar y mirar.",
      items: [
        "Escribir: en la hoja vacía escribe print(\"¡Hola!\"). Revisa que haya dos paréntesis y dos comillas.",
        "Guardar: haz clic en «File» y luego en «Save As». Busca tu carpeta mis-misiones, escribe el nombre mision-1 y haz clic en «Guardar».",
        "Ejecutar: aprieta la tecla F5, que está en la fila de arriba del teclado. En algunas laptops hay que mantener apretada la tecla Fn mientras aprietas F5. También puedes hacer clic en «Run» y luego en «Run Module».",
        "Mirar: en la ventana del >>> debe aparecer ¡Hola!. ¡Ese es tu primer programa funcionando!",
        "Cada vez que cambies algo, guarda con Ctrl + S y aprieta F5 otra vez."
      ]
    },
    {
      emoji: "🧯", title: "Si algo sale mal",
      text: "A todas las personas que programan les salen errores, todos los días. Un error no es una mala nota: es una pista.",
      items: [
        "Si aparecen letras rojas, no te asustes. Python está avisando que no entendió algo.",
        "Lee la última línea roja. Ahí dice qué tipo de problema es.",
        "Revisa las parejas: cada comilla y cada paréntesis que se abre tiene que cerrarse.",
        "Revisa las mayúsculas: print funciona, Print no.",
        "Arregla una sola cosa, guarda y ejecuta de nuevo.",
        "Si después de tres intentos sigue igual, toma agua, descansa un momento y pide ayuda. ¡Pedir ayuda también es de buenos exploradores!"
      ]
    }
  ],
  grownups: "Para quien acompaña: no hace falta saber programar. Su tarea es leer los pasos en voz alta, dejar que el niño o la niña use el teclado aunque vaya lento, y celebrar los errores como pistas. Sesiones de 20 a 30 minutos funcionan mejor que una sola sesión larga. Si IDLE no aparece en el menú, abran PowerShell y escriban python -m idlelib."
};
