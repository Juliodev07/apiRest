const express = require("express");
const produtoController = require("../controllers/ProdutoController");
const router = express.Router();
router.post("/", produtoController.create);
module.exports = router;