const detailsPokemons = document.getElementById('poke-details')

const PokemonId = () =>
  new URLSearchParams(globalThis.location.search).get('id')

const Pokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  return await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error('error fetching pokemon details:', error))
}

const renderPokemon = (pokemon) => {
  const imgSrc =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    ''

  detailsPokemons.innerHTML = `
    <div class="detail">
      <h1>${pokemon.name}</h1>
      <div class="content">
        <img src="${imgSrc}" alt="${pokemon.name}">
        <div class="info">
          <div class="row"><h3>ID:</h3><span>${pokemon.id}</span></div>
          <div class="row"><h3>Altura:</h3><span>${
            pokemon.height / 10
          } m</span></div>
          <div class="row"><h3>Peso:</h3><span>${
            pokemon.weight / 10
          } kg</span></div>
          <div class="row"><h3>Tipos:</h3>
            <div class="types">
              ${pokemon.types
                .map(
                  (typeInfo) =>
                    `<span class="type">${typeInfo.type.name}</span>`
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
      <a href="pokemonsEvolutions.html?id=${
        pokemon.id
      }" class="btn">Mostrar Evoluciones</a>
    </div>
  `
}

const init = async () => {
  const id = PokemonId()
  if (!id) {
    detailsPokemons.innerHTML = '<h1>No se encontró el pokemon</h1>'
    return
  }
  const pokemon = await Pokemon(id)
  if (pokemon) renderPokemon(pokemon)
}

init()
