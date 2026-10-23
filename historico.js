const listaPedidos = document.getElementById('lista-pedidos');

const modalDetalhes = document.getElementById('modal-detalhes')
const conteudoDetalhes = document.getElementById('conteudo-detalhes');
const fecharModal = document.getElementById('fechar-modal');

fecharModal.addEventListener('click',function() {
    modalDetalhes.style.display = 'none';
});

modalDetalhes.addEventListener('click',function(evento){
    if (evento.target === modalDetalhes){
        modalDetalhes.style.display = 'none';
    }
})



const usuarioLogado = JSON.parse(
    localStorage.getItem('usuarioLogado')
);

if (!usuarioLogado) {

    listaPedidos.innerHTML = `
        <p>Nenhum usuário está logado.</p>
    `;

} else {

    const chavePedidos = 'pedidos_' + usuarioLogado.email;

    const pedidos = JSON.parse(
        localStorage.getItem(chavePedidos)
    ) || [];

    console.log(pedidos);

    if (pedidos.length === 0) {

        listaPedidos.innerHTML = `
            <p>Você ainda não possui pedidos.</p>
        `;

    } else {

        pedidos.forEach(function(pedido) {

            const item = document.createElement('div');

            item.classList.add('pedido');

            let produtosHTML = '';

            if (pedido.produtos && pedido.produtos.length > 0) {

                pedido.produtos.forEach(function(produto) {

                    const quantidade = produto.quantidade || 1;

                    const preco = Number(produto.preco || 0);

                    produtosHTML += `
                        <div class="produto-pedido">

                            ${produto.imagem ?`
                            <img 
                                src="${produto.imagem}"
                                alt="${produto.nome}"
                                style="width: 100px; height: 100px; object-fit: contain;"
                            >                            
                            ` : ''}

                            <p>
                                <strong>
                                    ${produto.nome}
                                </strong>

                                <br>

                                Quantidade: ${quantidade}

                                <br>

                                Preço:
                                R$ ${preco.toFixed(2).replace('.', ',')}

                            </p>

                        </div>
                    `;
                });

            } else {

                produtosHTML = `
                    <p>
                        Nenhum produto encontrado neste pedido.
                    </p>
                `;
            }

            let dataPedido = 'Data não informada';

            if (pedido.data) {

                const data = new Date(pedido.data);

                dataPedido = data.toLocaleString('pt-BR');
            }

            const total = Number(pedido.total || 0);

            item.innerHTML = `
                <h3>
                    Pedido #${pedido.numero}
                </h3>

                <p>

                    <strong>
                        📅 Data e hora:
                    </strong>

                    ${dataPedido}

                </p>

                <h4>
                    Produtos:
                </h4>

                <div class="produtos-pedido">

                    ${produtosHTML}

                </div>

                <p>

                    <strong>
                        💳 Pagamento:
                    </strong>

                    ${pedido.pagamento}

                </p>

                <p>

                    <strong>
                        💰 Total:
                    </strong>

                    R$ ${total.toFixed(2).replace('.', ',')}

                </p>
            `;

            const botaoDetalhes =
                document.createElement('button');

            botaoDetalhes.classList.add(
                'btn-detalhes-pedido'
            );

            botaoDetalhes.textContent =
                'Ver detalhes';

            botaoDetalhes.addEventListener(
                'click',
                function() {

                    const cliente = pedido.cliente || {};

                    let detalhes = '';

                    detalhes += `
                    <h3>Pedido #${pedido.numero}</h3>

                    <p>
                        <strong>Cliente:</strong>
                        ${cliente.nome || 'Não informado'}
                    </p>

                    <p>
                        <strong>Telefone:</strong>
                        ${cliente.telefone || 'Não informado'}
                    </p>  
                    
                    <p>
                        <strong>Pagamento:</strong>
                        ${pedido.pagamento || 'Não informado'}
                    </p>    

                    <p>
                        <strong>Total:</strong>
                        R$ ${total.toFixed(2).replace('.', ',')}
                    </p>  
                    
                    <h4>Produto:</h4>

                    `

                                      

                    if (pedido.produtos && pedido.produtos.length > 0) {

                        pedido.produtos.forEach(function(produto) {

                        const quantidade = produto.quantidade || 1;

                        const preco = Number(produto.preco || 0);

                        detalhes += `
                            <div class="produto-pedido">
                                ${produto.imagem ? `
                                    <img
                                        src="${produto.imagem}"
                                        alt="${produto.nome}" 
                                        style="width: 100px; height: 100px; object-fit: contain;"
                                    >
                                    ` : ''}

                                    <p>
                                        <strong>${produto.nome}</strong>
                                        <br>
                                        Quantidade: ${quantidade}
                                        </br>
                                        Preço: R$ ${preco.toFixed(2).replace('.', ',')}
                                    </p>    
                            </div>  
                                
                        `;                       

                    });                    
                    
                } else {
                    detalhes += '<p>Nenhum produto encontrado.</p>';
                }

                conteudoDetalhes.innerHTML = detalhes;
                console.log(conteudoDetalhes.innerHTML);
                modalDetalhes.style.display = 'flex';

            }

            );

            item.appendChild(botaoDetalhes);

            listaPedidos.appendChild(item);
        });
    }
}   
    







