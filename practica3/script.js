function tareaNoBloqueante(callback) {
    console.log("Iniciando tarea ");
    setTimeout(function() {
        console.log("Tarea completada");
        callback();
    }, 2000);
}

console.log("inicio del programa");
tareaNoBloqueante(() => console.log("continunado despues de la tereas."))
console.log("fin del programa");