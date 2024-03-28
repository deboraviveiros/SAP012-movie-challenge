/* Neste módulo, toda a lógica de requisição dos dados à API será construída. Aqui você pode definir funções para lidar com requisições HTTP, como GET, POST, PUT, DELETE, etc. 
Isso pode incluir a definição de URLs de API, parâmetros de solicitação, tratamento de respostas, etc. */

const requisition = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
        }
    };

    const movies = [];
    let page = 1;
    let totalPages = 1; // Inicializa totalPages com um valor que será atualizado após a primeira requisição

    try {
        // Enquanto houver páginas para buscar
        while (page <= totalPages) {
            // Obtém a resposta da API do TMDB para a página atual
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&year=1987`, options);
            // Extrai o JSON da resposta
            const data = await response.json();
            // Atualiza o total de páginas (total_pages) com base nos dados retornados pela primeira requisição
            if (page === 1) {
                totalPages = data.total_pages;
            }
            // Adiciona os filmes da página atual ao array 'movies'
            movies.push(...data.results);
            // Incrementa o número da página para a próxima requisição
            page++;
        }
        // Retorna todos os filmes obtidos
        return movies;
    } catch (error) {
        // Se ocorrer um erro na busca dos filmes, lança uma exceção
        throw new Error("Não foi possível revelar os filmes, erh... resultados. Tente novamente mais tarde!");
    }
};

const fetchMovieDetails = async (movieId) => {
    try {
        // Definimos as opções da requisição
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
            }
        };

        // Fazemos a requisição para obter os detalhes do filme específico
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%3Balternative_titles%3Bcredits&language=pt-BR'`, options);

        // Verificamos se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao obter detalhes do filme');
        }

        // Retornamos os detalhes do filme em formato JSON
        return response.json();
    } catch (error) {
        // Se ocorrer um erro, lançamos uma exceção
        throw new Error(`Erro ao obter detalhes do filme com ID ${movieId}: ${error.message} `);
    }
};

// Exportamos a função fetchMovieDetails para ser usada em outros arquivos
export { requisition, fetchMovieDetails };