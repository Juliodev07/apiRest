const prisma = require("../databases/prisma");

class ProdutoService {
  async create(produto) {
    const novoProduto = await prisma.produtos.create({
      data: produto
    });

    return novoProduto;
  }

  async findMany(page = 1, pageSize = 10, orderBy = "id", order = "asc") {
    const camposPermitidos = ["id", "nome", "createdAt", "updatedAt"];
    const ordensPermitidas = ["asc", "desc"];

    if (!camposPermitidos.includes(orderBy)) {
      throw new Error("Campo de ordenação inválido");
    }

    if (!ordensPermitidas.includes(order)) {
      throw new Error("Ordem de ordenação inválida");
    }

    const pagina = Number(page);
    const tamanhoPagina = Number(pageSize);

    if (!Number.isInteger(pagina) || pagina < 1) {
      throw new Error("A página deve ser um número inteiro maior que zero");
    }

    if (!Number.isInteger(tamanhoPagina) || tamanhoPagina < 1) {
      throw new Error("pageSize deve ser um número inteiro maior que zero");
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

  async delete(id) {
    const produto = await prisma.produtos.delete({
      where: {
        id: Number(id)
      }
    });

    return produto;
  }
}

module.exports = new ProdutoService();
