const prisma = require("../databases/prisma");

class ProdutoService {
  async create(produto) {
    const novoProduto = await prisma.produtos.create({
      data: produto
    });

    return novoProduto;
  }

  async findMany() {
    const produtos = await prisma.produtos.findMany();

    return produtos;
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