let produtos = [];

// Função para carregar produtos do localStorage
function carregarProdutos() {
    try {
        const produtosSalvos = localStorage.getItem('produtos');
        if (produtosSalvos) {
            return JSON.parse(produtosSalvos);
        }
        return [
            'Notebook Premium',
            'Smartphone Flagship',
            'Tablet Pro'
        ];
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        return [];
    }
}

// Função para salvar produtos no localStorage
function salvarProdutos() {
    try {
        localStorage.setItem('produtos', JSON.stringify(produtos));
    } catch (error) {
        console.error('Erro ao salvar produtos:', error);
    }
}

// Carregar produtos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Carregar produtos
        produtos = carregarProdutos();
        
        // Adicionar evento ao formulário
        const formProduto = document.getElementById('formProduto');
        if (formProduto) {
            formProduto.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Pegar nome do produto
                const nome = document.getElementById('nome').value;
                
                // Adicionar ao array de produtos
                produtos.push(nome);
                
                // Salvar no localStorage
                salvarProdutos();
                
                // Atualizar a lista de produtos
                atualizarProdutos();
                
                // Fechar modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalProduto'));
                modal.hide();
                
                // Limpar formulário
                formProduto.reset();
            });
        }
        
        // Atualizar a lista de produtos inicialmente
        atualizarProdutos();
    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
});

// Função para atualizar a lista de produtos
function atualizarProdutos() {
    try {
        const container = document.querySelector('.produtos-container');
        container.innerHTML = '';
        
        // Criar cards para cada produto
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${produto}</h5>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
    }
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
