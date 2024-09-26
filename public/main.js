localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbmRldiIsImlhdCI6MTcyNzIyMTEyNSwiZXhwIjoxNzI3MjI0NzI1fQ.U4GBPoVdt9lZ1EarFrHvcZy4upOFX58t3Dy98i9bB4c');

// Añadir el evento de envío al formulario de tareas
document.getElementById('Form-tareas').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nameTarea = document.getElementById('nameTarea').value;

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró el token.');
        return;
    }

    const respuesta = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: nameTarea })
    });

    if (respuesta.ok) {
        cargarTarea();
    } else {
        const error = await respuesta.json();
        console.error(`Error al crear la tarea (Código ${respuesta.status}): ${error.message}`);
    }

    document.getElementById('nameTarea').value = '';
});

// Función para cargar y mostrar las tareas
async function cargarTarea() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró el token.');
        return;
    }

    const respuesta = await fetch('/api/tareas', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (respuesta.ok) {
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
    } else {
        const error = await respuesta.json();
        console.error(`Error al cargar las tareas (Código ${respuesta.status}): ${error.message}`);
    }
}

// Función para editar una tarea
async function editaTarea(id, nombreActual) {
    const nuevoNombre = prompt('Editar tarea:', nombreActual);
    if (nuevoNombre) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token.');
            return;
        }

        const respuesta = await fetch(`/api/tareas/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nombre: nuevoNombre })
        });
        
        if (respuesta.ok) {
            cargarTarea();
        } else {
            const error = await respuesta.json();
            console.error(`Error al editar la tarea (Código ${respuesta.status}): ${error.message}`);
        }
    }
}

// Función para eliminar una tarea
async function eliminaTarea(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró el token.');
        return;
    }

    const respuesta = await fetch(`/api/tareas/${id}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (respuesta.ok) {
        cargarTarea();
    } else {
        const error = await respuesta.json();
        console.error(`Error al eliminar la tarea (Código ${respuesta.status}): ${error.message}`);
    }
}

// Cargar las tareas al inicio
cargarTarea();
