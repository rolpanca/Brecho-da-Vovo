const formulario = document.getElementById('form-cadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email')
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmar-senha');
const mensagemCadastro = document.getElementById('mensagem-cadastro');

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    mensagemCadastro.textContent = '';
    mensagemCadastro.classList.remove('sucesso');

    const valorNome = nome.value.trim();
    const valorEmail = email.value.trim();
    const valorSenha = senha.value;
    const valorConfirmarSenha = confirmarSenha.value;

    if (
        valorNome === '' ||
        valorEmail === '' || 
        valorSenha === '' || 
        valorConfirmarSenha === ''
    ) {
        mensagemCadastro.textContent = 'preencha todos os campos.';
        return;
    }

    if (!email.checkValidity()) {
        mensagemCadastro.textContent = 'Digite um e-mail válido.';
        return;
    }

    if (valorSenha.length < 6 ) {
        mensagemCadastro.textContent = 'A senha deve ter pelo menos 6 caracteres';
        return;
    }

    if (valorSenha !== valorConfirmarSenha) {
        mensagemCadastro.textContent = 'As senhas não são iguais.';
        return;
    }

    const usuario = {
        nome: valorNome,
        email: valorEmail,
        senha: valorSenha
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));


mensagemCadastro.textContent = 'Conta criada com sucesso!';

formulario.reset();

setTimeout(function() {
    
    window.location.href = 'login.html';

}, 1500);

});