/* Este módulo é destinado à construção do HTML para visualização dos detalhes importados na API. 
Aqui, você terá funções para exibir informações mais detalhadas sobre os itens apresentados na interface, como uma visualização expandida ou específica de um item. */
const movieDetails = (details) => {
    // Limpa o conteúdo do elemento onde os detalhes serão exibidos
    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.innerHTML = '';

    // Constrói o HTML dos detalhes do filme usando template strings
    const expandDetails = `
    <dl>
        <dt>Título</dt>
        <dd><h2 class="title">${details.title}</h2></dd>
        <dt>Data de Lançamento</dt>
        <dd><h3 class="release_date">${details.release_date}</h3></dd>
        <dt>Duração</dt>
        <dd><p class="runtime">${details.runtime} minutos</p></dd>
        <dt>Sinopse</dt>
        <dd><p class="overview">${details.overview}</p></dd>       
        <dt>Gêneros</dt>
        <dd><p class="genres">${details.genres.map(genre => genre.name).join(', ')}</p></dd>        
        <dt>Avaliação</dt>
        <dd><p class="votes">${details.vote_average}</p></dd>
    </dl>
    `;

    // Define o HTML gerado dentro do container de detalhes
    detailsContainer.innerHTML = expandDetails;
};

export default movieDetails;