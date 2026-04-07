// Mostrar el nombre del usuario activo
const usuarioActivo = localStorage.getItem('usuarioActivo');

if (usuarioActivo) {
  document.getElementById('nombreUsuario').textContent = `Hola, ${usuarioActivo} 👋`;
}

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  window.location.href = 'index.html';
}