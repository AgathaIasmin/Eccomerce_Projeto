const Estoque = require('../models/Estoque')
const Produto = require('../models/Produto')

// Função assíncrona para criar um novo registro de estoque.
// Recebe os dados do estoque (idProduto, quantidade_atual, quantidade_minima).
// Verifica se o produto existe e se já não há estoque para ele.
// Cria o estoque no banco de dados e retorna o novo registro.
async function criarEstoque(dados) {
    const { idProduto, quantidade_atual, quantidade_minima } = dados

    // Verificar se o produto existe
    const produto = await Produto.findByPk(idProduto)
    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    // Verificar se já existe estoque para este produto
    const estoqueExistente = await Estoque.findOne({ where: { idProduto } })
    if (estoqueExistente) {
        throw new Error('Já existe um estoque cadastrado para este produto')
    }

    const novoEstoque = await Estoque.create({
        idProduto,
        quantidade_atual: quantidade_atual || 0,
        quantidade_minima: quantidade_minima || 0
    })

    return novoEstoque
}

// Função assíncrona para listar todos os registros de estoque.
// Busca todos os estoques no banco, incluindo informações do produto associado.
// Retorna a lista de estoques com detalhes do produto.
async function listarEstoques() {
    const estoques = await Estoque.findAll({
        include: [{
            model: Produto,
            attributes: ['codProduto', 'nome', 'modelo', 'preco']
        }]
    })
    return estoques
}

async function buscarEstoquePorProduto(idProduto) {
    const estoque = await Estoque.findOne({
        where: { idProduto },
        include: [{
            model: Produto,
            attributes: ['codProduto', 'nome', 'modelo', 'preco']
        }]
    })

    if (!estoque) {
        throw new Error('Estoque não encontrado para este produto')
    }

    return estoque
}

// Função assíncrona para atualizar um registro de estoque.
// Recebe o idProduto e os dados a atualizar.
// Busca o estoque no banco e lança erro se não encontrado.
// Atualiza o estoque com os novos dados e retorna o registro atualizado.
async function atualizarEstoque(idProduto, dados) {
    const estoque = await Estoque.findOne({ where: { idProduto } })

    if (!estoque) {
        throw new Error('Estoque não encontrado')
    }

    await estoque.update(dados)

    return estoque
}

async function adicionarQuantidade(idProduto, quantidade) {
    const estoque = await Estoque.findOne({ where: { idProduto } })

    if (!estoque) {
        throw new Error('Estoque não encontrado')
    }

    const novaQuantidade = estoque.quantidade_atual + quantidade

    await estoque.update({ quantidade_atual: novaQuantidade })

    return estoque
}

async function removerQuantidade(idProduto, quantidade) {
    const estoque = await Estoque.findOne({ where: { idProduto } })

    if (!estoque) {
        throw new Error('Estoque não encontrado')
    }

    const novaQuantidade = estoque.quantidade_atual - quantidade

    if (novaQuantidade < 0) {
        throw new Error('Quantidade insuficiente em estoque')
    }

    await estoque.update({ quantidade_atual: novaQuantidade })

    return estoque
}

async function deletarEstoque(idProduto) {
    const estoque = await Estoque.findOne({ where: { idProduto } })

    if (!estoque) {
        throw new Error('Estoque não encontrado')
    }

    await estoque.destroy()

    return true
}

module.exports = {
    criarEstoque,
    listarEstoques,
    buscarEstoquePorProduto,
    atualizarEstoque,
    adicionarQuantidade,
    removerQuantidade,
    deletarEstoque
}
