const formCalculadora = document.getElementById('formCalculadora');
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const resultado = document.getElementById('resultado');
const operacion = document.getElementById('operacion');

formCalculadora.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const numero1 = Number(num1.value.trim());
    const numero2 = Number(num2.value.trim());

    const operacionSelect = operacion.value.trim();

    try{

    const mensaje = await operaciones(numero1, numero2, operacionSelect)

    resultado.className = ('resultado');
    resultado.textContent = `resultado ${mensaje}`;

    } catch (error) {
        resultado.className = ('error');
        resultado.textContent = error;
    }
    

})


function operaciones(numero1, numero2, operacionSelect){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (operacionSelect == 'sumar') {

                let resultadoOperacion = numero1 + numero2;
                resolve(`El resultado de la suma es: ${resultadoOperacion}`);
            } else if (operacionSelect == "restar"){

                let resultadoOperacion = numero1 - numero2;
                resolve(`El resultado de la suma es: ${resultadoOperacion}`);
            } else if (operacionSelect == "multiplicar"){

                let resultadoOperacion = numero1 * numero2;
                resolve(`El resultado de la suma es: ${resultadoOperacion}`);
            } else if (operacionSelect == "dividir"){

                let resultadoOperacion = numero1 / numero2;
                resolve(`El resultado de la suma es: ${resultadoOperacion}`);
            } else{
                reject('Operacion no valida');
            }
        },1500);
    });

}