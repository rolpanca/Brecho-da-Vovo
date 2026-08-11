const formulario = document.querySelector('form');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const valorEmail = email.value;
    const valorSenha = senha.value;

    console.log(valorEmail);
    console.log(valorSenha);

    if(valorEmail === '' || valorSenha === '') {
        alert('Preencha todos os campos.');
        return;
    }

    if (!email.checkValidity()) {
        alert('Digite um e-mail válido.');
        return;
    }

    alert('Dados preenchidos corretamente!');
});

