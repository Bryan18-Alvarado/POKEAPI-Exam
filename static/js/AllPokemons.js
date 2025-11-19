const listPokemonNames = document.getElementById('name-pokemon')

const getPokemonNames = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1328`
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log('Error fetching pokemos:', error))
}

const renderPokemons = (pokemons) => {
  listPokemonNames.innerHTML = pokemons.results
    .map((pokemon) => {
      const id = pokemon.url.split('/').filter(Boolean).pop()
      return `<div class="list-item">
              <a href="DetailsPokemon.html?id=${id}">#${id} - ${pokemon.name}</a>
            </div>`
    })
    .join('')
}

const init = async () => {
  const pokemons = await getPokemonNames()
  renderPokemons(pokemons)
}

init()
