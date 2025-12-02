const Produto = require('../models/Produto')

// Função assíncrona para criar um novo produto no banco de dados.
// Recebe os dados do produto como parâmetro.
// Valida se os campos obrigatórios estão presentes; caso contrário, lança erro.
// Cria e salva o produto no banco usando o modelo Produto.
// Retorna o produto criado.
async function criarProduto(dados) {

    const { nome, descricao, modelo, categoria, marca, especificacoes, preco, imagem_url, ativo } = dados

    // Validações simples antes de salvar
    if (!nome || !modelo || !preco || !categoria || !marca) {
        throw new Error('Nome, modelo, preço, categoria e marca são obrigatórios')
    }

    const novoProduto = await Produto.create({
        nome,
        descricao,
        modelo,
        categoria,
        marca,
        especificacoes,
        preco,
        imagem_url,
        ativo
    })

    return novoProduto
}

// Função assíncrona para listar todos os produtos do banco de dados.
// Usa findAll para recuperar todos os registros da tabela produtos.
// Retorna uma lista de produtos.
async function listarProdutos() {
    const produtos = await Produto.findAll()
    return produtos
}

// Função assíncrona para buscar um produto pelo nome no banco de dados.
// Recebe o nome como parâmetro.
// Usa findOne com where clause para buscar o produto.
// Lança erro se o produto não for encontrado.
// Retorna o produto encontrado.
async function buscarProdutoPorNome(nome) {
    const produto = await Produto.findOne({
        where: {
            nome: nome
        }
    })

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    return produto
}

// Função assíncrona para atualizar parcialmente um produto no banco de dados.
// Recebe o ID do produto e os dados a atualizar.
// Busca o produto por chave primária; lança erro se não encontrado.
// Atualiza apenas os campos fornecidos usando update.
// Retorna o produto atualizado.
async function atualizarProduto(id, dados) {

    // Buscar o produto no banco
    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    // Atualizar apenas os campos enviados
    await produto.update(dados)

    return produto

}

// Função assíncrona para atualizar completamente um produto no banco de dados.
// Recebe o ID do produto e todos os dados a atualizar.
// Busca o produto por chave primária; lança erro se não encontrado.
// Valida se os campos obrigatórios estão presentes.
// Atualiza todos os campos do produto.
// Retorna o produto atualizado.
async function atualizarProdutoCompleto(id, dados) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    const { nome, descricao, modelo, categoria, marca, especificacoes, preco, imagem_url, ativo } = dados

    // Validações básicas
    if (!nome || !modelo || !preco || !categoria || !marca) {
        throw new Error('Nome, modelo, preço, categoria e marca são obrigatórios')
    }

    await produto.update({
        nome,
        descricao,
        modelo,
        categoria,
        marca,
        especificacoes,
        preco,
        imagem_url,
        ativo
    })

    return produto
}

async function apagarProduto(id) {

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    await produto.destroy()

    return true
}


module.exports = { criarProduto, listarProdutos, buscarProdutoPorNome,
    atualizarProduto, atualizarProdutoCompleto, apagarProduto }
