const listaCheckout = document.getElementById('lista-checkout');
const totalCheckout = document.getElementById('total-checkout');
const btnFinalizar = document.getElementById('btn-finalizar');
console.log(btnFinalizar);

let carrinho = [];

function atualizarCheckout(){

    listaCheckout.innerHTML = '';
    let total = 0;

    carrinho.forEach(function(produto){

        total += produto.preco * produto.quantidade;

        const item = document.createElement('div');

        item.classList.add('item-checkout');

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="info-checkout">
                <h3>${produto.nome}</h3>
                <p>Quantidade: ${produto.quantidade}</p>
            </div>

            <span>
                R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}
            </span>    
        `;
        listaCheckout.appendChild(item);
    });

    totalCheckout.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
};

const carrinhoSalvo = localStorage.getItem('carrinho');

    if(carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    };
    atualizarCheckout();

    btnFinalizar.addEventListener('click', function() {
        alert('Pedido realizado com sucesso!');
    });