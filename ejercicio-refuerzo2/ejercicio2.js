const formPalindromo = document.getElementById('formPalindromo');
const texto=document.getElementById('texto');
const resultado=document.getElementById('resultado');

formPalindromo.addEventListener('submit', async(e) =>{
    e.preventDefault();


    const textoIngresado = texto.value.trim().toLowerCase();
    const palabrareversa = textoIngresado.toLowerCase().split('').reverse().join('');
    
    try{
        const mensaje = await comaprar(textoIngresado, palabrareversa);

        resultado.className = ('resultado');
        resultado.textContent = mensaje;
    }catch (error) {
        resultado.className = ('error');
        resultado.textContent = (`${error}`);
    }

});

function comaprar(textoIngresado, palabrareversa){
    return new Promise((resolve, reject) => {
       if (textoIngresado === palabrareversa) {
        resolve('Es un palíndromo');
       } else {
        reject('No es un palíndromo');
       } 

    });

}