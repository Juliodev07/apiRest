const z = require("zod");

const produtoSchema = z.object({
  nome: z.string().trim().min(3, "Nome muito curto.")
});

module.exports = produtoSchema;
