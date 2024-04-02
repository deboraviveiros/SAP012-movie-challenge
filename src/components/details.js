/* Este módulo é destinado à construção do HTML para visualização dos detalhes importados na API. 
Aqui, você terá funções para exibir informações mais detalhadas sobre os itens apresentados na interface, como uma visualização expandida ou específica de um item. */

import { fetchMovieDetails } from './Requisition.js';

const movieDetails = async () => {
    try {
        // Obtém o elemento onde os detalhes serão exibidos
        let detailsContainer = document.getElementById('movie-details');

        // Verifica se o elemento detailsContainer existe
        if (!detailsContainer) {
            // Se não existir, criamos dinamicamente o elemento
            detailsContainer = document.createElement('div');
            detailsContainer.id = 'movie-details';
            // Adiciona o elemento ao DOM
            document.getElementById('root').appendChild(detailsContainer);
        } else {
            // Se o elemento existir, limpa seu conteúdo
            detailsContainer.innerHTML = '';
        }

        // Obtemos os detalhes do da API utilizando a função fetchMovieDetails
        console.log('Obtendo detalhes do filme...');
        const fetchDetails = await fetchMovieDetails();

        // Verifica se fetchDetails é um objeto válido
        if (typeof fetchDetails !== 'object' || Array.isArray(fetchDetails)) {
            throw new Error('Os detalhes do filme não foram retornados como um objeto.');
        }

        // Constrói o HTML dos detalhes do filme usando template strings
        console.log('Construindo HTML dos detalhes do filme...');
        const detailsArray = fetchDetails.map((details) => `
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
    `);
        // Converter o array em uma string HTML
        const detailsString = detailsArray.join('');

        // Define o HTML gerado dentro do container de detalhes
        detailsContainer.innerHTML = detailsString;
        console.log('Detalhes do filme renderizados com sucesso!');
    } catch (error) {
        console.error('Erro ao renderizar os filmes:', error);
    }
};

export default movieDetails;