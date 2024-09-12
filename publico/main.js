document.getElementById('Form-tareas').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nameTarea = document.getElementById('nameTarea').value;

    const respuesta = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nameTarea })
    });

    if (respuesta.ok) {
        cargarTarea();
    }

    document.getElementById('nameTarea').value = '';
});

async function cargarTarea() {
    const respuesta = await fetch('/api/tareas');
    const tareas = await respuesta.json();
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;

        const accionesDiv = document.createElement('div');
        accionesDiv.className = 'acciones';

        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.onclick = () => editaTarea(tarea.id, tarea.nombre);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.onclick = () => eliminaTarea(tarea.id);

        accionesDiv.appendChild(editarBoton);
        accionesDiv.appendChild(eliminarBoton);
        li.appendChild(accionesDiv);
        listaTareas.appendChild(li);
    });
}

async function editaTarea(id, nombreActual) {
    const nuevoNombre = prompt('Editar tarea:', nombreActual);
    if (nuevoNombre) {
        const respuesta = await fetch(`/api/tareas/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre })
        });
        if (respuesta.ok) {
            cargarTarea();
        }
    }
}

async function eliminaTarea(id) {
    const respuesta = await fetch(`/api/tareas/${id}`, {
        method: 'DELETE'
    });
    if (respuesta.ok) {
        cargarTarea();
    }
}

cargarTarea();
