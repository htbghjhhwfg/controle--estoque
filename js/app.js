let produtos = [
    {
        nome: 'Notebook Premium',
        descricao: 'Notebook com processador Intel Core i7, 16GB RAM, 512GB SSD',
        preco: 4999.99,
        quantidade: 10,
        imagem: 'https://via.placeholder.com/400x200'
    },
    {
        nome: 'Smartphone Flagship',
        descricao: 'Smartphone com tela AMOLED 6.7", 12GB RAM, 256GB',
        preco: 2999.99,
        quantidade: 5,
        imagem: 'https://via.placeholder.com/400x200'
    },
    {
        nome: 'Tablet Pro',
        descricao: 'Tablet com tela 12.9", processador M1, 8GB RAM',
        preco: 3499.99,
        quantidade: 8,
        imagem: 'https://via.placeholder.com/400x200'
    }
];

// Função para adicionar novo produto
function adicionarProduto(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    
    // Adicionar novo produto ao array
    produtos.push({
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
        imagem: 'https://via.placeholder.com/400x200'
    });
    
    // Atualizar a lista de produtos
    atualizarProdutos();
    
    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalProduto'));
    modal.hide();
    
    // Limpar formulário
    document.getElementById('formProduto').reset();
}

// Adicionar evento ao formulário
const formProduto = document.getElementById('formProduto');
if (formProduto) {
    formProduto.addEventListener('submit', adicionarProduto);
}

function formatarPreco(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function criarCard(produto) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    
    card.innerHTML = `
        <div class="card">
            <img src="${produto.imagem}" class="card-img-top produto-imagem" alt="${produto.nome}">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${produto.descricao}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="h5 mb-0">${formatarPreco(produto.preco)}</span>
                    <span class="badge ${produto.quantidade < 5 ? 'bg-danger' : 'bg-success'}">
                        ${produto.quantidade} em estoque
                    </span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Função para atualizar a lista de produtos
function atualizarProdutos() {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = '';
    produtos.forEach(produto => {
        container.appendChild(criarCard(produto));
    });
}

// Carregar produtos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.produtos-container');
    produtos.forEach(produto => {
        container.appendChild(criarCard(produto));
    });
});
