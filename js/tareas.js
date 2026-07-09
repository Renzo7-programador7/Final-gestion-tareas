// Lista de tareas en memoria
let tareas = [];
let siguienteId = 1;

const inputTitulo = document.getElementById("input-titulo");
const inputCategoria = document.getElementById("input-categoria");
const inputPrioridad = document.getElementById("input-prioridad");
const inputEtiqueta = document.getElementById("input-etiqueta");
const btnAgregar = document.getElementById("btn-agregar");
const tbody = document.getElementById("lista-tareas");

function renderizar() {
  tbody.innerHTML = "";

  if (tareas.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="5">No hay tareas agregadas</td>`;
    tbody.appendChild(fila);
    return;
  }

  tareas.forEach((tarea) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="${tarea.completada ? "completada" : ""}">${tarea.titulo}</td>
      <td>${tarea.categoria}</td>
      <td>${tarea.prioridad}</td>
      <td>${tarea.etiqueta}</td>
      <td>
        <button class="btn-concluidas" data-id="${tarea.id}">
          <ion-icon name="checkmark-circle-outline"></ion-icon>
        </button>
        <button class="btn-eliminar" data-id="${tarea.id}">
          <ion-icon name="trash"></ion-icon>
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function agregarTarea() {
  const titulo = inputTitulo.value.trim();
  const categoria = inputCategoria.value.trim() || "general";
  const prioridad = inputPrioridad.value;
  const etiqueta = inputEtiqueta.value.trim() || "sin-etiqueta";

  if (titulo === "") {
    alert("Escribe el título de la tarea");
    return;
  }

  tareas.push({
    id: siguienteId++,
    titulo,
    categoria,
    prioridad,
    etiqueta,
    completada: false,
  });

  inputTitulo.value = "";
  inputCategoria.value = "";
  inputPrioridad.value = "normal";
  inputEtiqueta.value = "";
  inputTitulo.focus();
  renderizar();
}

function completarTarea(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) tarea.completada = !tarea.completada;
  renderizar();
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  renderizar();
}

btnAgregar.addEventListener("click", agregarTarea);

inputTitulo.addEventListener("keypress", (e) => {
  if (e.key === "Enter") agregarTarea();
});

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (!id) return;

  if (btn.classList.contains("btn-concluidas")) {
    completarTarea(id);
  } else if (btn.classList.contains("btn-eliminar")) {
    eliminarTarea(id);
  }
});

renderizar();