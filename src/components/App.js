const App = () => {
  const el = document.createElement('div');

  el.className = 'App';
  el.textContent = 'Hola mundo!';

  return el;
};

export default App;

/* parecido com o view - ideia de componentes - um pedaço de interface - 
aqui teremos que renderizar os filmes, usar o fetch - pegar os dados para printar na tela

entendeu a estrutura, chama o endpoint pra renderizar. faz o teste unitário */