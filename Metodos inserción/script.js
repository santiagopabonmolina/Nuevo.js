const input = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-btn');
const Lista = document.getElementById('lista-tareas');
const mensajeError = document.getElementById('mensaje-error');
const totalSpan = document.getElementById('total');
const completadasSpan = document.getElementById('completadas');

btnAgregar.addEventListener('click', agregarTarea);

function agregarTarea(tarea) {
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

        btnCompletar.addEventListener('click', () => toogleCompletada(li));
        btnEliminar.addEventListener('click', () => eliminarTarea(li));

        actualizarContadores();
        
        
}

function tareaExsite(texto){
    const tarea = Lista.querySelectorAll('li span');

    return Array.from(tarea).some( span => span.textContent.toLowerCase() === texto.toLowerCase());                                    
}

function toogleCompletada(tarea){
    tarea.classList.toggle('completada');

    tarea.animate([
        {transform: 'scale(1)' },
        {transform: 'scale(1.02)' },
        {transform: 'scale(1)' }
    ],
    {duration: 200})

    actualizarContadores();
 }

 function eliminarTarea(tarea){
    const animcaionSalida = tarea.animate([
        {transform: 'scale(1)' },
        {transform: 'scale(1.02)' },
        {transform: 'scale(1)' }
    ],
    {duration: 200})

    animcaionSalida.finished.then(() => { tarea.remove();
    actualizarContadores();
     });
    
 }

 function actualizarContadores(){
    const total = Lista.children.length; 

    const completadas = Array.from(Lista.children).filter( li => li.classList.contains('completada')).length; 

    totalSpan.textContent = total;
    completadasSpan.textContent = completadas;

 }