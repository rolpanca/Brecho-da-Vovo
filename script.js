//=======================================================
//ELEMENTOS DA PAGINA
//=========================================================
const modal = document.querySelector('.modal');
const botoesDetalhes = document.querySelectorAll('.btn-detalhes');
const botaoFechar = document.querySelector('.fechar');


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


        console.log(('preço escolhido:', precoEscolhido))

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
        mensagemProdutos.style.display - 'none';
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


