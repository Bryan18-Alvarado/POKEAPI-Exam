const listPokemonNames = document.getElementById('name-pokemon')

const getPokemonNames = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1328`
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log('Error fetching pokemos:', error))
}

const renderPokemonNames = (pokemons) => {
  listPokemonNames.innerHTML = ''
  let html = ''
  pokemons.results.forEach((pokemon) => {
    html += `<div class="card">
                <div class="margin-10">
                    <span onclick="openPokemon(${pokemon.name})">
                    <h3>${pokemon.name}</h3>
                  </span>
                </div>
              </div>`
  })
  listPokemonNames.innerHTML = html
}

const openPokemonNames = async () => {
  const pokemons = await getPokemonNames()
  renderPokemonNames(pokemons)
}
openPokemonNames()
