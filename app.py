from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///estoque.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
db = SQLAlchemy(app)

# Criar diretório para uploads se não existir
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    imagem = db.Column(db.String(200))
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()
    
    # Adicionando produtos de exemplo
    if not Produto.query.first():
        produtos_exemplo = [
            {
                'nome': 'Notebook Premium',
                'descricao': 'Notebook com processador Intel Core i7, 16GB RAM, 512GB SSD',
                'preco': 4999.99,
                'quantidade': 10,
                'imagem': 'produto1.jpg'
            },
            {
                'nome': 'Smartphone Flagship',
                'descricao': 'Smartphone com tela AMOLED 6.7", 12GB RAM, 256GB',
                'preco': 2999.99,
                'quantidade': 5,
                'imagem': 'produto1.jpg'
            },
            {
                'nome': 'Tablet Pro',
                'descricao': 'Tablet com tela 12.9", processador M1, 8GB RAM',
                'preco': 3499.99,
                'quantidade': 8,
                'imagem': 'produto1.jpg'
            }
        ]
        
        for produto in produtos_exemplo:
            novo_produto = Produto(
                nome=produto['nome'],
                descricao=produto['descricao'],
                preco=produto['preco'],
                quantidade=produto['quantidade'],
                imagem=produto['imagem']
            )
            db.session.add(novo_produto)
        db.session.commit()

@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)

@app.route('/adicionar', methods=['POST'])
def adicionar_produto():
    data = request.get_json()
    novo_produto = Produto(
        nome=data['nome'],
        descricao=data['descricao'],
        preco=float(data['preco']),
        quantidade=int(data['quantidade'])
    )
    db.session.add(novo_produto)
    db.session.commit()
    return jsonify({'message': 'Produto adicionado com sucesso!'}), 201

if __name__ == '__main__':
    app.run(debug=True)
