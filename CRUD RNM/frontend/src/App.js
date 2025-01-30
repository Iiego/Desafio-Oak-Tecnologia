import "./App.css";
import React, { useEffect, useState } from "react";
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from "./services/apiService";
import AcoesProduto from "./components/AcoesProduto/AcoesProduto";

function App() {

  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    valor: "",
    disponivel: "sim",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editandoProduto, setEditandoProduto] = useState({
    nome: "",
    descricao: "",
    valor: "",
    disponivel: "sim",
  });

  const [erro, setErro] = useState("");
  const [mostrarPopup, setMostrarPopup] = useState(false);

  
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      const produtosOrdenados = data.sort((b, a) => b.valor - a.valor);
      setProdutos(produtosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleCreate = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.valor ||parseFloat(novoProduto.valor) <= 0 ) {
      setErro("Preencha todos os campos e insira um valor valido!");
      setMostrarPopup(true);
      return;
    }

    try {
      await createProduto(novoProduto);
      setNovoProduto({ nome: "", descricao: "", valor: "", disponivel: "sim" });
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduto(editandoId, editandoProduto);
      setEditandoId(null);
      setEditandoProduto({
        nome: "",
        descricao: "",
        valor: "",
        disponivel: "sim",
      });
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduto(id);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleEdit = (produto) => {
    setEditandoId(produto.id);
    setEditandoProduto(produto);
  };

  const handleCancel = () => {
    setEditandoId(null);
    setEditandoProduto({
      nome: "",
      descricao: "",
      valor: "",
      disponivel: "sim",
    });
  };


  return (
    <div className="container">
      {mostrarPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{erro}</p>
            <button onClick={() => setMostrarPopup(false)}>Fechar</button>
          </div>
        </div>
      )}

      <h1>CRUD de Produtos</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
          className="input-field"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }
          className="input-field"
        />
        <input
          type="number"
          placeholder="Valor"
          value={novoProduto.valor}
          onChange={(e) => {
            const valor = e.target.value;
            if (valor >= 0 || valor === "") {
              setNovoProduto({ ...novoProduto, valor: valor });
            }
          }}
          className="input-field"
          min="1"
        />

        <p className="produto-disponivel-label">Produto disponível ?</p>
        <select
          value={novoProduto.disponivel}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, disponivel: e.target.value })
          }
          className="select"
        >
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
        <button onClick={handleCreate} className="btn btn-primary">
          Adicionar
        </button>
      </div>


      <ul className="product-list">
        {produtos.map((produto) => (
          <li key={produto.id} className="product-item">
            {editandoId === produto.id ? (
              <AcoesProduto
                produto={editandoProduto}
                onSave={handleUpdate}
                onCancel={handleCancel}
                onChange={setEditandoProduto}
                onDelete={() => handleDelete(produto.id)}
              />
            ) : (
              <div>
                <p>
                  <strong>Nome:</strong> {produto.nome}
                </p>
                <p>
                  <strong>Descrição:</strong> {produto.descricao}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {produto.valor}
                </p>
                <p>
                  <strong>Disponível:</strong> {produto.disponivel}
                </p>
                <button
                  onClick={() => handleEdit(produto)}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="btn btn-delete"
                >
                  Deletar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
