const campoTitulo = document.getElementById('inputTitulo');
const campodescripcion = document.getElementById('inputDescp');
const campoHora = document.getElementById('InputHora');
const formulariotareas = document.getElementById('form');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const datosModal = document.getElementById('datosModal');
let Tareas = [];

const guardarLocalStorage = (datos) => {
    localStorage.setItem('Tareas', JSON.stringify(datos))
};

const recuperarLocalStorage = () => {
    Tareas = JSON.parse(localStorage.getItem('Tareas'));
    if (Tareas == null) Tareas = [];
    mostrarTareas();
};
//! CREATE
const guardarTarea = (datostareas) => {
    Tareas.push(datostareas);
    mostrarTareas();
};

//!READ
const mostrarTareas = () => {
    if (Tareas.length === 0) {
        return;
    }
    cuerpoTabla.innerHTML = Tareas.reduce((tit, tarea, index) => {
        return tit + `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${tarea.Titulo}</td>
            <td>${tarea.Descripcion}</td>
            <td>${tarea.Hora}</td>
            <td>
            
            <button class="btn btn-warning" onclick="editarTarea(${index})">Editar</button>
            <button class="btn btn-danger" onclick="eliminarTarea(${index})">Eliminar</button></td>
        </tr>
        `
    }, '');

   
    guardarLocalStorage(Tareas)
};

//! UPDATE
const editarTarea = (indice) => {
    const { Titulo, Descripcion, Hora } = Tareas[indice];
    const nuevoTitulo = prompt('Cambiar nombre de la tarea', Titulo);
    const nuevaDescrp = prompt('cambiar comentarios en la tarea', Descripcion);
    const nuevaHora = prompt('Agregar nueva hora "00:00 (am-pm)"', Hora)
    
    Tareas[indice] = {
        Titulo: nuevoTitulo,
        Descripcion: nuevaDescrp,
        Hora: nuevaHora,
    }
    mostrarTareas();
    alert('Se actualizó correctamente.')
};
//! DELETE
const eliminarTarea = (indice) => {
    if (confirm('¿Desea eliminar el elemento?')) {
        Tareas.splice(indice, 1);
        mostrarTareas();
        alert('Se eliminó correctamente.')
    }
};

formulariotareas.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!campoTitulo.value || !campodescripcion.value) {
        alert('Oye, ambos datos son requeridos.')
        return;
    }
    guardarTarea({
        Titulo: campoTitulo.value,
        Descripcion: campodescripcion.value,
        Hora: campoHora.value,
    });
    formulariotareas.reset();
});

recuperarLocalStorage();