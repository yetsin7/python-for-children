"use strict";

/** Project ideas a child can build alone, grouped by the stage that makes them possible. */
window.CHILD_IDEAS = {
  title: "Taller de inventos: crea lo que tú imagines",
  intro: "Aprender Python sirve para una cosa: construir tus propias ideas. Aquí tienes una receta que funciona para cualquier invento y una lista de proyectos para empezar. ¡Cámbialos todo lo que quieras!",
  recipeTitle: "La receta para inventar cualquier programa",
  recipe: [
    "Cuenta tu idea en una sola frase: «Mi programa va a…».",
    "Dibuja o escribe en papel qué verá la persona en la pantalla.",
    "Parte la idea en pasos muy pequeños, como piezas de un rompecabezas.",
    "Haz solo el primer paso y aprieta F5. ¿Funciona? ¡Sigue!",
    "Agrega un paso cada vez y prueba después de cada uno.",
    "Si algo se rompe, vuelve al último paso que funcionaba.",
    "Muéstraselo a alguien y pregúntale qué le agregaría."
  ],
  groups: [
    {
      title: "Después de la misión 12 · Ya puedes crear",
      ideas: [
        ["🎂", "Tarjeta de cumpleaños", "Pregunta el nombre y la edad, y muestra un mensaje con muchas velitas.", "input, variables y un ciclo for"],
        ["🎲", "Dado mágico", "Elige un número secreto y da pistas hasta que la persona lo adivine.", "if, else y un ciclo while"],
        ["🧮", "Entrenador de tablas", "Pregunta cinco multiplicaciones y cuenta cuántas acertaste.", "for, int, input y un contador"],
        ["🐾", "Cuestionario de animales", "Haz tres preguntas y, según las respuestas, di qué animal eres.", "input y varias decisiones con if"]
      ]
    },
    {
      title: "Después de la misión 22 · Inventos con memoria",
      ideas: [
        ["📔", "Diario secreto", "Escribe lo que pasó hoy y guárdalo en un archivo para leerlo mañana.", "open, with y archivos"],
        ["🏆", "Tabla de récords", "Guarda los puntajes de tus amigos y muestra quién va ganando.", "listas, archivos y funciones"],
        ["🤖", "Fábrica de robots", "Crea varios robots con nombre y poderes distintos, y haz que se presenten.", "clases y objetos"],
        ["🔎", "Buscador de tesoros", "Esconde un tesoro en una lista y cuenta cuántos pasos tomó encontrarlo.", "listas, for y enumerate"]
      ]
    },
    {
      title: "Después de la misión 32 · Proyectos de verdad",
      ideas: [
        ["🛒", "Tiendita de estrellas", "Muestra productos y precios, suma la compra y calcula el vuelto exacto.", "diccionarios y Decimal"],
        ["📅", "Cuenta días", "Calcula cuántos días faltan para tu cumpleaños o para las vacaciones.", "fechas con date"],
        ["🗺️", "Aventura con decisiones", "Una historia donde cada elección lleva a un final distinto.", "funciones, if e input"],
        ["✨", "Tu propio invento", "La mejor idea es la tuya. Usa la receta de arriba y empieza por lo más pequeño.", "todo lo que ya sabes"]
      ]
    }
  ],
  closing: "Ningún invento sale perfecto a la primera. Los buenos inventores prueban, se equivocan, arreglan y vuelven a probar."
};
