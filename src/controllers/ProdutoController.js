const ProdutoService = require("../services/ProdutosService");

class ProdutoController {
  async create(request, response) {
    const produto = await ProdutoService.create(request.body);

    return response.status(201).json({ produto });
  }

  async findMany(request, response) {
    const produtos = await ProdutoService.findMany();

    return response.status(200).json({ produtos });
  }

  async delete(request, response) {
    const { id } = request.params;

    const produto = await ProdutoService.delete(id);

    return response.status(204).json({ produto });
  }
}

module.exports = new ProdutoController();