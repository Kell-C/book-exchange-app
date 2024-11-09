import express from "express";
import cors from "cors";
import { registrarUsuario, loginUsuario } from "./firebase/auth.mjs";
import {
  adicionarLivro,
  listarLivrosDisponiveis,
  deletarLivro,
  atualizarDisponibilidadeLivro,
} from "./firebase/firestore.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Configura o middleware CORS para permitir solicitações de origem cruzada
app.use(cors());
app.use(express.json()); // Para parsear JSON no body das requisições

// Rota para registro de usuário (exemplo)
app.post("/api/registrar", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuarioRegistrado = await registrarUsuario(email, senha);
    res.status(201).json({
      message: "Usuário registrado com sucesso",
      usuario: usuarioRegistrado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
});

// Rota para login de usuário (exemplo)
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuarioLogado = await loginUsuario(email, senha);
    res
      .status(200)
      .json({ message: "Usuário logado com sucesso", usuario: usuarioLogado });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
});

// Rota para adicionar um novo livro
app.post("/api/livros", async (req, res) => {
  const { titulo, autor, genero, ano } = req.body;
  if (!titulo || !autor || !genero || !ano) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const livroId = await adicionarLivro(titulo, autor, genero, ano);
    res.status(201).json({ message: "Livro adicionado com sucesso", livroId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar livro", error: error.message });
  }
});

// Rota para listar livros disponíveis
app.get("/api/livros", async (req, res) => {
  try {
    const livros = await listarLivrosDisponiveis();
    res.status(200).json(livros);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar livros", error: error.message });
  }
});

// Rota para deletar um livro pelo ID
app.delete("/api/livros/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deletarLivro(id);
    res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao deletar livro", error: error.message });
  }
});

// Rota para atualizar a disponibilidade de um livro pelo ID
app.patch("/api/livros/:id/disponibilidade", async (req, res) => {
  const { id } = req.params;
  const { disponivel } = req.body;

  try {
    await atualizarDisponibilidadeLivro(id, disponivel);
    res
      .status(200)
      .json({ message: "Disponibilidade do livro atualizada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao atualizar disponibilidade",
        error: error.message,
      });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
