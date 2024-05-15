function loginApiRes() {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuario = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuario/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas.');
            }

            const usuarioAutenticado = await response.json();
            console.log('Usuario autenticado:', usuarioAutenticado);
            
            localStorage.setItem('usuario', JSON.stringify(usuarioAutenticado));
            alert('Inicio de sesión exitoso.');
            window.location.href = '/src/app/index.html';
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: Credenciales inválidas.');
        }
    });
}
loginApiRes();