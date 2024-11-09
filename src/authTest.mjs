// authTest.mjs
import {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  recuperarSenha,
} from "./firebase/auth.mjs";
import {
  adicionarLivro,
  listarLivros,
  atualizarLivro,
  deletarLivro,
} from "./firebase/firestore.mjs";

async function testeRegistro() {
  try {
    const email = "usuario_teste2@example.com";
    const senha = "senhaSegura123";
    const usuario = await registrarUsuario(email, senha);
    console.log("Usuário registrado com sucesso:", usuario);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Usuário já registrado, pulando registro.");
    } else {
      console.error("Erro ao registrar usuário:", error);
    }
  }
}

async function testeLogin() {
  try {
    const email = "usuario_teste2@example.com";
    const senha = "senhaSegura123";
    const usuario = await loginUsuario(email, senha);
    console.log("Usuário logado com sucesso:", usuario);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
}

async function testeAdicionarLivro() {
  try {
    const titulo = "Livro de Teste";
    const autor = "Autor Teste";
    const genero = "Genero";
    const ano = 2024;

    const docRef = await adicionarLivro(titulo, autor, genero, ano);
    console.log("Livro adicionado com sucesso:", docRef);
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
  }
}

async function testeListarLivros() {
  try {
    const livros = await listarLivros();
    console.log("Livros encontrados:", livros);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
  }
}

async function testeAtualizarLivro() {
  try {
    const idLivro = "yEBA3HPUaLWMl2Z1SBMb"; // Substitua pelo ID real
    const dadosAtualizados = {
      titulo: "Livro de Teste Atualizado",
      ano: 2025,
    };
    await atualizarLivro(idLivro, dadosAtualizados);
    console.log("Livro atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
  }
}

async function testeDeletarLivro() {
  try {
    const idLivro = "yEBA3HPUaLWMl2Z1SBMb"; // Substitua pelo ID real
    await deletarLivro(idLivro);
    console.log("Livro deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
  }
}

async function testeRecuperarSenha() {
  try {
    const email = "usuario_teste@example.com";
    await recuperarSenha(email);
    console.log("E-mail de recuperação enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação:", error);
  }
}

async function testeLogout() {
  try {
    await logoutUsuario();
    console.log("Usuário deslogado com sucesso");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

async function runTests() {
  await testeRegistro();
  await testeLogin();
  await testeAdicionarLivro();
  await testeListarLivros();
  await testeAtualizarLivro();
  await testeDeletarLivro();
  await testeRecuperarSenha();
  await testeLogout();
}

runTests();
