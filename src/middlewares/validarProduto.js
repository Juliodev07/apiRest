const ProdutoInvalidoError = require("../errors/ProdutoInvalidoError");
const produtoSchema = require("../schemas/produtoSchema");

function validarProduto(request, response, next) {
  const { nome } = request.body;

  if (produtoSchema.nome.required && !nome) {
    throw new ProdutoInvalidoError(
      "O nome do produto é obrigatório"
    );
  }

  if (typeof nome !== "string") {
    throw new ProdutoInvalidoError(
      "O nome do produto deve ser um texto"
    );
  }

  next();
}

module.exports = validarProduto;
