const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Criar
router.post("/add", (req, res) => {
  const { nome, descricao, valor, disponivel } = req.body;
  const sql = "INSERT INTO produtos (nome, descricao, valor, disponivel) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [nome, descricao, valor, disponivel], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: "Produto criado!", id: result.insertId });
  });
});


// Ler
router.get("/produtos", (req, res) => {
  const sql = "SELECT * FROM produtos";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
});


//Alterar
router.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, valor, disponivel } = req.body;

  const sql = `
    UPDATE produtos 
    SET nome = ?, descricao = ?, valor = ?, disponivel = ? 
    WHERE id = ?
  `;

  db.query(sql, [nome, descricao, valor, disponivel, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  });
});


// Excluir
router.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM produtos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    res.status(200).json({ message: "Produto excluído com sucesso!" });
  });
});


module.exports = router;
