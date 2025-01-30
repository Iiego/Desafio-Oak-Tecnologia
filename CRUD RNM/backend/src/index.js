const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crudRoutes = require("./routes/crudRoutes");



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API funcionando!"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


app.use("/api", crudRoutes);