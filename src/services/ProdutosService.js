const prisma = require("../databases/prisma");

class ProdutoNaoEncontradoError extends Error {
  constructor() {
    super("Produto não encontrado");
    this.statusCode = 404;
  }
}

class ProdutoService {
  async create(produto) {
    return await prisma.produtos.create({ data: produto });
  }

  async findMany(page = 1, pageSize = 10, orderBy = "id", order = "asc") {
    const camposPermitidos = ["id", "nome", "createdAt", "updatedAt"];
    const ordensPermitidas = ["asc", "desc"];

    if (!camposPermitidos.includes(orderBy)) throw new Error("Campo de ordenação inválido");
    if (!ordensPermitidas.includes(order)) throw new Error("Ordem de ordenação inválida");

    const pagina = Number(page);
    const tamanhoPagina = Number(pageSize);

    if (!Number.isInteger(pagina) || pagina < 1) throw new Error("A página deve ser um número inteiro maior que zero");
    if (!Number.isInteger(tamanhoPagina) || tamanhoPagina < 1) throw new Error("pageSize deve ser um número inteiro maior que zero");

    const produtos = await prisma.produtos.findMany({
      skip: (pagina - 1) * tamanhoPagina,
      take: tamanhoPagina,
      orderBy: { [orderBy]: order }
    });

    const total = await prisma.produtos.count();
    return { produtos, total, page: pagina, pageSize: tamanhoPagina };
  }

  async findById(id) {
    const produto = await prisma.produtos.findUnique({ where: { id: Number(id) } });
    if (!produto) throw new ProdutoNaoEncontradoError();
    return produto;
  }

  async update(id, dados) {
    const produto = await prisma.produtos.findUnique({ where: { id: Number(id) } });
    if (!produto) throw new ProdutoNaoEncontradoError();

    if (!dados.nome || typeof dados.nome !== "string") {
      const error = new Error("O nome do produto é obrigatório");
      error.statusCode = 400;
      throw error;
    }

    try {
      return await prisma.produtos.update({
        where: { id: Number(id) },
        data: { nome: dados.nome }
      });
    } catch (error) {
      if (error.code === "P2002") {
        const novoErro = new Error("Já existe um produto com esse nome");
        novoErro.statusCode = 409;
        throw novoErro;
      }
      throw error;
    }
  }

  async delete(id) {
    const produto = await prisma.produtos.findUnique({ where: { id: Number(id) } });
    if (!produto) throw new ProdutoNaoEncontradoError();

    await prisma.produtos.delete({ where: { id: Number(id) } });
    return produto;
  }
}

module.exports = new ProdutoService();
