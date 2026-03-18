const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const ciudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    const usuario= {
        nombre: nombre.value,
        edad: edad.value,
        ciudad: ciudad.value,
        fechaRegistro: new Date().toLocaleString(),
        saludar: function(){
            return `Hola, soy ${this.nombre}, de ${this.ciudad} y tengo ${this.edad} años.`
        }
    };
    
    const usuarioJSON = JSON.stringify(usuario);

    localStorage.setItem("usuario", usuarioJSON);

    const datosGuardados = JSON.parse(localStorage.getItem("usuario"));

    const {nombre:name, ciudad:city, edad:age, } = datosGuardados;   

    const usuarioActalizado = {
        ...datosGuardados,
        edad: age+1,
        actualizado: true
    };

    resultado.innerHTML = `
    <h2> Información del Usuario </h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Edad:</strong> ${age}</p>
    <p><strong>Ciudad:</strong> ${city}</p>
    <p><strong>JSON:</strong> ${usuarioJSON}</p>
    <p><strong>Usuario Spread:</strong>${JSON.stringify(usuarioActalizado)}</p>`

})  

// almacenar varios usuarios del local storage y un boton que diga ver local storage y muestre todos los usuarios guardados en el local storage si agregar uno nuevo