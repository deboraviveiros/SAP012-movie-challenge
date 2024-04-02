/* Neste módulo, toda a lógica de requisição dos dados à API será construída. Aqui você pode definir funções para lidar com requisições HTTP, como GET, POST, PUT, DELETE, etc. 
Isso pode incluir a definição de URLs de API, parâmetros de solicitação, tratamento de respostas, etc. */

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Contador para o número total de solicitações feitas à API
let totalRequests = 0;

// Função para fazer uma requisição HTTP
const httpRequest = async (url, options) => {
    console.log('Fazendo requisição para:', url); // Log da URL da requisição
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

// Função para limpar a lista de filmes da página
const clearMovies = () => {
    const movieList = document.querySelector('.movie-list');
    if (movieList) {
        movieList.innerHTML = ''; // Remove todos os elementos dentro da lista de filmes
    }
};

const MIN_PAGE_NUMBER = 1; // Número mínimo da página
const MAX_PAGE_NUMBER = 10; // Número máximo da página

// Função para requisitar a lista de filmes de todas as páginas dentro de um intervalo específico
const requisition = async () => {
    console.log('Iniciando requisição dos filmes...');
    // Array para armazenar os filmes de todas as páginas
    const allMovies = [];

    try {
        // Limpa a página antes de carregar os novos filmes
        clearMovies();

        // Faz um loop sobre todas as páginas no intervalo definido
        for (let pageNumber = MIN_PAGE_NUMBER; pageNumber <= MAX_PAGE_NUMBER; pageNumber++) {
            // Construindo a URL para requisitar a lista de filmes da página atual
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${pageNumber}&sort_by=popularity.desc&year=1987`;
            console.log('Requisitando página', pageNumber, 'de filmes:', url);

            // Fazendo a requisição HTTP para obter os filmes da página atual
            const pageData = await httpRequest(url, options);
            allMovies.push(...pageData.results);

            console.log('Requisição da página', pageNumber, 'de filmes concluída.');
        }

        // Retornando a lista de filmes de todas as páginas no intervalo definido
        return allMovies;
    } catch (error) {
        // Lançando um erro se houver algum problema na requisição
        throw new Error(`Erro ao buscar filmes: ${error.message}`);
    }
};


// Função para requisitar os detalhes de um filme específico
const fetchMovieDetails = async (movieId) => {
    try {
        // Limpa a página antes de carregar os detalhes do filme
        clearMovies();
        // Construindo a URL para requisitar os detalhes do filme
        const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%3Balternative_titles%3Bcredits&language=pt-BR`;
        console.log('Requisitando detalhes do filme com ID', movieId, 'em:', url); // Log da URL da requisição dos detalhes do filme
        // Fazendo a requisição e retornando os dados da resposta no formato JSON
        const details = await httpRequest(url, options);
        console.log('Detalhes do filme com ID', movieId, 'recebidos:', details); // Log dos detalhes do filme recebidos
        return details;
    } catch (error) {
        // Lançando um erro se houver algum problema na requisição
        throw new Error(`Erro ao obter detalhes do filme com ID ${movieId}: ${error.message}`);
    }
};

// Exportando as funções de requisição para serem usadas em outros arquivos
export { requisition, fetchMovieDetails, MAX_PAGE_NUMBER, MIN_PAGE_NUMBER };