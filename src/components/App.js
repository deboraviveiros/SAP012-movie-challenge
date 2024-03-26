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
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&year=1987', options);
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

export default App;