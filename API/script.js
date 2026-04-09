const API_URL = "http://172.16.102.14:8080/api/usuarios";

const  form = document.getElementById("usuario-form");
const tbody = document.getElementById("usuarios-tbody");
const fotoInput = document.getElementById("foto");

let fotoBase64 = "";

fotoInput.addEventListener("change", function(){
    const reader = new FileReader(); //Objeto para leer archivos

    reader.onload = function(){
        fotoBase64 = reader.result.split(",")[1]; // almacena la imagen en base64 sin el prefijo data:image/png;base64,para solo capturar la parte 1 
    };

    if(this.files[0]) reader.readAsDataURL(this.files[0]); 

});

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const usuario = {
        name: form.name.value,
        email: form.email.value,
        edad: form.edad.value,
        ciudad: form.ciudad.value,
        biografia: form.biografia.value,
        fotoBase64: fotoBase64  // se agrega la foto en base64 al objeto usuario para enviarlo al servidor
    };

    const id = document.getElementById("usuario-id").value;

    const method = id ? "PUT" : "POST"; // put para modificar y post para crear

    const url = id ? `${API_URL}/${id}`: API_URL; // si hay id se modifica, sino se crea

    try {
        // peticion al servidor
        const res = await fetch(url,{
            method: method, 
            headers:{"Content-Type": "application/json"}, // indica que el cuerpo de la solicitud es JSON
            body: JSON.stringify(usuario)    // convierte el objeto usuario a una cadena JSON para enviarlo al servidor   

        });

        if(res.ok){
            form.reset(); // limpiar el formulario
            document.getElementById("usuario-id").value = ""; // limpiar el campo oculto de id

            loadUsuarios(); 
        }
    } catch (error) {
        console.error("Error al guardar",error);
        alert("Error de conexion al servidor");
    }
});

async function loadUsuarios() {
    try{
        const res = await fetch(API_URL); //
        const usuarios = await res.json();
        
        console.log(usuarios);
        renderTable(usuarios);
         
    }catch (error) {
        console.error("Error al cargar usuarios", error);
    }

}

function renderTable(usuarios){
    console.log(usuarios);
    tbody.textContent = ""; // para que no se dupliquen los usuarios al cargar la tabla

    usuarios.forEach((u) => {
        const  tr = document.createElement("tr"); // crea una fila para cada usuario  
        
        const tdUser = document.createElement("td");// crea una celda para el usuario 
        tdUser.className = "user-cell";

        const img = document.createElement("img");// crea una imagen para la foto del usuario

        img.className = "user-avatar";
        img.src = u.fotoBase64 ? `data:image/png;base64,${u.fotoBase64}` : "https://ui-avatars.com/api/?name="+ encodeURIComponent(u.name)+" &background=random"; // si el usuario tiene foto, se muestra, sino se genera un avatar con su nombre

        const infoDiv = document.createElement("div"); // crea un div para la informacion del usuario
        infoDiv.className = "user-info"; 

        const nameP = document.createElement("p"); // crea un parrafo para el nombre del usuario

        const nameStrong = document.createElement("strong"); // crea un elemento strong para resaltar el nombre del usuario

        nameStrong.textContent = u.name; // asigna el nombre del usuario al elemento strong

        const emailSpan = document.createElement("span"); // crea un span para el email del usuario
        emailSpan.textContent = u.email; // asigna el email del usuario al span

        infoDiv.append(nameStrong,emailSpan); // agrega el nombre y el email al div de informacion

        tdUser.append(img,infoDiv); // agrega la imagen y la informacion del usuario a la celda del usuario

        tr.appendChild(tdUser); // agrega la celda del usuario a la fila, por que el td es hijo del tr dentro del HTML

        
        //------------------- UBICACION Y EDAD -------------------//

        const tdLocation = document.createElement("td");// crea una celda para la ubicacion del usuario

        const cityStrong = document.createElement("strong");// crea un elemento     strong para resaltar la ciudad del usuario

        cityStrong.textContent = u.ciudad || "no definida"; // asigna la ciudad del usuario al elemento strong, si no tiene ciudad se muestra "no definida"

        const ageSpan = document.createElement("span"); // crea un span para la edad del usuario

        ageSpan.style.display = "block"; // para que la edad se muestre debajo de la ciudada

        ageSpan.style.fontSize = "0.8rem"// para que la edad se muestre en un tamaño de letra mas pequeño

        ageSpan.style.color ="var(--text-muted)";// para que la edad se muestre con un color mas claro

        ageSpan.textContent = u.edad ? `${u.edad} años `: ""; // asigna la edad del usuario al span, si no tiene edad se muestra vacio  
        
        tdLocation.append(cityStrong,ageSpan); // agrega la ciudad y la edad a la celda de ubicacion

        tr.appendChild(tdLocation); // agrega la celda de ubicacion a la fila


        //------------------- BIOGRAFIA -------------------

        const tdBio = document.createElement("td"); // crea una celda para la biografia del usuario

        const biotext = u.biografia || "sin biografia"; // si el usuario no tiene biografia se muestra "sin biografia"

        tdBio.textContent = biotext.length > 50 ? biotext.substring(0,50) + "..." : biotext; // si la biografia es mayor a 100 caracteres se muestra un resumen con puntos suspensivos

        tr.appendChild(tdBio); // agrega la celda de biografia a la fila del tr HTML
        
        
        //-----------------ACCIONES-----------------//

        const tdActions = document.createElement("td");// crea una celda para las acciones de editar y eliminar
        tdActions.className = "actions";

        const btnEdit = document.createElement("td"); // crea un boton para editar el usuario
        btnEdit.textContent = "edit";

        const btnDel = document.createElement("td"); // crea un boton para eliminar el usuario
        btnDel.textContent = "delete";

        tdActions.append(btnEdit,btnDel); // agrega los botones de editar y eliminar a la celda de acciones

        tr.appendChild(tdActions); // agrega la celda de acciones a la fila del tr HTML

        tbody.appendChild(tr); // agrega la fila completa a la tabla del tbody del HTML



    });
 

}

window.onload = loadUsuarios; // carga los usuarios al cargar la pagina


