// Elementos do DOM
const addBookForm = document.getElementById("addBookForm");
const feedback = document.getElementById("feedback");
const loading = document.getElementById("loading");
const bookList = document.getElementById("bookList");

// Função para exibir mensagens de feedback
function showFeedback(message, type = "success") {
  feedback.textContent = message;
  feedback.className = `alert alert-${type}`;
}

// Função para carregar e exibir a lista de livros
async function loadBooks() {
  try {
    loading.classList.remove("d-none");
    const response = await fetch("http://localhost:3000/api/livros"); // Chamada à API
    if (!response.ok) {
      throw new Error("Erro ao carregar livros.");
    }
    const livros = await response.json();
    bookList.innerHTML = ""; // Limpa a lista para evitar duplicação
    if (livros.length === 0) {
      showFeedback("Nenhum livro disponível no momento.", "info");
    } else {
      livros.forEach((livro) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>${livro.titulo}</strong> por ${livro.autor} (${
          livro.ano
        }) - Gênero: ${livro.genero}
          <br>Disponível: ${livro.disponivel ? "Sim" : "Não"}
          <button onclick="toggleDisponibilidade('${livro.id}', ${
          livro.disponivel
        })">
            ${
              livro.disponivel
                ? "Marcar como indisponível"
                : "Marcar como disponível"
            }
          </button>
          <button onclick="deleteBook('${livro.id}')">Deletar</button>
        `;
        bookList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    showFeedback("Erro ao carregar livros.", "danger");
  } finally {
    loading.classList.add("d-none");
  }
}

// Função para adicionar um livro
addBookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const ano = document.getElementById("ano").value;

  if (!titulo || !autor || !genero || !ano) {
    showFeedback("Todos os campos são obrigatórios!", "danger");
    return;
  }

  try {
    loading.classList.remove("d-none");
    const response = await fetch("http://localhost:3000/api/livros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor, genero, ano: parseInt(ano, 10) }),
    });
    if (!response.ok) throw new Error("Erro ao adicionar livro.");
    showFeedback("Livro adicionado com sucesso!");
    addBookForm.reset();
    loadBooks(); // Atualiza a lista de livros
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    showFeedback("Erro ao adicionar livro.", "danger");
  } finally {
    loading.classList.add("d-none");
  }
});

// Função para alternar a disponibilidade de um livro
async function toggleDisponibilidade(id, disponivelAtual) {
  try {
    loading.classList.remove("d-none");
    const response = await fetch(
      `http://localhost:3000/api/livros/${id}/disponibilidade`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponivel: !disponivelAtual }),
      }
    );
    if (!response.ok) throw new Error("Erro ao atualizar disponibilidade.");
    showFeedback("Disponibilidade do livro atualizada!");
    loadBooks();
  } catch (error) {
    console.error("Erro ao atualizar disponibilidade:", error);
    showFeedback("Erro ao atualizar disponibilidade.", "danger");
  } finally {
    loading.classList.add("d-none");
  }
}

// Função para deletar um livro
async function deleteBook(id) {
  try {
    loading.classList.remove("d-none");
    const response = await fetch(`http://localhost:3000/api/livros/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar livro.");
    showFeedback("Livro deletado com sucesso!");
    loadBooks();
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    showFeedback("Erro ao deletar livro.", "danger");
  } finally {
    loading.classList.add("d-none");
  }
}

// Carrega a lista de livros ao iniciar
loadBooks();
