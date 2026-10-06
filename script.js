//=======================================================
//ELEMENTOS DA PAGINA
//=========================================================
const modal = document.querySelector('.modal');
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');
const botaoFechar = document.querySelector('.fechar');

const emailNewsletter = document.getElementById('email-newsletter');
const btnNewsletter = document.getElementById('btn-newsletter');

btnNewsletter.addEventListener('click', function() {
    const email = emailNewsletter.value.trim();

    if (email === '') {
        alert('Digite seu e-mail.');
        return;
    }

    if (!email.includes('@')) {
        alert('Digite um e-mail válido.');
        return;
    };

    if (!email.includes('.')) {
        alert('Digite um e-mail válido.');
        return;
    }

    if (email.startsWith('@') || email.endsWith('@') || email.startsWith('.') || email.endsWith('.')) {
       alert('Digite um e-mail válido.');
        return;
    }

    if (email.indexOf('@') !== email.lastIndexOf('@')) {
        alert('Digite um e-mail válido.');
        return;
    }

    if (email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1) {
        alert('Digite um e-mail válido.')
        return;
    }
    
    if (email.indexOf('.') === email.indexOf('@') + 1) {
        alert('Digite um e-mail válido');
        return;
    }

    if (email.indexOf('.') === email.indexOf('@') - 1) {
        alert('Digite um e-mail válido.');
        return;
    }

    if (email.includes('..')) {
        alert('Digite um e-mail válido.');
        return;
    }

    if (email.indexOf('@') < 1) {
        alert('Digite um e-mail válido.');
        return;
    }

    let inscritos = JSON.parse(localStorage.getItem('inscritosNewsletter')) || [];

    if (inscritos.includes(email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    inscritos.push(email);

    localStorage.setItem('inscritosNewsletter', JSON.stringify(inscritos));
    alert('E-mail cadastrado com sucesso!');

});




const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.querySelector('.total');

const botoesComprar = document.querySelectorAll('.btn-comprar');


const pesquisa = document.getElementById('pesquisa');

const produtos = document.querySelectorAll('.produto');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroTamanho = document.getElementById('filtro-tamanho');
const filtroPreco = document.getElementById('filtro-preco');
const botaoFiltrar = document.querySelector('.btn-filtrar');
const mensagemProdutos = document.getElementById('mensagem-produtos');

botaoFiltrar.addEventListener('click', function() {
    
    const categoriaEscolhida = filtroCategoria.value;
    const tamanhoEscolhido = filtroTamanho.value;
    const tamanhoEscolhidoTexto = tamanhoEscolhido.toLowerCase();  
    const precoEscolhido = filtroPreco.value;

    let filtroPrecoAtivo;

    if (precoEscolhido === ''){
        filtroPrecoAtivo = false;
    } else {
        filtroPrecoAtivo = true;
    }

    console.log('Filtro de preço ativo:', filtroPrecoAtivo);

     
    console.log('Categori:', categoriaEscolhida);
    console.log('Tamanho:', tamanhoEscolhido);
    console.log('Tamanho escolhido em texto:', tamanhoEscolhidoTexto);
    console.log('Preço:', precoEscolhido);


    let quantidadeEncontrada = 0;

    produtos.forEach(function(produto) {
        console.log('Analizando produto:', produto.querySelector('h2').textContent);

        const categoriaProduto = produto.dataset.categoria;

        console.log('Categoria do produto:', categoriaProduto);

        const categoriaEncontrada = categoriaEscolhida === '' || categoriaProduto === categoriaEscolhida; 

        console.log('Categoria encontrada:', categoriaEncontrada);
        

        const informacaoTamanho = produto.querySelector('p:last-of-type').textContent;

        console.log('Informação do tamanho:', informacaoTamanho);

        const textoTamanho = informacaoTamanho.toLowerCase();

        console.log('Texto do tamanho:', textoTamanho);

        const tamanhoEncontrado = tamanhoEscolhidoTexto === '' || textoTamanho.includes(tamanhoEscolhidoTexto);

        console.log('Tamanho encontrado:', tamanhoEncontrado);

        const precoProduto = produto.querySelector('.preco').textContent;

        const valorProduto = Number(precoProduto.replace('R$', '').replace(',', '.'));

        const precoEncontrado = precoEscolhido === ''
        ? true
        : precoEscolhido === '100+'
            ? valorProduto > 100
            : valorProduto <= Number(precoEscolhido);


        console.log('preço escolhido:', precoEscolhido);

        console.log('Preco encontrado:', precoEncontrado);

        console.log('Valor do produto:', valorProduto);

        console.log('Preco do produto:', precoProduto);

        

        let produtoEncontrado;

        if (filtroPrecoAtivo) {
            produtoEncontrado = categoriaEncontrada && tamanhoEncontrado && precoEncontrado;
        } else {
            produtoEncontrado = categoriaEncontrada && tamanhoEncontrado;
        }

        console.log('Produto encontrado:', produtoEncontrado);

        if (!produtoEncontrado) {
            produto.style.display = 'none';
        } else {
            produto.style.display = '';

            quantidadeEncontrada++;
        }
       
    });

    if (quantidadeEncontrada === 0) {
        mensagemProdutos.style.display = 'block';
    } else {
        mensagemProdutos.style.display = 'none';
    }

});



function filtrarPorCategoria(categoria) {
    produtos.forEach(function(produto) {
        const categoriaProduto = produto.dataset.categoria;

        console.log('Produto:', produto);
        console.log('Categoria do produto:', categoriaProduto);
        console.log('Categoria escolhida:', categoria);

        if (categoriaProduto === categoria) {
            produto.style.display = '';
        } else {
            produto.style.display = 'none';
        }
    });
};


function mostrarTodosProdutos() {

    produtos.forEach(function(produto) {
        produto.style.display = '';
    });
}

const categorias = document.querySelectorAll('.categoria');

categorias.forEach(function(categoria) {

    categoria.addEventListener('click', function() {
        
        const nomeCategoria = categoria.dataset.categoria;

        console.log('Categoria clicada:', nomeCategoria);

        filtrarPorCategoria(nomeCategoria);

        const secaoProdutos = document.getElementById('produtos');

        secaoProdutos.scrollIntoView({
            behavior: 'smooth'
        });
      
    });

});





const menuMasculino = document.getElementById('menu-masculino');

console.log(menuMasculino);

menuMasculino.addEventListener('click', function(event) {

 console.log('Clique no Masculino');

    event.preventDefault();
    filtrarPorCategoria('Masculino');
});

const menuFeminino = document.getElementById('menu-feminino');

console.log(menuFeminino);

menuFeminino.addEventListener('click', function(event) {
    console.log('Clique no Feminino');

    event.preventDefault();

    filtrarPorCategoria('Feminino');
});

const menuInicio = document.getElementById('menu-inicio');

console.log(menuInicio);

menuInicio.addEventListener('click', function(event) {

    console.log('Clique no inicio');

    event.preventDefault();

    mostrarTodosProdutos();
    
});


const menuInfantil = document.getElementById('menu-infantil');

console.log(menuInfantil);

menuInfantil.addEventListener('click', function(event) {

    console.log('Clique no Infantil');

    event.preventDefault();

    filtrarPorCategoria('Infantil');
});


const menuPromocoes = document.getElementById('menu-promocoes');

console.log(menuPromocoes);

menuPromocoes.addEventListener('click', function(event) {

    console.log('Clique em Promoçôes');

    event.preventDefault();

    produtos.forEach(function(produto) {

        const promocao = produto.querySelector('.badge');

        if (promocao) {
            produto.style.display = '';
        } else {
            produto.style.display = 'none';
        }
    });

});


const menuContato = document.getElementById('menu-contato');

console.log(menuContato);

menuContato.addEventListener('click', function(event) {

    console.log('Clique em Contato');

    event.preventDefault();

    const contato = document.getElementById('contato');

    contato.scrollIntoView({
        behavior: 'smooth'
    });

});



const slides = document.querySelectorAll('.slide');
const contador = document.getElementById('contador-carrinho');

//======================================================================================
//VARIÁVEIS
//======================================================================================
let carrinho = [];
let total = 0;
let index = 0;

//=======================================================================================
//PESQUISA DE produtos
//=======================================================================================
 //  Código de pesquisa
 

pesquisa.addEventListener('keyup', function(){

    const termoPesquisa = pesquisa.value.toLowerCase();   

    produtos.forEach(function(produto){

        const nomeProduto = produto.querySelector('h2').textContent.toLowerCase();


        console.log(nomeProduto, termoPesquisa);      

        if (nomeProduto.includes(termoPesquisa)) {

            console.log("Mostrar:", nomeProduto);

            produto.style.display = '';
        }else {
            produto.style.display = 'none';
        }        

    });

});

//==============================================================================================
//BOTÕES COMPRAR
//==============================================================================================

botoesComprar.forEach(function(botaoComprar){

    botaoComprar.addEventListener('click', function(event) {

       
        event.preventDefault();     

        if (!verificarLogin()) {
            alert('Você precisa estar logado para adicionar produtos ao carrinho');
            window.location.href = 'login.html';
            return;
        }

        
     

        const produto = botaoComprar.closest('.produto');        
      
        const nome = produto.querySelector('h2').textContent;
       
        const preco = produto.querySelector('.preco').textContent;
        

        const imagem = produto.querySelector('img').src;
      

        const valor = Number(preco.replace('R$', '').replace(',', '.'));
       

        const produtoExistente = carrinho.find(function(item) {
            return item.nome === nome;
        });

              
        if (produtoExistente) {
            produtoExistente.quantidade++;

        } else {
            carrinho.push({
                nome: nome,
                preco: valor,
                quantidade: 1,
                imagem: imagem
            });
        };

      salvarCarrinho();

      atualizarCarrinho();

      console.log('produto adicionado:', nome);
      console.log('Carrinho:', carrinho);

      alert('Produto adicionado ao carrinho');

    });

});

       

//=============================================================================================
//MODAL DOS PRODUTOS
//================================================================================================

const botaoComprarModal = document.querySelector('.btn-comprar-modal');

let produtoSelecionadoModal = null;

botaoComprarModal.addEventListener('click', function() {
    if (!produtoSelecionadoModal) {
        return;        
    }

    if (!verificarLogin()) {
        alert('Você precisa esta logado para adiciona produtos ao carrinho');
        window.location.href = 'login.html';

    }      

const nome = produtoSelecionadoModal.querySelector('h2').textContent;
const preco = produtoSelecionadoModal.querySelector('.preco').textContent;
const imagem = produtoSelecionadoModal.querySelector('img').src;
const valor = Number(preco.replace('R$', '').replace(',', '.'));
const produtoExistente = carrinho.find(function(item) {
    return item.nome === nome;    
});

if (produtoExistente) {
    produtoExistente.quantidade++;
} else {
    carrinho.push({
        nome: nome,
        preco: valor,
        quantidade: 1,
        imagem: imagem
    });
}
salvarCarrinho();
atualizarCarrinho();
modal.style.display = 'none';

alert('Produto adicionado ao carrinho');

});






botoesDetalhes.forEach(function(botao) {

    botao.addEventListener('click', function() {        
        
        const produto = botao.closest('.produto');
        produtoSelecionadoModal = produto;
        const nome = produto.querySelector('h2').textContent;
        const imagem = produto.querySelector('img').src;
        const preco = produto.querySelector('.preco').textContent;
        const descricao = produto.querySelector('p:last-of-type').textContent;             

        modal.querySelector('.modal-nome').textContent = nome;
        modal.querySelector('.modal-img').src = imagem;
        modal.querySelector('.modal-preco').textContent = preco;
        modal.querySelector('.modal-descricao').textContent = descricao;

        modal.style.display = 'flex';        

    });
});

botaoFechar.addEventListener('click', function() {
    modal.style.display = 'none';
});

modal.addEventListener('click', function(event){
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});


//==================================================================================================
//BANNER AUTOMÁTICO
//===================================================================================================

function trocarBanner() {
    slides[index].classList.remove('ativo');    

    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add('ativo');    
}
setInterval(trocarBanner, 3000);

//==========================================================================================
//FUNÇÕES DO CARRINHO
//=======================================================================================

function atualizarCarrinho() {

      console.log("Entrou em atualizarCarrinho"); 

        total = 0;

        listaCarrinho.innerHTML = '';   

        carrinho.forEach(function(produto){

            total += produto.preco * produto.quantidade;

            console.log("Criando item");

            const itemCarrinho = document.createElement('li');

        itemCarrinho.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2).replace('.', ',')}

            <button class="btn-menos">-</button>

            <strong class="quantidade">x${produto.quantidade}</strong>

            <button class="btn-mais">+</button>        
        `;

        const botaoMais = itemCarrinho.querySelector('.btn-mais');
        const botaoMenos = itemCarrinho.querySelector('.btn-menos');

        botaoMais.addEventListener('click', function() {

            produto.quantidade++;

            salvarCarrinho();
            atualizarCarrinho();
        });

        botaoMenos.addEventListener('click', function() {
            if (produto.quantidade > 1) {
                produto.quantidade--;
            }else {
                const indice = carrinho.indexOf(produto);

                carrinho.splice(indice, 1);
            }
            salvarCarrinho();
            atualizarCarrinho();
        });

        
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('btn-remover');

        
        itemCarrinho.appendChild(botaoRemover);

        botaoRemover.addEventListener('click', function(){
            const indice = carrinho.indexOf(produto);            

            carrinho.splice(indice, 1);

            atualizarCarrinho();

            salvarCarrinho();
            
            totalCarrinho.textContent = ' R$ ' + total.toFixed(2).replace('.', ',');
        });
    
        listaCarrinho.appendChild(itemCarrinho);
        });
        totalCarrinho.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');

        atualizarContadorCarrinho();
};

function obterChaveCarrinho() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        return 'carrinho';
    }
    return 'carrinho_' + usuarioLogado.email;
}


function salvarCarrinho() {
    const ChaveCarrinho = obterChaveCarrinho();

    localStorage.setItem(ChaveCarrinho, JSON.stringify(carrinho));
};


function carregarCarrinho() {
    const ChaveCarrinho = obterChaveCarrinho();

    const carrinhoSalvo = localStorage.getItem(ChaveCarrinho);

        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
        } else {
            carrinho = [];
        }
        atualizarCarrinho();
};


function atualizarContadorCarrinho() {

    
    let quantidadeTotal = 0;

    carrinho.forEach(function(produto){
        quantidadeTotal += produto.quantidade;
    });

    contador.textContent = quantidadeTotal;
};

carregarCarrinho();


const usuarioArea = document.getElementById('usuario-area');

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (usuarioLogado) {
    usuarioArea.innerHTML = `
    <span>Olá, ${usuarioLogado.nome}!</span>
    <button id="btn-sair">Sair</button>

    `;

    const btnSair = document.getElementById('btn-sair');

    btnSair.addEventListener('click', function(){
        localStorage.removeItem('usuarioLogado');
        window.location.reload();
    });
}
   

function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        return false;
    }

    return true;
};

if (verificarLogin()) {
    console.log('Usuário esta logado.');
}else {
    console.log('Nenhum usuário esta logado.')
}
//-----------------------------------------------
//Campo opinia Cliente//
//---------------------------------------------
const nomeDepoimento = document.getElementById('nome-depoimento');
const opiniaoDepoimento = document.getElementById('opiniao-depoimento');
const btnEnviarDepoimento = document.getElementById('btn-enviar-depoimento');

const caixaDepoimentos = document.querySelector('.depoimentos-box');

let depoimentos = [];

const depoimentosSalvos = localStorage.getItem('depoimentos')

if (depoimentosSalvos) {
        depoimentos = JSON.parse(depoimentosSalvos);

        depoimentos.forEach(function(depoimento) {
            const novoDepoimento = document.createElement('div');
            novoDepoimento.classList.add('depoimento-item');

            const estrelas = document.createElement('div');
            estrelas.classList.add('estrelas');
            estrelas.textContent = '★★★★★';

            const textoOpiniao = document.createElement('p'); 
            textoOpiniao.textContent = depoimento.opiniao;

            const nomeCliente = document.createElement('h4');
            nomeCliente.textContent = '- ' + depoimento.nome;

            novoDepoimento.appendChild(estrelas);
            novoDepoimento.appendChild(textoOpiniao);
            novoDepoimento.appendChild(nomeCliente);

            caixaDepoimentos.appendChild(novoDepoimento);
            
        });
}  



btnEnviarDepoimento.addEventListener('click', function() {
    if (nomeDepoimento.value.trim() === '') {
        alert('Digite seu nome.');
        return;
    }

    if (opiniaoDepoimento.value.trim() === '') {
        alert('Digite sua opinião.');
        return;
    }

    const nome = nomeDepoimento.value.trim();
    const opiniao = opiniaoDepoimento.value.trim();

    depoimentos.push({
        nome: nome,
        opiniao: opiniao
    });
    
    localStorage.setItem('depoimentos', JSON.stringify(depoimentos));

    console.log(nome);
    console.log(opiniao);

    const novoDepoimento = document.createElement('div');
    novoDepoimento.classList.add('depoimento-item');

    const estrelas = document.createElement('div');
    estrelas.classList.add('estrelas');
    estrelas.textContent = '★★★★★';

    const textoOpiniao = document.createElement('p');
    textoOpiniao.textContent = opiniao;

    const nomeCliente = document.createElement('h4');
    nomeCliente.textContent = '- ' + nome;

    novoDepoimento.appendChild(estrelas);    
    novoDepoimento.appendChild(textoOpiniao);
    novoDepoimento.appendChild(nomeCliente);
    caixaDepoimentos.appendChild(novoDepoimento);

    nomeDepoimento.value = '';
    opiniaoDepoimento.value = '';
    
});


const botoesDestaque = document.querySelectorAll('.btn-destaque');
botoesDestaque.forEach(function(botao) {
    botao.addEventListener('click', function() {
        const idProduto = botao.dataset.id;

        const produto = document.querySelector(`.produto[data-id="${idProduto}"]`);
        produto.querySelector('.btn-detalhes').click();
    });

});




const entregaGarantida = document.getElementById('entrega-garantida');
entregaGarantida.addEventListener('click', function() {
    const infoEntrega = entregaGarantida.querySelector('.info-entrega');
    
    if (infoEntrega.style.display === 'none') {
        infoEntrega.style.display = 'block';
    } else {
        infoEntrega.style.display = 'none';
    }
});


const trocaFacil = document.getElementById('troca-facil');
trocaFacil.addEventListener('click', function() {
    const infoTroca = trocaFacil.querySelector('.info-troca');

    if (infoTroca.style.display === 'none') {
        infoTroca.style.display = 'block';
    } else {
        infoTroca.style.display = 'none';
    }
});

const suporte = document.getElementById('suporte');
suporte.addEventListener('click', function() {
    const infoSuporte = suporte.querySelector('.info-suporte');

    if (infoSuporte.style.display === 'none') {
        infoSuporte.style.display = 'block';
    } else {
        infoSuporte.style.display = 'none';
    }
});

const compraSegura = document.querySelector('#compra-segura');
compraSegura.addEventListener('click', function() {
    const infoSeguranca = compraSegura.querySelector('.info-seguranca');
    infoSeguranca.classList.toggle('ativo');
});








const pagamentoCartao = document.getElementById('pagamento-cartao');
const infoCartao = document.getElementById('info-cartao');

pagamentoCartao.addEventListener('click', function() {
    alert('pagamento com cartão de credito selecionado');

    infoCartao.textContent = 'Aceitamos cartões de crédito.';
    if (infoCartao.style.display === 'none') {
        infoCartao.style.display = 'block';
    } else {
        infoCartao.style.display = 'none';
    }
});

const pagamentoPix = document.getElementById('pagamento-pix');
const infoPix = document.getElementById('info-pix');

pagamentoPix.addEventListener('click', function() {
    alert('Pagamento com Pix selecionado');

    infoPix.textContent = 'Aceitamos pagamentos via pix.';

    if (infoPix.style.display === 'none') {
        infoPix.style.display = 'block';
    } else {
        infoPix.style.display = 'none';
    }
});

const pagamentoBoleto = document.getElementById('pagamento-boleto');
const infoBoleto = document.getElementById('info-boleto');

pagamentoBoleto.addEventListener('click', function() {
    alert('Pagamento com Boleto bancário selecionado');

    infoBoleto.textContent = 'Você pode pagar se pedido usando boleto bancário.';
    
    if (infoBoleto.style.display === 'none') {
        infoBoleto.style.display = 'block';
    } else {
        infoBoleto.style.display = 'none';
    }
});










const entregaBrasil = document.getElementById('entrega-brasil');
const infoEntregaBrasil = document.getElementById('info-entrega-brasil');
entregaBrasil.addEventListener('click', function() {    
     infoEntregaBrasil.textContent = 'Enviamos nossos produtos para todo o entregaBrasil.';
     infoEntregaBrasil.style.display = infoEntregaBrasil.style.display === 'none' ? 'block' : 'none';
});


const entregaGratis = document.getElementById('entrega-gratis');
const infoEntregaGratis = document.getElementById('info-entrega-gratis');
entregaGratis.addEventListener('click', function() {    
    infoEntregaGratis.textContent = 'Você ganha frete grátis acima de R$150.'; 
    infoEntregaGratis.style.display = infoEntregaGratis.style.display === 'none' ? 'block' : 'none'; 
});

const prazoEntrega = document.getElementById('prazo-entrega');
const infoPrazoEntrega = document.getElementById('info-prazo-entrega');
prazoEntrega.addEventListener('click', function() {
    // alert('Prazo de entrega de 3 a 10 dia!');
    infoPrazoEntrega.textContent = 'O prazo de Entrega de 3 a 10 dias úteis.';
    infoPrazoEntrega.style.display = infoPrazoEntrega.style.display === 'none' ? 'block' : 'none';
});









