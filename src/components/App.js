const App = async () => {
  let ul = document.createElement('ul');
  document.body.appendChild(ul);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
    }
  };

  try {
    // Obtém a resposta da API do TMDB
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc', options);
    // Extrai o JSON da resposta e guarda os dados em uma variável
    const data = await response.json();
    // Obtém apenas os filmes (results) da resposta e exibe os títulos e datas de lançamento
    const movies = data.results;
    movies.forEach((movie) => {
      // Cria um novo elemento de lista para cada filme
      let li = document.createElement('li');
      li.classList.add('movie-list');

      // Cria a estrutura HTML para exibir as informações do filme
      li.innerHTML = `
        <div class="movie-container">
          <div class="movie-info">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster do Filme" class="movie-poster" />
            <h2 class="title-year">${movie.title} (${movie.release_date})</h2>
            <p class="popularity">${movie.vote_average}</p>
          </div>
        </div>
      `;

      // Adiciona o elemento de lista à lista UL
      ul.appendChild(li);
    });

  } catch (error) {
    // Se ocorrer um erro na busca dos filmes, exibe uma mensagem de erro
    document.body.textContent = "Ops! O filme queimou! Vamos tentar restaurá-lo, tente novamente em alguns instantes.";
  }
};

// Chama a função App para iniciar a busca e exibição dos filmes
App();

export default App;


/* parecido com o view - ideia de componentes - um pedaço de interface - 
aqui teremos que renderizar os filmes, usar o fetch - pegar os dados para printar na tela

entendeu a estrutura, chama o endpoint pra renderizar. faz o teste unitário 

Fetch Request TMDB
header da requisição
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


// Função async para buscar informações dos filmes


// Executa a busca assim que o código for carregado
fetchMovies(); chamar dentro do método principal

// Cria um novo elemento HTML <div>. Você pode alterar o tipo de elemento se necessário.
  const el = document.createElement('div');

  // Define a classe CSS do elemento <div> como "App". Você pode alterar essa classe para estilizar o elemento de maneiras diferentes.
  el.className = 'App';

  // Define o texto dentro do elemento <div> como "Hola mundo!". Você pode alterar o texto conforme sua necessidade.
  el.textContent = 'Hola mundo!';

  // Retorna o elemento <div> configurado. Normalmente, você não precisa alterar essa linha.
  return el;

const movieElement = document.createElement('div');
      movieElement.textContent = `${movie.title} (${movie.release_date})`;
      document.body.appendChild(movieElement); // precisa retornar algo para usar no App.js. ao invés de dar append no body, dar append em uma div fora do for / montar o html e dar um return
    


*/