const ProdutoService = require("../services/ProdutoService");

class ProdutoController {
  async create(request, response) {
    try {
      const produto = await ProdutoService.create(request.body);

      return response.status(201).json({
        produto
      });
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({
          message: error.message
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
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({
          message: error.message
        });
    }
  }

  async findById(request, response) {
    try {
      const { id } = request.params;

      const produto = await ProdutoService.findById(id);

      return response.status(200).json({
        produto
      });
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({
          message: error.message
        });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const produto = await ProdutoService.update(
        id,
        request.body
      );

      return response.status(200).json({
        produto
      });
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({
          message: error.message
        });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await ProdutoService.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({
          message: error.message
        });
    }
  }
}

module.exports = new ProdutoController();
