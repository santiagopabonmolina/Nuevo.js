const input = document.getElementById("inputNotas")
;
const salida = document.getElementById("salida");

function evaluarNota(Nota){
    if(Nota >= 70 ){
        return "Apropado"
    }else {
        return "Reprobado"
    }
}

(function(){
    window.ejecutar =function () {
        let notas = input.value.split(",").map(n => parseInt(n.trim()));

        salida.innerHTML ="";

        for(let i = 0; i < notas.length; i++ ){
            let resultado = evaluarNota(notas[i])
            let clase = resultado === "Aprobado" ? "aprobado" : "reprobado"

            salida.innerHTML += `
            <div class= "${clase}">
                ${notas[i]} --> ${resultado}</div>`
        }

        let i = 0; 
        let aprobados = 0;
        while(i<notas.length){
            if(notas[i] >= 70){
                aprobados++;
            }
            i++;
        }

        salida.innerHTML += `<div class="total"> Aprobados: ${aprobados} </div>`
    } 
})();