/* Neste módulo, toda a lógica de requisição dos dados à API será construída. Aqui você pode definir funções para lidar com requisições HTTP, como GET, POST, PUT, DELETE, etc. 
Isso pode incluir a definição de URLs de API, parâmetros de solicitação, tratamento de respostas, etc. */

// Definindo a chave de acesso à API
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'; // Substitui 'sua_chave_de_acesso'

// Contador para o número total de solicitações feitas à API
let totalRequests = 0;

// Função para fazer uma requisição HTTP
const httpRequest = async (url, options) => {
    // Fazemos a requisição HTTP
    const response = await fetch(url, options);

    // Verificamos se a requisição foi bem-sucedida
    if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
    }

    // Incrementando o contador de solicitações
    totalRequests++;

    // Verificando se o limite de solicitações diárias foi excedido
    if (totalRequests >= 1000) {
        throw new Error('Limite de solicitações diárias excedido');
    }

    // Retornando os dados da resposta da requisição no formato JSON
    return response.json();
};

// Função para requisitar a lista de filmes
const requisition = async () => {
    // Array para armazenar os filmes
    const movies = [];
    let page = 1;
    let totalPages = 1;

    try {
        // Enquanto houver páginas de resultados e o limite de solicitações diárias não for excedido
        while (page <= totalPages && totalRequests < 1000) {
            // Construindo a URL para requisitar a lista de filmes
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&year=1987&api_key=${API_KEY}`;
            // Fazendo a requisição e obtendo os dados da resposta
            const data = await httpRequest(url);
            // Atualizando o número total de páginas de resultados
            totalPages = data.total_pages;
            // Adicionando os filmes da página atual ao array de filmes
            movies.push(...data.results);
            // Indo para a próxima página de resultados
            page++;
        }
        // Retornando a lista completa de filmes
        return movies;
    } catch (error) {
        // Lançando um erro se houver algum problema na requisição
        throw new Error(`Erro ao buscar filmes: ${error.message}`);
    }
};

// Função para requisitar os detalhes de um filme específico
const fetchMovieDetails = async (movieId) => {
    try {
        // Construindo a URL para requisitar os detalhes do filme
        const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%3Balternative_titles%3Bcredits&language=pt-BR&api_key=${API_KEY}`;
        // Fazendo a requisição e retornando os dados da resposta no formato JSON
        return httpRequest(url);
    } catch (error) {
        // Lançando um erro se houver algum problema na requisição
        throw new Error(`Erro ao obter detalhes do filme com ID ${movieId}: ${error.message}`);
    }
};

// Exportando as funções de requisição para serem usadas em outros arquivos
export { requisition, fetchMovieDetails };