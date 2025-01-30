import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Substitua pelo endereço do backend
});

export const getProdutos = async () => {
  const response = await api.get("/produtos");
  return response.data;
};

export const createProduto = async (data) => {
  const response = await api.post("/add", data);
  return response.data;
};

export const updateProduto = async (id, data) => {
  const response = await api.put(`/produtos/${id}`, data);
  return response.data;
};

export const deleteProduto = async (id) => {
  const response = await api.delete(`/produtos/${id}`);
  return response.data;
};
