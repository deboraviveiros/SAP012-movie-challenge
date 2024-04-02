/* Este é o módulo principal do seu projeto. Ele importa todos os outros módulos e é onde os eventos e manipulações de DOM do projeto serão construídos. 
Aqui, você pode definir manipuladores de eventos para interações do usuário, chamar funções de renderização dos módulos App.js e Details.js, 
e integrar a lógica de requisição definida em Requisition.js com a interface do usuário. */
import App from './components/App.js';
import movieDetails from './components/details.js';
import { MIN_PAGE_NUMBER, MAX_PAGE_NUMBER } from './components/Requisition.js';

let currentPage = MIN_PAGE_NUMBER;

// Função principal para carregar os filmes na página inicial
const loadMovies = async () => {
    try {
        const appElement = await App(currentPage); // Passa currentPage para App para carregar os filmes da página atual
        if (appElement instanceof Node) {
            document.getElementById('root').innerHTML = ''; // Limpa o conteúdo atual antes de adicionar os novos filmes
            document.getElementById('root').appendChild(appElement); // Adiciona os filmes da página atual ao DOM
        } else {
            console.error('Ocorreu um erro ao renderizar os filmes.');
        }
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
};

// Adicionamos uma variável global para controlar se uma requisição está em andamento
let requestInProgress = false;

// Função para fazer a requisição dos filmes da página especificada
const requestMovies = async (pageNumber) => {
    if (requestInProgress) return; // Se uma requisição já estiver em andamento, não faz nada
    requestInProgress = true; // Marca que uma requisição está em andamento
    try {
        // Solicita as informações dos filmes da página atual à API usando a função do módulo Requisition.js
        const movieData = await App.requisition(pageNumber);
        console.log('Filmes da página', pageNumber, ':', movieData); // Exibe os dados dos filmes obtidos
        // Marca que a requisição foi concluída
        requestInProgress = false;
        return movieData;
    } catch (error) {
        console.error('Erro ao requisitar filmes:', error);
        // Marca que a requisição foi concluída com erro
        requestInProgress = false;
        throw error;
    }
};

// Função para criar botões de navegação
const createNavigationButton = (text, onClick) => {
    const button = document.createElement('button');
    button.classList.add('navigation-button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
};
// Função para atualizar o estado dos botões de navegação
const updateNavigationButtons = () => {
    const previousButton = document.getElementById('previousButton');
    const homeButton = document.getElementById('homeButton');
    const nextButton = document.getElementById('nextButton');

    previousButton.disabled = currentPage === MIN_PAGE_NUMBER;
    homeButton.disabled = currentPage === MIN_PAGE_NUMBER;
    nextButton.disabled = currentPage === MAX_PAGE_NUMBER;
};

// Função para navegar para uma página específica
const goToPage = async (pageNumber) => {
    currentPage = Math.max(MIN_PAGE_NUMBER, Math.min(pageNumber, MAX_PAGE_NUMBER));
    console.log('Navegando para a página:', currentPage);
    // Aguarda a conclusão da requisição antes de atualizar a página
    try {
        await requestMovies(currentPage);
        loadMovies();
        updateNavigationButtons();
    } catch (error) {
        console.error('Erro ao navegar para a página:', error);
    }
};

// Função para adicionar os botões de navegação à página
const addNavigationButtons = () => {
    const navigationContainer = document.createElement('div');
    navigationContainer.classList.add('navigation-container');

    const previousButton = createNavigationButton('Anterior', () => goToPage(currentPage - 1));
    previousButton.id = 'previousButton';
    navigationContainer.appendChild(previousButton);

    const homeButton = createNavigationButton('Página inicial', () => goToPage(MIN_PAGE_NUMBER));
    homeButton.id = 'homeButton';
    navigationContainer.appendChild(homeButton);

    const nextButton = createNavigationButton('Próximo', () => goToPage(currentPage + 1));
    nextButton.id = 'nextButton';
    navigationContainer.appendChild(nextButton);

    document.body.appendChild(navigationContainer);
};

// Função para lidar com o redirecionamento para os detalhes do filme
const redirectToMovieDetails = async (movieId) => {
    try {
        await movieDetails.fetchMovieDetails(movieId);
        document.getElementById('root').appendChild(await movieDetails());
    } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
    }
};

// Função para adicionar event listeners aos elementos da lista de filmes
const addMovieClickListener = () => {
    const movieElements = document.querySelectorAll('.movie-container');
    movieElements.forEach((movieElement) => {
        movieElement.addEventListener('click', () => {
            const movieId = movieElement.dataset.movieId;
            redirectToMovieDetails(movieId);
        });
    });
};

// Chamada inicial para carregar os filmes na página inicial
loadMovies();

// Adiciona os botões de navegação e os event listeners
addNavigationButtons();
addMovieClickListener();
