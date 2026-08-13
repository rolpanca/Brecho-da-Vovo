const formulario = document.querySelector('form');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const mensagemLogin = document.getElementById('mensagem-login');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    mensagemLogin.textContent = '';
    const valorEmail = email.value;
    const valorSenha = senha.value;
   

    if(valorEmail === '' || valorSenha === '') {
        mensagemLogin.textContent = 'Preencha todos os campos.'
        return;
    }

    if (!email.checkValidity()) {
        mensagemLogin.textContent = 'Digite um e-mail válido.'
        return;
    }

    mensagemLogin.textContent = 'Dados preenchidos corretamente!';
});

