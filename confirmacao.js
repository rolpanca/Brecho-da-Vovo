const pedidoSalvo = localStorage.getItem('pedidoAtual');
const campNumero = document.getElementById('numero-pedido');
const campTotal = document.getElementById('total-pedido');
const campPagamento = document.getElementById('forma-pagamento');


if (pedidoSalvo) {
    const pedido = JSON.parse(pedidoSalvo);
    
    campNumero.textContent = '#' + pedido.numero;

    const totalFormatado = Number(pedido.total)
        .toFixed(2)
        .replace('.', ',');

        campTotal.textContent = 'R$' + totalFormatado;
        campPagamento.textContent = pedido.pagamento;

}else {
    
    campNumero.textContent = 'Não encontrado';
    campTotal.textContent = 'Não encontrado';
    campPagamento.textContent = 'Não encontrado';
}

const btnWhatsapp = document.getElementById('btn-whatsapp');

btnWhatsapp.addEventListener('click', function(event) {
    event.preventDefault();

    const pedido = JSON.parse(
        localStorage.getItem('pedidoAtual')
    );

    if (!pedido) {
        alert('Não foi possível encontrar os dados do pedido.');
        return;
    }

    const subtotal = pedido.produtos.reduce(function(soma, produto) {
        return soma + Number(produto.preco) * Number(produto.quantidade);
    }, 0);
    const frete = Number(pedido.total) - subtotal;


    function formatarMoeda(valor) {
        return "R$" + valor.toFixed(2).replace('.', ',');
    }

   const mensagem = [
    'NOVO PEDIDO - MEU BRECHÓ',
    '',
    'Pedido nº: ' + pedido.numero,
    'Cliente: ' + pedido.cliente.nome,
    'E-mail: ' + pedido.cliente.email,
    'Telefone: ' + pedido.cliente.telefone,
    '',
    'ENDEREÇO DE ENTREGA',
    'CEP: ' + pedido.endereco.cep,
    'Rua: ' + pedido.endereco.rua + ', nº ' + pedido.endereco.numero,
    'Bairro: ' + pedido.endereco.bairro,
    'Cidade: ' + pedido.endereco.cidade + ' - ' + pedido.endereco.estado,
    '',
    'PRODUTOS'
].concat(
    pedido.produtos.map(function(produto) {
        return produto.nome +
            ' | Quantidade: ' + produto.quantidade +
            ' | Valor: ' + formatarMoeda(
                Number(produto.preco) * Number(produto.quantidade)
            );
    }),
    [
        '',
        'Subtotal: ' + formatarMoeda(subtotal),
        'Frete: ' + formatarMoeda(frete),
        'Total: ' + formatarMoeda(Number(pedido.total)),
        'Pagamento: ' + pedido.pagamento
    ]
).join('\n');

    const numeroWhatsapp = '5519987598996';

    const linkWhatsapp = `https://wa.me/${5519987598996}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsapp, '_black');
});

