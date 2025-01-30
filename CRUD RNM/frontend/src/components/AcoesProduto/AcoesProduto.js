import React from "react";
import "./AcoesProduto.css";

const AcoesProduto = ({ produto, onSave, onCancel, onChange, onDelete }) => {
  return (
    <div className="editar-produto-container">
      {produto ? (
        <div>
          <h2>Editar Produto</h2>
          <input
            type="text"
            value={produto.nome}
            onChange={(e) => onChange({ ...produto, nome: e.target.value })}
            className="input-field"
            placeholder="Nome do produto"
          />
          <input
            type="text"
            value={produto.descricao}
            onChange={(e) => onChange({ ...produto, descricao: e.target.value })}
            className="input-field"
            placeholder="Descrição"
          />
          <input
            type="number"
            value={produto.valor}
            onChange={(e) => onChange({ ...produto, valor: e.target.value })}
            className="input-field"
            placeholder="Valor"
          />
          <p className="produto-disponivel-label">Produto disponível ?</p>
          <select
            value={produto.disponivel}
            onChange={(e) => onChange({ ...produto, disponivel: e.target.value })}
            className="select"
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
          <div className="botoes-edicao">
            <button onClick={() => onSave()} className="botao-salvar">Salvar</button>
            <button onClick={() => onCancel()} className="botao-cancelar">Cancelar</button>
            <button onClick={() => onDelete()} className="botao-deletar">Deletar</button>
          </div>
        </div>
      ) : (
        <div className="botoes-acoes">
          <button onClick={() => onDelete()} className="botao-deletar">Deletar</button>
          <button onClick={() => onSave()} className="botao-editar">Editar</button>
        </div>
      )}
    </div>
  );
};

export default AcoesProduto;
