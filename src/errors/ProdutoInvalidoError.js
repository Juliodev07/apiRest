const ApiError = require("./ApiError");

class ProdutoInvalidoError extends ApiError {
  constructor(
    message = "Nome do produto é obrigatório",
    statusCode = 400
  ) {
    super(message, statusCode);
  }
}

module.exports = ProdutoInvalidoError;
