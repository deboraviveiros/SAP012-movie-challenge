/* Este é o módulo principal do seu projeto. Ele importa todos os outros módulos e é onde os eventos e manipulações de DOM do projeto serão construídos. 
Aqui, você pode definir manipuladores de eventos para interações do usuário, chamar funções de renderização dos módulos App.js e Details.js, 
e integrar a lógica de requisição definida em Requisition.js com a interface do usuário. */

import App from './components/App.js';
import movieDetails from './components/details.js';

/* Renderizar informações dos filmes na página inicial */
// Obtém o elemento com o ID 'root' e adiciona os filmes renderizados por App()
const movieList = App(); // Chama a função App() para obter o elemento HTML da lista de filmes
document.getElementById('root').appendChild(movieList); // Adiciona o elemento da lista de filmes ao elemento com id 'root'

const detailsElement = movieDetails(); // Chama a função movieDetails() para obter o elemento HTML dos detalhes do filme
document.getElementById('root').appendChild(detailsElement); // Adiciona o elemento dos detalhes do filme ao elemento com id 'root'

// Adiciona um event listener para o evento de carregamento da página
document.addEventListener('DOMContentLoaded', loadFirstPage);