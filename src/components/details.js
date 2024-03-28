/* Este módulo é destinado à construção do HTML para visualização dos detalhes importados na API. 
Aqui, você terá funções para exibir informações mais detalhadas sobre os itens apresentados na interface, como uma visualização expandida ou específica de um item. */
const movieDetails = (details) => {
    // Limpa o conteúdo do elemento onde os detalhes serão exibidos
    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.innerHTML = '';

    // Constrói o HTML dos detalhes do filme usando template strings
    const expandDetails = `
        <h2>${details.title}</h2>
        <p>${details.overview}</p>
        <p>Data de Lançamento: ${details.release_date}</p>
        <p>Gêneros: ${details.genres.map(genre => genre.name).join(', ')}</p>
        <p>Duração: ${details.runtime} minutos</p>
        <p>Avaliação: ${details.vote_average}</p>
    `;

    // Define o HTML gerado dentro do container de detalhes
    detailsContainer.innerHTML = expandDetails;
};

export default movieDetails;