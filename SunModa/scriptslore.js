// Simular usuarios registrados (sin base de datos)
const registeredUsers = [];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');

    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Validar inputs
        if (validateUsername(username) && validatePassword(password)) {
            authenticateUser(username, password);
        } else {
            showMessage('Por favor, introduce un nombre de usuario y contraseña válidos.', 'loginMessage');
        }
    });

    // Manejar el envío del formulario de registro
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar inputs
        if (validateUsername(username) && validatePassword(password)) {
            registerUser(username, password);
        } else {
            showMessage('Por favor, completa todos los campos correctamente.', 'registrationMessage');
        }
    });

    // Funciones de validación
    function validateUsername(username) {
        return username.trim() !== ''; // Comprobar que no esté vacío
    }

    function validatePassword(password) {
        return password.length >= 6; // Por ejemplo, longitud mínima de 6 caracteres
    }

    // Función para mostrar mensajes
    function showMessage(message, elementId, isSuccess = false) {
        const messageContainer = document.getElementById(elementId);
        messageContainer.textContent = message;
        messageContainer.className = isSuccess ? 'alert alert-success' : 'alert alert-danger'; // Estilo según el tipo de mensaje
    }

    // Funciones de autenticación y registro
    function authenticateUser(username, password) {
        const user = registeredUsers.find(user => user.username === username && user.password === password);
        
        if (user) {
            showMessage('Inicio de sesión exitoso.', 'loginMessage', true);
            // Aquí puedes redirigir o realizar otras acciones según el tipo de usuario
        } else {
            showMessage('Credenciales incorrectas. Inténtalo de nuevo.', 'loginMessage');
        }
    }

    function registerUser(username, password) {
        // Verificar si el usuario ya está registrado
        const existingUser = registeredUsers.find(user => user.username === username);

        if (existingUser) {
            showMessage('El nombre de usuario ya está en uso. Intenta con otro.', 'registrationMessage');
        } else {
            // Agregar el nuevo usuario a la lista
            registeredUsers.push({ username, password });
            showMessage('Registro exitoso. Ahora puedes iniciar sesión.', 'registrationMessage', true);
        }
    }
});
