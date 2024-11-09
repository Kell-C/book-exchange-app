// src/firebase/auth.mjs
import { auth } from "./firebaseConfig.mjs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Função para registrar um novo usuário
export async function registrarUsuario(email, senha) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    console.log("Usuário registrado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

// Função para fazer login de um usuário
export async function loginUsuario(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário logado:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

// Função para fazer logout de um usuário
export async function logoutUsuario() {
  try {
    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

// Função para recuperar a senha do usuário
export async function recuperarSenha(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Email de recuperação de senha enviado para:", email);
  } catch (error) {
    console.error("Erro ao enviar email de recuperação de senha:", error);
    throw error;
  }
}
