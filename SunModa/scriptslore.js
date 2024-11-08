const registeredUsers = [
    { username: "admin", password: "admin123", role: "Administrador" },
    { username: "user", password: "user123", role: "Usuario" }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (validateUsername(username) && validatePassword(password)) {
            authenticateUser(username, password);
        } else {
            showMessage('Por favor, introduce un nombre de usuario y contraseña válidos.', 'loginMessage');
        }
    });

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (validateUsername(username) && validatePassword(password)) {
            registerUser(username, password);
        } else {
            showMessage('Por favor, completa todos los campos correctamente.', 'registrationMessage');
        }
    });

    function validateUsername(username) {
        return username.trim() !== '';
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function showMessage(message, elementId, isSuccess = false) {
        const messageContainer = document.getElementById(elementId);
        messageContainer.textContent = message;
        messageContainer.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
    }

    function authenticateUser(username, password) {
        const selectedRole = document.getElementById('loginRole').value;
        const user = registeredUsers.find(
            user => user.username === username && user.password === password && user.role === selectedRole
        );
    
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            showMessage('Inicio de sesión exitoso.', 'loginMessage', true);
            
            setTimeout(() => {
                if (user.role === "Administrador") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "index.html";
                }
            }, 1000);
        } else {
            showMessage('Credenciales o rol incorrectos. Inténtalo de nuevo.', 'loginMessage');
        }
    }
    
    function registerUser(username, password) {
        const role = document.getElementById('role').value;
    
        const existingUser = registeredUsers.find(user => user.username === username);
    
        if (existingUser) {
            showMessage('El nombre de usuario ya está en uso. Intenta con otro.', 'registrationMessage');
        } else {
            registeredUsers.push({ username, password, role });
            showMessage('Registro exitoso. Ahora puedes iniciar sesión.', 'registrationMessage', true);
        }
    }

    function redirectToRolePage(role) {
        if (role === "Administrador") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    }
});