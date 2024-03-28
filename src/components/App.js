const App = async () => {
  /* const App: Declara uma função assíncrona sem nome (uma função anônima). Funções assíncronas são úteis para lidar com operações assíncronas, 
  como requisições HTTP, de uma maneira mais concisa. */
  const options = {
    /* const options: Define as opções para a requisição HTTP, incluindo o método (GET), o cabeçalho (headers), que contém o tipo de conteúdo esperado (application/json) 
    e a chave de autenticação para a API do TMDB. */
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
    }
  };

  try {
    // Obtém a resposta da API do TMDB 
    /* try { ... } catch (error) { ... }: Estrutura de controle de fluxo que tenta executar um bloco de código. 
    Se ocorrer um erro durante a execução do bloco try, o controle é passado para o bloco catch, onde o erro é capturado e tratado. */
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&year=1987', options);
    // Extrai o JSON da resposta e guarda os dados em uma variável
    const data = await response.json();
    // Obtém apenas os filmes (results) da resposta e exibe os títulos e datas de lançamento
    /*  Extrai o JSON da resposta da requisição HTTP e o converte em um objeto JavaScript. 
    Mais uma vez, o await é usado para pausar a execução da função até que a promessa retorne um resultado. */
    return data.results;
    // Retorna apenas os filmes (results) da resposta da API do TMDB.
  } catch (error) {
    throw new Error("Ops! Filme queimado! Não é possível exibi-lo :'(");
    //Lança um erro se ocorrer algum problema durante a execução do código dentro do bloco try. Isso pode ser capturado por um bloco catch em um contexto de chamada.
  }
};

const allPages = 5;
let currentPage = 1;
let movieList = [];

// Função para renderizar os filmes na página
const renderMovies = (movies) => {
  // Cria um elemento <ul> para a lista de filmes
  const ul = document.createElement('ul');
  // Adiciona o <ul> ao final do corpo do documento HTML
  document.body.appendChild(ul);

  // Limpa a lista antes de renderizar os filmes da nova página
  ul.innerHTML = '';

  // Calcula os índices de início e fim da página atual
  const start = (currentPage - 1) * allPages;
  const end = currentPage * allPages;

  // Exibe apenas os filmes da página atual
  for (let i = start; i < end && i < movies.length; i++) {
    const movie = movies[i];
    // Cria um novo elemento de lista para cada filme
    const li = document.createElement('li');
    // Adiciona a classe 'movie-list' ao elemento <li>
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
  }
};

const loadMovies = async () => {
  // Declara uma função assíncrona chamada loadMovies. Essa função irá carregar os filmes e renderizá-los na página.
  try {
    /* Estrutura de controle de fluxo que tenta executar um bloco de código. Se ocorrer um erro durante a execução do bloco try, 
    o controle é passado para o bloco catch, onde o erro é capturado e tratado. */
    movieList = await App();
    // Tenta carregar a lista de filmes usando a função App. O await é usado para pausar a execução da função loadMovies até que a promessa retorne um resultado (ou erro).
    renderMovies(movieList);
    // Após carregar a lista de filmes com sucesso, chama a função renderMovies para renderizar os filmes na página.
  } catch (error) {
    // Se ocorrer um erro durante o carregamento dos filmes, exibe uma mensagem de erro
    document.body.textContent = "Ops! O filme queimou! Vamos tentar restaurá-lo, tente novamente em alguns instantes.";
  }
};
// Exporta a função loadMovies como padrão
export default loadMovies;


// const App = async () => {
//   let ul = document.createElement('ul');
//   document.body.appendChild(ul);
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGZkNWQ0OWI4YzE0MmM2MjlmOTA2YzhiODliMjZkYiIsInN1YiI6IjY1ZjVhNjIxM2MzYWIwMDE3ZGQwMjc2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k66Yx9thwDS90B8OzFnrwz8EqkzRrf7od4SG1Ip7Dx4'
//     }
//   };

//   try {
//     // Obtém a resposta da API do TMDB
//     const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&year=1987', options);
//     // Extrai o JSON da resposta e guarda os dados em uma variável
//     const data = await response.json();
//     // Obtém apenas os filmes (results) da resposta e exibe os títulos e datas de lançamento
//     const movies = data.results;
//     movies.forEach((movie) => {
//       // Cria um novo elemento de lista para cada filme
//       let li = document.createElement('li');
//       li.classList.add('movie-list');

//       // Cria a estrutura HTML para exibir as informações do filme
//       li.innerHTML = `
//         <div class="movie-container">
//           <div class="movie-info">
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster do Filme" class="movie-poster" />
//             <h2 class="title-year">${movie.title} (${movie.release_date})</h2>
//             <p class="popularity">${movie.vote_average}</p>
//           </div>
//         </div>
//       `;

//       // Adiciona o elemento de lista à lista UL
//       ul.appendChild(li);
//     });

//   } catch (error) {
//     // Se ocorrer um erro na busca dos filmes, exibe uma mensagem de erro
//     document.body.textContent = "Ops! O filme queimou! Vamos tentar restaurá-lo, tente novamente em alguns instantes.";
//   }
// };

// export default App;