const { criarPedido, listarPedidosUsuario, buscarPedidoPorId,
    atualizarStatusPedido, listarTodosPedidos } = require('../services/pedido.service')

async function criar(req, res) {
    try {
        const idUsuario = req.user.id // From auth middleware
        const dados = { ...req.body, idUsuario }
        const pedido = await criarPedido(dados)
        return res.status(201).json({
            mensagem: 'Pedido criado com sucesso',
            pedido
        })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para listar os pedidos do usuário logado.
// Obtém o idUsuario do middleware de autenticação (req.user.id).
// Chama o serviço listarPedidosUsuario para obter os pedidos do usuário.
// Retorna status 200 com a lista de pedidos, ou 500 em caso de erro.
async function listarMeus(req, res) {
    try {
        const idUsuario = req.user.id // From auth middleware
        const pedidos = await listarPedidosUsuario(idUsuario)
        return res.status(200).json(pedidos)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

async function buscarPorId(req, res) {
    try {
        const { id } = req.params
        const idUsuario = req.user.id
        const pedido = await buscarPedidoPorId(id, idUsuario)
        return res.status(200).json(pedido)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para atualizar o status de um pedido.
// Recebe o id do pedido como parâmetro da URL (req.params) e o novo status no corpo (req.body).
// Chama o serviço atualizarStatusPedido para atualizar o status no banco.
// Retorna status 200 com mensagem de sucesso e o pedido atualizado, ou 500 em caso de erro.
async function atualizarStatus(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body
        const pedido = await atualizarStatusPedido(id, status)
        return res.status(200).json({
            mensagem: 'Status do pedido atualizado',
            pedido
        })
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

// Função assíncrona para listar todos os pedidos (geralmente para administradores).
// Chama o serviço listarTodosPedidos para obter todos os pedidos do banco.
// Retorna status 200 com a lista de todos os pedidos, ou 500 em caso de erro.
async function listarTodos(req, res) {
    try {
        const pedidos = await listarTodosPedidos()
        return res.status(200).json(pedidos)
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
}

module.exports = { criar, listarMeus, buscarPorId, atualizarStatus, listarTodos }