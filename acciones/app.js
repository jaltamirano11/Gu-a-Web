/*
  GUÍA DEL PROFESOR: SCRIPT DE EVENTOS

  Concepto Clave: El DOM (Document Object Model) nos permite "escuchar"
  interacciones del usuario.

  El patrón principal es:
  1. Obtener el elemento del DOM.
  2. Añadir un "oyente" (listener) para un evento específico (ej. 'click').
  3. Pasar una función (callback) que se ejecutará CUANDO ocurra el evento.
*/

// --- [1] OBTENER REFERENCIAS ---
// Es una buena práctica obtener todos los elementos del DOM al inicio.
const log = document.getElementById('log');
const btnClick = document.getElementById('btnClick');
const txtNombre = document.getElementById('txtNombre');
const box = document.getElementById('box');
const btnAsync = document.getElementById('btnAsync');

// --- [2] FUNCIÓN AUXILIAR (HELPER) ---
// Creamos una función simple para imprimir en nuestro 'log' visual.
// Usamos `textContent += ...` para añadir líneas nuevas sin borrar las anteriores.
const print = (msg) => {
  log.textContent += `• ${msg}\n`;
  // (Consejo de Experto) Hacemos scroll automático al final
  log.scrollTop = log.scrollHeight;
};

// --- [3] EVENTOS DE CLICK ---
btnClick.addEventListener('click', () => {
  // Esta función (anónima) es el "callback" o "manejador" (handler).
  // Solo se ejecuta cuando ocurre el 'click'.
  print('Hiciste click en el botón (Simple)');
});

// --- [4] EVENTO DE INPUT ---
txtNombre.addEventListener('input', (e) => {
  // 'e' es el objeto de evento (Event Object). Contiene información
  // valiosa sobre la interacción que acaba de ocurrir.
  
  // 'e.target' se refiere al elemento que disparó el evento (el <input>).
  // 'e.target.value' es el texto actual dentro del campo.
  print(`Escribiendo: ${e.target.value}`);
});

// --- [5] EVENTOS DE MOUSE Y FOCO ---
// 'mouseenter' es como 'hover' en CSS. Se dispara una vez al entrar.
box.addEventListener('mouseenter', () => print('Mouse encima del cuadro'));
box.addEventListener('mouseleave', () => print('Mouse salió del cuadro'));

// 'focus' se dispara cuando el elemento se "activa" (con click o con Teclado).
// (Esto funciona en el <div> gracias a `tabindex="0"` en el HTML).
box.addEventListener('focus', () => print('El cuadro recibió foco (teclado/click)'));
// 'blur' es lo opuesto a 'focus'. Se dispara cuando el elemento pierde el foco.
box.addEventListener('blur', () => print('El cuadro perdió el foco'));

// --- [6] EVENTOS GLOBALES (WINDOW) ---
// El objeto 'window' representa toda la pestaña del navegador.
// 'load' espera a que TODO (HTML, CSS, imágenes) haya cargado.
window.addEventListener('load', () => print('La página terminó de cargar (window.load)'));

// 'resize' se dispara continuamente mientras se cambia el tamaño de la ventana.
window.addEventListener('resize', () => {
  print(`Cambiando tamaño: ${window.innerWidth}x${window.innerHeight}`);
});

// --- [7V] EVENTO ASÍNCRONO (NIVEL AVANZADO) ---
// El evento 'click' sigue siendo síncrono, pero la función que
// ejecuta (el handler) es asíncrona (declarada con 'async').
btnAsync.addEventListener('click', async () => {
  print('Cargando datos (Fetch simulado)...');
  
  // 'await' pausa la ejecución SÓLO DENTRO de esta función async,
  // permitiendo que la interfaz siga respondiendo.
  await new Promise(r => setTimeout(r, 800));
  
  const datos = [{id:1, nombre:'María'}, {id:2, nombre:'Pedro'}];
  print(`✅ Datos listos: ${JSON.stringify(datos)}`);
});



