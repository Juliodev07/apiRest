require('dotenv/config');
const express = require("express")
const produtoRoutes = require("./routes/ProdutosRoutes");

const app = express();
app.use(express.json());
app.use("/produtos", produtoRoutes);
app.listen(process.env.PORT, ()=>{
 console.log(`Server running on port ${process.env.PORT}`);
});