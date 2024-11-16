document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const recoverForm = document.getElementById('recoverForm');

    const saveUsersToStorage = () => {
        localStorage.setItem('users', JSON.stringify(registeredUsers));
    };

    const loadUsersFromStorage = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };

    let registeredUsers = loadUsersFromStorage();

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    if (recoverForm) {
        recoverForm.addEventListener('submit', handleRecovery);
    }

    function showMessage(message, elementId, isSuccess = false) {
        const messageContainer = document.getElementById(elementId);
        messageContainer.textContent = message;
        messageContainer.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
    }

    function handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value.trim();
        const selectedRole = document.getElementById('loginRole').value;

        const user = registeredUsers.find(user =>
            user.username.toLowerCase() === username &&
            user.password === password &&
            user.role === selectedRole
        );

        if (user) {
            showMessage('Inicio de sesión exitoso.', 'loginMessage', true);
            setTimeout(() => {
                window.location.href = user.role === "Administrador" ? "admin.html" : "index.html";
            }, 1000);
        } else {
            showMessage('Credenciales incorrectas.', 'loginMessage');
        }
    }

    function handleRegistration(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        const existingUser = registeredUsers.find(user =>
            user.username.toLowerCase() === username.toLowerCase() ||
            user.email === email
        );

        if (existingUser) {
            showMessage('El usuario o correo ya están registrados.', 'registrationMessage');
        } else {
            registeredUsers.push({ username, email, password, role });
            saveUsersToStorage();
            showMessage('Registro exitoso.', 'registrationMessage', true);
        }
    }

    function handleRecovery(e) {
        e.preventDefault();

        const username = document.getElementById('recoverUsername').value.trim().toLowerCase();
        const email = document.getElementById('recoverEmail').value.trim().toLowerCase();
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (newPassword !== confirmPassword) {
            showMessage('Las contraseñas no coinciden.', 'recoverMessage');
            return;
        }

        const user = registeredUsers.find(user =>
            user.username.toLowerCase() === username &&
            user.email === email
        );

        if (user) {
            user.password = newPassword;
            saveUsersToStorage();
            showMessage('Contraseña actualizada con éxito.', 'recoverMessage', true);
        } else {
            showMessage('Usuario o correo incorrectos.', 'recoverMessage');
        }
    }
});