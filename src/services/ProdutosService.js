const prisma = require("../databases/prisma");
class ProdutoService{
 async create(produto){
 //create = insert
 //update = update
 //delete = delete
 //findMany = select * from
 const novoProduto = await prisma.pro.create({data:produto});
 return novoProduto;
 }
}
module.exports = new ProdutoService();