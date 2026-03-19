const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const ciudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    const usuario = {
        nombre: nombre.value,
        edad: edad.value,
        ciudad: ciudad.value,
        fechaRegistro: new Date().toLocaleString(),
        saludar: function(){
            return `Hola, soy ${this.nombre}, de ${this.ciudad} y tengo ${this.edad} años.`
        }
    };
    
    const usuarioJSON = JSON.stringify(usuario);

    const listaActual = JSON.parse(localStorage.getItem("usuarios")) || [];

    listaActual.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(listaActual));

    const datosGuardados = usuario;
    const {nombre: name, ciudad: city, edad: age} = datosGuardados;

    const usuarioActualizado = {
        ...datosGuardados,
        edad: age + 1,
        actualizado: true
    };

    resultado.innerHTML = `
    <h2>Información del Usuario</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Edad:</strong> ${age}</p>
    <p><strong>Ciudad:</strong> ${city}</p>
    <p><strong>JSON:</strong> ${usuarioJSON}</p>
    <p><strong>Usuario Spread:</strong> ${JSON.stringify(usuarioActualizado)}</p>`;
});

function verUsuarios() {
    const lista = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (lista.length === 0) {
        resultado.innerHTML = "<p>No hay usuarios guardados.</p>";
        return;
    }

    let html = "<h2>Usuarios en localStorage</h2>";

    lista.forEach(function(u, i) {
        html += `
        <div>
            <p><strong>Usuario ${i + 1}</strong></p>
            <p><strong>Nombre:</strong> ${u.nombre}</p>
            <p><strong>Edad:</strong> ${u.edad}</p>
            <p><strong>Ciudad:</strong> ${u.ciudad}</p>
            <p><strong>Registrado:</strong> ${u.fechaRegistro}</p>
            <hr>
        </div>`;
    });

    resultado.innerHTML = html;
}

// almacenar varios usuarios del local storage y un boton que diga ver local storage y muestre todos los usuarios guardados en el local storage si agregar uno nuevo