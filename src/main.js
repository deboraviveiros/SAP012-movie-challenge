/* Este é o módulo principal do seu projeto. Ele importa todos os outros módulos e é onde os eventos e manipulações de DOM do projeto serão construídos. 
Aqui, você pode definir manipuladores de eventos para interações do usuário, chamar funções de renderização dos módulos App.js e Details.js, 
e integrar a lógica de requisição definida em Requisition.js com a interface do usuário. */

import App from './components/App.js';
import { requisition, fetchMovieDetails } from './components/Requisition.js';
import movieDetails from './components/details.js';

/* Renderizar informações dos filmes na página inicial */
// Obtém o elemento com o ID 'root' e adiciona os filmes renderizados por App()
const movieList = App(); // Chama a função App() para obter o elemento HTML da lista de filmes
document.getElementById('root').appendChild(movieList); // Adiciona o elemento da lista de filmes ao elemento com id 'root'

const detailsElement = movieDetails(); // Chama a função movieDetails() para obter o elemento HTML dos detalhes do filme
document.getElementById('root').appendChild(detailsElement); // Adiciona o elemento dos detalhes do filme ao elemento com id 'root'
// Função para adicionar evento de clique aos filmes

// Função principal
const main = async () => {
    try {
        // Obtém a lista de filmes
        const movies = await requisition();
        // Adiciona evento de clique aos filmes
        movieClick(movies);
    } catch (error) {
        console.error(error.message);
    }
};

// Chama a função principal ao carregar a página
window.addEventListener('DOMContentLoaded', main);

const movieClick = (movies) => {
    // Itera sobre cada filme na lista
    movies.forEach(movie => {
        // Seleciona o elemento do filme pelo ID (você precisa ajustar isso conforme a estrutura do seu HTML)
        const movieElement = document.getElementById(`movie-${movie.id}`);
        // Adiciona o evento de clique ao elemento do filme
        movieElement.addEventListener('click', async () => {
            try {
                // Obtém os detalhes do filme clicado
                const details = await fetchMovieDetails(movie.id);
                // Renderiza os detalhes do filme na interface do usuário
                movieDetails(details);
            } catch (error) {
                console.error(error.message);
            }
        });
    });
};

/* Evento de clique para acessar detalhes dos filmes */
// Define um evento de clique para o elemento com a classe 'movie-container'
// Preciso:
// 1) adicionar evento de clique aos cards;
// 2) abre página com o poster maior e detalhes, como: sinopse, elenco e outros.
// 3) tem um botão de voltar para a lista;

/* pega a id root e dá um appendChild em App. o App é filho da root */

/* Para fazer:
- Implementar paginação;
- Construir detalhes dos filmes;
- Construir testes unitários;
- Corrigir estilização;
- Fazer deploy;

Se der tempo:
- Trabalhar responsividade;
- Implementar filtro e ordenação;
*/