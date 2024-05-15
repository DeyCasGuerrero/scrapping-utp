function registerApiRes() {
    document.getElementById('registerButton').addEventListener('click', async () => {
        const username = document.getElementById('usernameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        const confirmPassword = document.getElementById('confirmPasswordInput').value;

        if (!username || !email || !password || !confirmPassword) {
            alert('Por favor complete todos los campos y acepte los términos de uso.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return null;
        }

        const usuario = {
            nombre: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuario/guardar/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario.');
            }

            const nuevoUsuario = await response.json();
            console.log('Nuevo usuario registrado:', nuevoUsuario);
            alert('Usuario registrado exitosamente.');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario.');
        }
    });
}



registerApiRes();
