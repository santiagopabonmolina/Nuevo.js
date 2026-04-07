const registerForm = document.getElementById('registerForm');
const estado = document.getElementById('estado');
const resultado = document.getElementById('resultado');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  resultado.textContent = "";
  resultado.className = "";
  estado.textContent = "";

  const usuario = document.getElementById('regUsuario').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  // Validar que no estén vacíos
  if (!usuario || !password) {
    resultado.className = 'error';
    resultado.textContent = '❌ Todos los campos son obligatorios.';
    return;
  }

  // Validar longitud del usuario
  if (usuario.length < 4) {
    resultado.className = 'error';
    resultado.textContent = '❌ El usuario debe tener más de 3 caracteres.';
    return;
  }

  // Validar que la contraseña sea segura
  const segura =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password);

  if (!segura) {
    resultado.className = 'error';
    resultado.textContent = '❌ La contraseña debe tener al menos una mayúscula, un número y un carácter especial (!@#$%^&*).';
    return;
  }

  // Verificar si el usuario ya existe en localStorage
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const yaExiste = usuariosGuardados.find(u => u.usuario === usuario);

  if (yaExiste) {
    resultado.className = 'error';
    resultado.textContent = '❌ Ese nombre de usuario ya está registrado.';
    return;
  }

  // Guardar el nuevo usuario
  usuariosGuardados.push({ usuario, password });
  localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

  resultado.className = 'success';
  resultado.textContent = '✅ Usuario registrado exitosamente.';
  estado.textContent = 'Redirigiendo al login...';

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
});