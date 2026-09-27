const ProdutoService = require("../services/ProdutosService");

class ProdutoController {
  async create(request, response) {
    try {
      const produto = await ProdutoService.create(request.body);

      return response.status(201).json({ produto });
    } catch (e) {
      return response.status(e.statusCode || 500).json({
        message: e.message
      });
    }
  }

  async findMany(request, response) {
    try {
      const {
        page = 1,
        pageSize = 10,
        orderBy = "id",
        order = "asc"
      } = request.query;

      const resultado = await ProdutoService.findMany(
        page,
        pageSize,
        orderBy,
        order
      );

      return response.status(200).json(resultado);
    } catch (e) {
      return response.status(e.statusCode || 500).json({
        message: e.message
      });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const produto = await ProdutoService.findById(id);

      return response.status(200).json({ produto });
    } catch (e) {
      return response.status(e.statusCode || 500).json({
        message: e.message
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await ProdutoService.delete(id);

      return response.status(204).send();
    } catch (e) {
      return response.status(e.statusCode || 500).json({
        message: e.message
      });
    }
  }
}

module.exports = new ProdutoController();
