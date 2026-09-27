const express = require("express");
const produtoController = require("../controllers/ProdutoController");
const validarProduto = require("../middlewares/validarProduto");

const router = express.Router();

router.post(
  "/",
  validarProduto,
  produtoController.create
);

router.get(
  "/",
  produtoController.findMany
);

router.get(
  "/:id",
  produtoController.findById
);

router.put(
  "/:id",
  validarProduto,
  produtoController.update
);

router.delete(
  "/:id",
  produtoController.delete
);

module.exports = router;
