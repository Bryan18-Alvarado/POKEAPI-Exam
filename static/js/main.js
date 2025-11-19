const listOnePokemon = document.getElementById('random-pokemons')

const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 1025) + 1
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error al cargar los pokemones:', error)
  }
}

const renderPokemons = (pokemons) => {
  listOnePokemon.innerHTML = `
    <div class="cards-container">
      ${pokemons
        .map(
          (pokemon) => `
        <div class="card">
          <h2>${pokemon.name}</h2>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
          
        </div>
      `
        )
        .join('')}
        <div>
          <button>
          <a href="./page/AllPokemons.html">Ver todos los pokemons</a>
          </button>
        </div>
    </div>
  `
}

const openPokemons = async () => {
  const pokemons = await Promise.all(
    Array.from({ length: 6 }, () => getRandomPokemon())
  )
  renderPokemons(pokemons)
}

openPokemons()
