const usuarioLogado = localStorage.getItem('usuarioLogado');

if (usuarioLogado) {
    window.location.href = 'index.html';
};

const formulario = document.querySelector('form');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const mensagemLogin = document.getElementById('mensagem-login');


formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    mensagemLogin.textContent = '';
    mensagemLogin.classList.remove('sucesso');

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


    const dadosUsuario = localStorage.getItem('usuario');

    if (!dadosUsuario) {
        mensagemLogin.textContent = 'Nenhuma conta cadastrada.';
        return;
    }

    const usuario = JSON.parse(dadosUsuario);


     if (valorEmail === usuario.email && valorSenha === usuario.senha) {

        const usuarioLogado = {
            nome: usuario.nome,
            email: usuario.email
        };

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        mensagemLogin.classList.add('sucesso');
        mensagemLogin.textContent = 'Login realizado com sucesso!';

        setTimeout(function() {
            window.location.href = 'index.html';

        }, 1500);
        return;
    }
    
    mensagemLogin.textContent = 'E-mail ou senha incorretos.';
});

