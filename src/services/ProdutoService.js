const prisma = require("../databases/prisma");
const ApiError = require("../errors/ApiError");

class ProdutoService {
  async create(produto) {
    try {
      const novoProduto = await prisma.produtos.create({
        data: produto
      });

      return novoProduto;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ApiError(
          "Já existe um produto com esse nome",
          409
        );
      }

      throw error;
    }
  }

  async findMany(
    page = 1,
    pageSize = 10,
    orderBy = "id",
    order = "asc"
  ) {
    const camposPermitidos = [
      "id",
      "nome",
      "createdAt",
      "updatedAt"
    ];

    const ordensPermitidas = ["asc", "desc"];

    if (!camposPermitidos.includes(orderBy)) {
      throw new ApiError(
        "Campo de ordenação inválido",
        400
      );
    }

    if (!ordensPermitidas.includes(order)) {
      throw new ApiError(
        "Ordem de ordenação inválida",
        400
      );
    }

    const pagina = Number(page);
    const tamanhoPagina = Number(pageSize);

    if (!Number.isInteger(pagina) || pagina < 1) {
      throw new ApiError(
        "A página deve ser um número inteiro maior que zero",
        400
      );
    }

    if (!Number.isInteger(tamanhoPagina) || tamanhoPagina < 1) {
      throw new ApiError(
        "pageSize deve ser um número inteiro maior que zero",
        400
      );
    }

    const produtos = await prisma.produtos.findMany({
      skip: (pagina - 1) * tamanhoPagina,
      take: tamanhoPagina,
      orderBy: {
        [orderBy]: order
      }
    });

    const total = await prisma.produtos.count();

    return {
      produtos,
      total,
      page: pagina,
      pageSize: tamanhoPagina
    };
  }

  async findById(id) {
    const produto = await prisma.produtos.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!produto) {
      throw new ApiError(
        "Produto não encontrado",
        404
      );
    }

    return produto;
  }

  async update(id, dados) {
    const produto = await prisma.produtos.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!produto) {
      throw new ApiError(
        "Produto não encontrado",
        404
      );
    }

    try {
      const produtoAtualizado = await prisma.produtos.update({
        where: {
          id: Number(id)
        },
        data: {
          nome: dados.nome
        }
      });

      return produtoAtualizado;
    } catch (error) {
      if (error.code === "P2002") {
        throw new ApiError(
          "Já existe um produto com esse nome",
          409
        );
      }

      throw error;
    }
  }

  async delete(id) {
    const produto = await prisma.produtos.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!produto) {
      throw new ApiError(
        "Produto não encontrado",
        404
      );
    }

    await prisma.produtos.delete({
      where: {
        id: Number(id)
      }
    });

    return produto;
  }
}

module.exports = new ProdutoService();
