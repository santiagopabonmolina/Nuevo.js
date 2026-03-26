const input = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-btn');
const Lista = document.getElementById('lista-tareas');
const mensajeError = document.getElementById('mensaje-error');
const totalSpan = document.getElementById('total');
const completadasSpan = document.getElementById('completadas');

btnAgregar.addEventListener('click', agregarTarea);

function agregarTarea() {
    const texto = input.value.trim();

    if (!texto || tareaExsite(texto)){
        mensajeError.classList.remove('oculto');
        
        mensajeError.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(0)' },


        ],{
            duration: 500,
            iterations: 2
        });

        return
    }

    mensajeError.classList.add('oculto')

    const li = document.createElement('li');
    
    li.classList.add('tarea');
      
    li.innerHTML = `
        <span>${texto}</span>
        <div class= "botones">
            <button class="btn btn-completar">Completar✓</button>
            <button class="btn btn-eliminar">Eliminar✗</button>
        </div>`;


        Lista.prepend(li);
        input.value = '';

        li.animate([
            {opacity: 0, transform: 'translateY(-20px)'},
            {opacity: 1, transform: 'translateY(0)'},


            ],{
                duration: 400,
                easing: 'ease-out'

            });

        const btnCompletar = li.querySelector('.btn-completar');
        const btnEliminar = li.querySelector('.btn-eliminar');

        btnCompletar.addEventListener('click', () => toogleCompletar(li));
        btnEliminar.addEventListener('click', () => eliminarTarea(li));
        
        
}

function tareaExsite(texto){
    const tareas = Lista.querySelectorAll('li');

    return Array.from(tareas).some( el => el.textContent.toLowerCase() === texto.toLowerCase());                                    
}