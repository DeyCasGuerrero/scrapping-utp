function verificarAutenticacion() {
    const isLoggedIn = localStorage.getItem('usuario');
    if (!isLoggedIn) {

        window.location.href = 'http://127.0.0.1:5500/src/app/login.html';
    }
}

document.addEventListener('DOMContentLoaded', verificarAutenticacion);
