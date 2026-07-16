const API_URL = "https://gestion-tareas-api-782l.onrender.com/api/actividades";

async function cargarActividades() {
  try {
    const respuesta = await fetch(API_URL);
    const resultado = await respuesta.json();
    render(resultado.data);
  } catch (error) {
    console.error("Error al cargar actividades:", error);
  }
}

async function agregarActividad() {
  const input = document.getElementById("inputActividad");
  const prioridad = document.getElementById("prioridad").value;
  const descripcion = input.value.trim();
  if (!descripcion) return;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion, prioridad }),
    });
    input.value = "";
    cargarActividades();
  } catch (error) {
    console.error("Error al agregar actividad:", error);
  }
}

async function toggleEstado(id, estadoActual) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: !estadoActual }),
    });
    cargarActividades();
  } catch (error) {
    console.error("Error al actualizar actividad:", error);
  }
}

async function eliminar(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarActividades();
  } catch (error) {
    console.error("Error al eliminar actividad:", error);
  }
}

async function limpiar() {
  try {
    await fetch(API_URL, { method: "DELETE" });
    cargarActividades();
  } catch (error) {
    console.error("Error al limpiar actividades:", error);
  }
}

function render(actividades) {
  const lista = document.getElementById("listaActividades");
  lista.innerHTML = "";

  actividades.forEach((act) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${act.estado ? "completada" : ""}">
        ${act.descripcion} (${act.prioridad})
      </span>
      <button onclick="eliminar(${act.id})">❌</button>
    `;
    li.querySelector("span").onclick = () => toggleEstado(act.id, act.estado);
    lista.appendChild(li);
  });

  actualizar(actividades);
}

function actualizar(actividades) {
  document.getElementById("total").textContent = actividades.length;
  document.getElementById("pendientes").textContent =
    actividades.filter((a) => !a.estado).length;
  document.getElementById("completadas").textContent =
    actividades.filter((a) => a.estado).length;
}

document.addEventListener("DOMContentLoaded", cargarActividades);