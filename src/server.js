// Importa uma biblioteca do próprio Node para criar servidores HTTP.
import http from "node:http";

// Importa o middleware personalizado para tratar o corpo da requisição como JSON.
import { json } from "./middlewares/json.js";

// Cria um array vazio chamado users que vai armazenar os usuários temporariamente em memória.
const users = [];

// Cria o servidor com uma função assíncrona que recebe os dados da requisição (req) e da resposta (res).
const server = http.createServer(async (req, res) => {
  // Faz a desestruturação da req para extrair apenas o método (method) e a URL da requisição (url).
  const { method, url } = req;

  // Aguarda o middleware json terminar de processar o corpo da requisição e transformar em objeto JavaScript.
  await json(req, res);

  // Se o método for GET e a URL for /users, retorna todos os usuários no formato JSON.
  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json") // Define o tipo de conteúdo como JSON.
      .end(JSON.stringify(users)); // Finaliza a resposta com o array de usuários convertido para string.
  }

  // Se o método for POST e a URL for /users, cria um novo usuário com os dados enviados no corpo da requisição.
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body; // Extrai o nome e o e-mail do corpo da requisição.

    users.push({
      id: 1, // Define o ID manualmente como 1 (poderia ser dinâmico depois).
      name,
      email,
    });

    return res.writeHead(201).end(); // Retorna status 201 (Criado) e finaliza a resposta.
  }

  // Se nenhuma rota for atendida acima, retorna 404 (Não encontrado).
  return res.writeHead(404).end();
});

// Faz o servidor escutar na porta 3333.
server.listen(3333);
