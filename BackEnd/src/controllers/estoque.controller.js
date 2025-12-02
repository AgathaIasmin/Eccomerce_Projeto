const { criarEstoque, listarEstoques, buscarEstoquePorProduto,
    atualizarEstoque, adicionarQuantidade, removerQuantidade,
    deletarEstoque } = require('../services/estoque.service')

// Função assíncrona para criar um novo registro de estoque.
// Recebe os dados do estoque no corpo da requisição (req.body).
// Chama o serviço criarEstoque para salvar no banco.
// Retorna status 201 com mensagem de sucesso e o estoque criado, ou 500 em caso de erro.
async function criar(req, res) {
    try {
        const estoque = await criarEstoque(req.body)

        return res.status(201).json({
            mensagem: 'Estoque criado com sucesso',
            estoque
        })

    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para listar todos os registros de estoque.
// Chama o serviço listarEstoques para obter todos os estoques do banco.
// Retorna status 200 com a lista de estoques, ou 500 em caso de erro.
async function listar(req, res) {
    try {
        const estoques = await listarEstoques()
        return res.status(200).json(estoques)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para buscar o estoque de um produto específico.
// Recebe o idProduto como parâmetro da URL (req.params).
// Chama o serviço buscarEstoquePorProduto para obter o estoque do produto.
// Retorna status 200 com o estoque encontrado, ou 500 em caso de erro.
async function buscarPorProduto(req, res) {
    try {
        const { idProduto } = req.params
        const estoque = await buscarEstoquePorProduto(idProduto)
        return res.status(200).json(estoque)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para atualizar um registro de estoque.
// Recebe o idProduto como parâmetro da URL (req.params) e os dados a atualizar no corpo (req.body).
// Chama o serviço atualizarEstoque para atualizar o estoque no banco.
// Retorna status 200 com mensagem de sucesso e o estoque atualizado, ou 500 em caso de erro.
async function atualizar(req, res) {
    try {
        const { idProduto } = req.params
        const dados = req.body
        const estoqueAtualizado = await atualizarEstoque(idProduto, dados)
        return res.status(200).json({
            mensagem: 'Estoque atualizado com sucesso',
            estoque: estoqueAtualizado
        })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function adicionar(req, res) {
    try {
        const { idProduto } = req.params
        const { quantidade } = req.body
        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ erro: 'Quantidade deve ser um número positivo' })
        }
        const estoque = await adicionarQuantidade(idProduto, quantidade)
        return res.status(200).json({
            mensagem: 'Quantidade adicionada com sucesso',
            estoque
        })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para remover quantidade do estoque de um produto.
// Recebe o idProduto como parâmetro da URL (req.params) e a quantidade a remover no corpo (req.body).
// Valida se a quantidade é positiva; caso contrário, retorna erro 400.
// Chama o serviço removerQuantidade para decrementar o estoque no banco.
// Retorna status 200 com mensagem de sucesso e o estoque atualizado, ou 500 em caso de erro.
async function remover(req, res) {
    try {
        const { idProduto } = req.params
        const { quantidade } = req.body
        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ erro: 'Quantidade deve ser um número positivo' })
        }
        const estoque = await removerQuantidade(idProduto, quantidade)
        return res.status(200).json({
            mensagem: 'Quantidade removida com sucesso',
            estoque
        })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para deletar um registro de estoque.
// Recebe o idProduto como parâmetro da URL (req.params).
// Chama o serviço deletarEstoque para remover o estoque do banco.
// Retorna status 200 com mensagem de sucesso, ou 500 em caso de erro.
async function deletar(req, res) {
    try {
        const { idProduto } = req.params
        await deletarEstoque(idProduto)
        return res.status(200).json({ mensagem: 'Estoque deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

module.exports = { criar, listar, buscarPorProduto, atualizar, adicionar, remover, deletar }