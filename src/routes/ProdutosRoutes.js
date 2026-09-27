const express = require("express");
const produtoController = require("../controllers/ProdutoController");

const router = express.Router();

router.post("/", produtoController.create);
router.get("/", produtoController.findMany);
router.delete("/:id", produtoController.delete);

module.exports = router;
