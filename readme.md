# Curso infantil: Club Python

Un curso interactivo en español para empezar Python desde cero, pensado para
una niña o un niño de unos 9 años. No hace falta saber programar ni instalar
Python para ejecutar los ejercicios: el código se ejecuta en el navegador.
Cada misión presenta una idea, un ejemplo que se puede editar, un reto para
probar, una pregunta y una estrella de progreso.

## Empezar

Abre `index.html` con doble clic. No necesitas instalar Python ni iniciar un
servidor para leer las misiones o ejecutar sus ejercicios en el navegador.
Pulsa **Ejecutar mi código** para preparar Python la primera vez; esa descarga
sí necesita internet.

Opcionalmente, en Windows puedes ejecutar `.\start-course.ps1` desde PowerShell
para abrir el curso mediante un servidor local. Ese lanzador sí necesita el
comando `python`, pero no lo usa para ejecutar las prácticas.

También puedes iniciar el servidor desde esta carpeta con:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Luego abre <http://127.0.0.1:8765> en el navegador. El servidor solo escucha
en este equipo. Para cerrarlo, pulsa `Ctrl+C` en la ventana de PowerShell.

## La consola y la conexión

El editor ejecuta Python de verdad en el navegador con Pyodide. La primera vez
necesita internet para descargar Pyodide desde jsDelivr; después el navegador
puede conservar esos archivos en su caché. Durante la descarga se muestra el
archivo actual y su porcentaje cuando se puede medir; si el servidor comprime
los datos, la barra sigue animada y muestra cuánto se ha leído. Si algo falla,
la consola muestra en qué etapa ocurrió y el detalle del error. Las lecciones,
el editor y el progreso no necesitan una cuenta. El código se ejecuta en el
equipo y no se envía a un servidor del curso. Una ejecución que dure demasiado
se detiene para que un ciclo accidental no congele la página. `input()` lee lo
escrito en el campo **Respuesta para input()**; escribe ahí el texto antes de
ejecutar.

El progreso y los borradores se guardan en el almacenamiento local del
navegador. Si se borran sus datos o se usa otro navegador, ese progreso no se
traslada automáticamente.

## Ruta de las 32 misiones

- **Etapa 1 · Primeros pasos (1–12):** instrucciones, texto, números,
  variables, preguntas, decisiones, repeticiones, funciones, listas, errores
  y el primer mini juego.
- **Etapa 2 · Taller de inventos (13–22):** funciones con resultados,
  módulos, errores, archivos, tablas CSV, versiones, pruebas, clases, tipos y
  algoritmos.
- **Etapa 3 · Laboratorio de proyectos (23–32):** fechas, dinero, datos,
  cambios seguros, diseño, APIs, aplicaciones, seguridad, pruebas completas y
  un proyecto final.

## Para la familia

Conviene acompañar las primeras sesiones y dejar que el niño escriba y pruebe
sus propias ideas. No pasa nada si una respuesta o un programa no funciona a la
primera: encontrar y corregir errores es parte de aprender. El curso guarda el
código que se escribe en cada misión. El primer juego y los proyectos finales
son ejemplos para modificar, no tareas que deban quedar perfectas. Las etapas
avanzadas son opcionales; cada misión puede durar unos 10–20 minutos, con
descansos cuando hagan falta.
