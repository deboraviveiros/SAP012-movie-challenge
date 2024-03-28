import App from './components/App.js';
import renderMovies from './components/App.js';
import loadMovies from './components/App.js';

// import details from './components/details.js';


/* Renderizar informações dos filmes na página inicial */
document.getElementById('root').appendChild(App());

/* Evento de clique para acessar detalhes dos filmes */
const movieDetail = document.querySelector('.movie-container');
movieDetail.addEventListener('click', () => {

})

/* Paginação - Botões e Eventos */
let currentPage = 1;
let movieList = [];

const previewBtn = document.createElement('button');
previewBtn.textContent = 'Anterior';
previewBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderMovies(movieList);
    }
});
document.body.appendChild(previewBtn);

const nextBtn = document.createElement('button');
nextBtn.textContent = 'Próximo';
nextBtn.addEventListener('click', () => {
    const allPages = Math.ceil(movieList.length / allPages);
    if (currentPage < allPages) {
        currentPage++;
        renderMovies(movieList);
    }
});
document.body.appendChild(nextBtn);
/* pega a id root e dá um appendChild em App. o App é filho da root */

/* Para fazer:
- Implementar paginação (5 filmes por página);
- Construir detalhes dos filmes;
- Construir testes unitários;
- Corrigir estilização;
- Fazer deploy;

Se der tempo:
- Trabalhar responsividade;
- Implementar filtro e ordenação;
*/