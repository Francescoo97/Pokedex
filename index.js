let pokemon;

// Dati JSON dei Pokèmon e genera card iniziali
fetch("./pokemon.json-master/pokedex.json")
  .then((response) => response.json())
  .then((data) => {
    pokemon = data.slice(0, 151);
    console.log(pokemon);
    generaCards(pokemon);
  })
  .catch((err) => console.log("errore", err));

function generaCards(listaPokemon) {
  const pokedex = document.getElementById("pokedex");
  while (pokedex.firstChild) {
    pokedex.removeChild(pokedex.firstChild);
  }

  // Per ogni Pokèmon crea una card
  listaPokemon.forEach((pokemon) => {
    const card = `<div class="card">
        <img src="pokemon.json-master/images/${formatID(pokemon.id)}.png">
        <h3>${pokemon.name.english}</h3>
        </div>`;
    pokedex.insertAdjacentHTML("beforeend", card);
  });
}

// Formatta l'ID in 3 cifre
function formatID(id) {
  if (id.toString().length == 1) return `00${id}`;
  if (id.toString().length == 2) return `0${id}`;
  return id;
}

// Ricerca dinamica
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
  const valore = e.target.value.toLowerCase();
  const pokemonFiltrati = pokemon.filter((pkm) => {
    return pkm.name.english.toLowerCase().startsWith(valore);
  });
  generaCards(pokemonFiltrati);
});
