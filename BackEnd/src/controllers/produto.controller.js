const { criarProduto, listarProdutos, buscarProdutoPorNome,
    atualizarProduto, atualizarProdutoCompleto,
    apagarProduto } = require('../services/produto.service')

// Função assíncrona para criar um novo produto.
// Recebe os dados do produto no corpo da requisição (req.body).
// Chama o serviço criarProduto para salvar no banco.
// Retorna status 201 com mensagem de sucesso e o produto criado, ou 500 em caso de erro.
async function criar(req, res) {

    try {

        const produto = await criarProduto(req.body)

        return res.status(201).json({
            mensagem: 'Produto criado com sucesso',
            produto
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function listar(req, res) {
    try {
        const produtos = await listarProdutos()

        return res.status(200).json(produtos)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para buscar um produto por nome.
// Recebe o nome no corpo da requisição (req.body).
// Valida se o nome foi fornecido; caso contrário, retorna erro 400.
// Chama o serviço buscarProdutoPorNome e retorna o produto encontrado ou erro 500.
async function buscarPorNome(req, res) {
    try {
        const { nome } = req.body

        if (!nome) {
            return res.status(400).json({ erro: 'Nome é obrigatório' })
        }

        const produto = await buscarProdutoPorNome(nome)

        return res.status(200).json(produto)

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para atualizar parcialmente um produto (PATCH).
// Recebe o ID do produto nos parâmetros da URL (req.params) e os dados a atualizar no corpo (req.body).
// Chama o serviço atualizarProduto para aplicar as mudanças.
// Retorna status 200 com mensagem de sucesso e o produto atualizado, ou 500 em caso de erro.
async function atualizar(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProduto(id, dados)

        return res.status(200).json({
            mensagem: 'Produto atualizado com sucesso',
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }

}

// Função assíncrona para atualizar completamente um produto (PUT).
// Recebe o ID do produto nos parâmetros da URL (req.params) e todos os dados no corpo (req.body).
// Chama o serviço atualizarProdutoCompleto para substituir os dados do produto.
// Retorna status 200 com mensagem de sucesso e o produto atualizado, ou 500 em caso de erro.
async function atualizarCompleto(req, res) {
    try {
        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProdutoCompleto(id, dados)

        return res.status(200).json({
            mensagem: 'Produto atualizado completamente com sucesso',
            produto: produtoAtualizado
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para deletar um produto (DELETE).
// Recebe o ID do produto nos parâmetros da URL (req.params).
// Chama o serviço apagarProduto para remover o produto do banco.
// Retorna status 200 com mensagem de sucesso, ou 500 em caso de erro.
async function deletar(req, res) {
    try {
        const { id } = req.params

        await apagarProduto(id)

        return res.status(200).json({ mensagem: 'Produto apagado com sucesso' })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}


module.exports = { criar, listar, buscarPorNome, atualizar, 
    atualizarCompleto, deletar }
