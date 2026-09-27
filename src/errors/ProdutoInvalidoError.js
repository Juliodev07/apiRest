const ApiError = require("./ApiError");

class ProdutoInvalidoError extends ApiError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = ProdutoInvalidoError;
