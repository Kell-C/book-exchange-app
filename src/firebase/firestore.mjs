// src/firebase/firestore.mjs
import { db } from "./firebaseConfig.mjs";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Função para adicionar um novo livro
export async function adicionarLivro(titulo, autor, genero, ano) {
  if (!titulo || !autor || !genero || !ano) {
    throw new Error(
      "Todos os campos (título, autor e gênero) são obrigatórios."
    );
  }

  try {
    const livroRef = await addDoc(collection(db, "livros"), {
      titulo,
      autor,
      genero,
      ano,
      disponivel: true,
    });
    console.log("Livro adicionado com ID:", livroRef.id);
    return livroRef.id;
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    throw new Error("Não foi possível adicionar o livro.");
  }
}

// Função para listar todos os livros disponíveis
export async function listarLivrosDisponiveis() {
  try {
    const querySnapshot = await getDocs(collection(db, "livros"));
    const livros = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((livro) => livro.disponivel); // Filtra apenas livros disponíveis
    return livros;
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    throw new Error("Não foi possível listar os livros.");
  }
}

// Alias para listar todos os livros (usando listarLivrosDisponiveis)
export const listarLivros = listarLivrosDisponiveis;

// Função para atualizar a disponibilidade de um livro
export async function atualizarDisponibilidadeLivro(idLivro, disponivel) {
  try {
    const livroRef = doc(db, "livros", idLivro);
    await updateDoc(livroRef, { disponivel });
    console.log(
      `Disponibilidade do livro com ID ${idLivro} atualizada para ${disponivel}`
    );
  } catch (error) {
    console.error("Erro ao atualizar disponibilidade do livro:", error);
    throw new Error("Não foi possível atualizar a disponibilidade do livro.");
  }
}

// Função para atualizar informações de um livro
export async function atualizarLivro(idLivro, novosDados) {
  try {
    const livroRef = doc(db, "livros", idLivro);
    await updateDoc(livroRef, novosDados);
    console.log(`Livro com ID ${idLivro} atualizado com sucesso.`);
  } catch (error) {
    console.error("Erro ao atualizar o livro:", error);
    throw new Error("Não foi possível atualizar o livro.");
  }
}

// Função para deletar um livro
export async function deletarLivro(idLivro) {
  try {
    const livroRef = doc(db, "livros", idLivro);
    await deleteDoc(livroRef);
    console.log(`Livro com ID ${idLivro} deletado com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar o livro:", error);
    throw new Error("Não foi possível deletar o livro.");
  }
}
