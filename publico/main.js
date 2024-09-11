document.getElementById('Form-tareas').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nameTarea = document.getElementById('nameTarea').value;

    const respuesta = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nameTarea })
    });

    if (respuesta.ok){
        loadTask();
    }

    document.getElementById('nameTarea').value = '';
});

async function loadTask() {
    const respuesta = await fetch('/api/tareas');
    const tareas = await respuesta.json();
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;
        listaTareas.appendChild(li);
    });
}

loadTask();