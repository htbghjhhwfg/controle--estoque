let produtos = [];
let categoriaAtual = 'todos';

// Função para carregar produtos do localStorage
function carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        return JSON.parse(produtosSalvos);
    }
    return [
        {
            nome: 'Notebook Premium',
            descricao: 'Notebook com processador Intel Core i7, 16GB RAM, 512GB SSD',
            preco: 4999.99,
            quantidade: 10,
            imagem: 'https://via.placeholder.com/400x200',
            categoria: 'informatica'
        },
        {
            nome: 'Smartphone Flagship',
            descricao: 'Smartphone com tela AMOLED 6.7", 12GB RAM, 256GB',
            preco: 2999.99,
            quantidade: 5,
            imagem: 'https://via.placeholder.com/400x200',
            categoria: 'celular'
        },
        {
            nome: 'Tablet Pro',
            descricao: 'Tablet com tela 12.9", processador M1, 8GB RAM',
            preco: 3499.99,
            quantidade: 8,
            imagem: 'https://via.placeholder.com/400x200',
            categoria: 'tablet'
        }
    ];
}

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
    categoriaAtual = categoria;
    atualizarProdutos();
}

// Carregar produtos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Carregar produtos
    produtos = carregarProdutos();
    
    // Adicionar evento ao formulário
    const formProduto = document.getElementById('formProduto');
    if (formProduto) {
        formProduto.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Pegar valores do formulário
            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const preco = parseFloat(document.getElementById('preco').value);
            const quantidade = parseInt(document.getElementById('quantidade').value);
            const categoria = document.getElementById('categoria').value;
            const imagemInput = document.getElementById('imagem');
            let imagem = 'https://via.placeholder.com/400x200';

            // Se houver imagem selecionada, usar a URL da imagem
            if (imagemInput.files.length > 0) {
                imagem = URL.createObjectURL(imagemInput.files[0]);
            }
            
            // Criar novo produto
            const novoProduto = {
                nome: nome,
                descricao: descricao,
                preco: preco,
                quantidade: quantidade,
                imagem: imagem,
                categoria: categoria
            };
            
            // Adicionar ao array de produtos
            produtos.push(novoProduto);
            
            // Salvar no localStorage
            localStorage.setItem('produtos', JSON.stringify(produtos));
            
            // Atualizar a lista de produtos
            atualizarProdutos();
            
            // Fechar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalProduto'));
            modal.hide();
            
            // Limpar formulário
            formProduto.reset();
            
            // Limpar URL da imagem
            if (imagemInput.files.length > 0) {
                URL.revokeObjectURL(imagem);
            }
        });
    }
    
    // Adicionar evento de clique nas categorias
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remover classe active de todos os links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            // Adicionar classe active ao link clicado
            this.classList.add('active');
            // Filtrar produtos
            filtrarProdutos(this.dataset.categoria);
        });
    });
    
    // Atualizar a lista de produtos inicialmente
    atualizarProdutos();
});

// Função para atualizar a lista de produtos
function atualizarProdutos() {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = '';
    
    // Filtrar produtos com base na categoria atual
    const produtosFiltrados = categoriaAtual === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === categoriaAtual);
    
    produtosFiltrados.forEach(produto => {
        container.appendChild(criarCard(produto));
    });
}

// Função para excluir produto
function excluirProduto(produto) {
    if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
        // Remover o produto do array
        const index = produtos.indexOf(produto);
        if (index > -1) {
            produtos.splice(index, 1);
        }
        // Salvar produtos no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
        // Atualizar a lista
        atualizarProdutos();
    }
}

// Função para atualizar a lista de produtos
function atualizarProdutos() {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = '';
    
    produtos.forEach(produto => {
        container.appendChild(criarCard(produto));
    });
}

// Função para criar card de produto

function criarCard(produto) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    
    const categoriaNome = {
        eletronico: 'Eletrônicos',
        informatica: 'Informática',
        celular: 'Celulares',
        tablet: 'Tablets'
    }[produto.categoria];
    
    card.innerHTML = `
        <div class="card">
            <button class="btn-excluir" onclick="excluirProduto(this.closest('.card').produto)">
                <i class="fas fa-trash"></i>
            </button>
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
                <div class="mt-2">
                    <span class="badge bg-secondary">${categoriaNome}</span>
                </div>
            </div>
        </div>
    `;
    
    card.produto = produto;
    return card;
}

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
    const container = document.querySelector('.produtos-container');
    container.innerHTML = '';
    
    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === categoria);
    
    produtosFiltrados.forEach(produto => {
        container.appendChild(criarCard(produto));
    });
}

// Adicionar evento de clique nos links de categoria
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Remover classe active de todos os links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Adicionar classe active no link clicado
        this.classList.add('active');
        // Filtrar produtos
        filtrarProdutos(this.dataset.categoria);
    });
});

// Carregar produtos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    atualizarProdutos();
});

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
