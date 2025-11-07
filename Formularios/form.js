// --- [1] REFERENCIAS AL DOM ---
const form = document.getElementById('formRegistro');
const out = document.getElementById('resultado');

// Nuevas referencias para la lista de registrados
const listaUI = document.getElementById('listaUsuarios');
const sinRegistrosUI = document.getElementById('sinRegistros');

// Consejo de Experto: Usa una constante para la clave de Local Storage.
// Evita errores de tipeo en el futuro.
const KEY_LOCAL_STORAGE = 'registros_usuarios';

// --- [2] FUNCIÓN PARA CARGAR Y MOSTRAR DATOS ---
// Esta función lee el Local Storage y actualiza la lista <ul>
function cargarRegistros() {
  // Obtenemos los datos. Si no existe, inicializamos con un array vacío [].
  const registros = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || [];

  // Limpiamos la lista actual para no duplicar datos
  listaUI.innerHTML = '';

  if (registros.length === 0) {
    // Si no hay registros, mostramos el mensaje de "sin registros"
    sinRegistrosUI.style.display = 'block';
    listaUI.style.display = 'none';
  } else {
    // Si hay registros, ocultamos el mensaje y mostramos la lista
    sinRegistrosUI.style.display = 'none';
    listaUI.style.display = 'block';

    // Iteramos sobre los registros y creamos un <li> por cada uno
    registros.forEach(usuario => {
      const li = document.createElement('li');
      // Usamos textContent para evitar inyecciones HTML (más seguro)
      li.textContent = `${usuario.nombre} (${usuario.correo}) - Turno: ${usuario.turno}`;
      listaUI.appendChild(li);
    });
  }
}

// --- [3] MANEJADOR DEL EVENTO SUBMIT (GUARDADO) ---
form.addEventListener('submit', (e) => {
  // Prevenimos el envío tradicional del formulario
  e.preventDefault();

  // Validación sencilla
  if (!form.checkValidity()) {
    out.textContent = 'Porfa, revisá los campos marcados (faltan datos o formato).';
    return;
  }

  // Obtenemos los datos del formulario (esto ya lo tenías bien)
  const data = Object.fromEntries(new FormData(form).entries());
  data.boletin = form.boletin.checked;

  // Mostramos feedback inmediato
  out.textContent = `✅ Datos recibidos:\n${JSON.stringify(data, null, 2)}`;

  // --- LÓGICA DE GUARDADO MEJORADA ---
  
  // 1. Obtenemos la lista *actual* de registros
  const registrosActuales = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)) || [];
  
  // 2. Añadimos el nuevo registro (data) al array
  registrosActuales.push(data);
  
  // 3. Guardamos el array *actualizado* de vuelta en Local Storage
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(registrosActuales));

  // --- FIN LÓGICA DE GUARDADO ---

  // Actualizamos la lista visible de usuarios
  cargarRegistros();

  // (Opcional) Limpiamos el formulario después de un envío exitoso
  form.reset();
  
  // (Opcional) Limpiamos el feedback después de unos segundos
  setTimeout(() => {
    out.textContent = '';
  }, 3000);
});

// --- [5] ELIMINAR TODOS LOS REGISTROS ---
const btnEliminarTodo = document.getElementById('btnEliminarTodo');

btnEliminarTodo.addEventListener('click', () => {
  if (confirm('¿Seguro que deseas eliminar todos los registros guardados?')) {
    // Eliminar clave del LocalStorage
    localStorage.removeItem(KEY_LOCAL_STORAGE);
    
    // Limpiar lista en pantalla
    listaUI.innerHTML = '';
    sinRegistrosUI.style.display = 'block';
    listaUI.style.display = 'none';
  }
});

// --- [4] CARGA INICIAL ---
// Escuchamos el evento 'DOMContentLoaded' para asegurarnos que todo el HTML
// está cargado antes de intentar leer el Local Storage.
document.addEventListener('DOMContentLoaded', () => {
  cargarRegistros();
});
