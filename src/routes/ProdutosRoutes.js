const express = require("express");
const produtoController = require("../controllers/ProdutoController");

const router = express.Router();

router.post("/", produtoController.create);
router.get("/", produtoController.findMany);
router.get("/:id", produtoController.findById);
router.put("/:id", produtoController.update);
router.delete("/:id", produtoController.delete);

module.exports = router;
