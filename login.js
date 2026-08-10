const formulario = document.querySelector('form');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const valorEmail = email.value;
});

