// Função async que transforma o corpo da requisição (req) em um objeto JSON acessível via req.body
export async function json(req, res) {
  // Cria um array vazio chamado buffers que vai armazenar pedaços (chunks) do corpo da requisição
  const buffers = [];

  // Percorre cada pedaço de dados da requisição (stream) e adiciona no array buffers
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Tenta transformar o conteúdo dos buffers em string e depois em objeto JSON
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    // Se não conseguir fazer o parse (ex: se não for um JSON válido), define req.body como null
    req.body = null;
  }

  // Define o cabeçalho da resposta como application/json (útil para indicar o tipo de retorno)
  res.setHeader("Content-type", "application/json");
}
