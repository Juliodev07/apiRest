const ProdutoService = require("../services/ProdutosService");
class ProdutoController{
 async create(request, response){
 const produto = await ProdutoService.create(request.body);
 return response.status(201).json({produto});
 }
}
module.exports = new ProdutoController();
