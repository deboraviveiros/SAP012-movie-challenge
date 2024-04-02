/* Este módulo é responsável pela construção do HTML para visualização dos dados importados na API. 
Ele conterá funções para renderizar os dados principais na interface do usuário. */
import { requisition } from './Requisition.js';

const App = async (pageNumber) => {
  try {
    // Obtemos a lista de filmes da API utilizando a função requisition
    const movies = await requisition(pageNumber);

    // Cria a lista UL onde os filmes serão exibidos
    const ul = document.createElement('ul');
    ul.classList.add('movie-list');

    // Mapeia cada filme para criar elementos <li>
    const movieItems = movies.map((movie) => `
      <li class="movie-container">
        <div class="movie-info">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster do Filme" class="movie-poster" />
          <h2 class="title-year">${movie.title} (${movie.release_date})</h2>
          <p class="popularity">${movie.vote_average}</p>
        </div>
      </li>
    `);

    // Adiciona os elementos <li> à lista <ul>
    ul.innerHTML = movieItems.join('');
    return ul;
  } catch (error) {
    console.error('Erro ao renderizar os filmes:', error);
    return null;
  }
};

export default App;