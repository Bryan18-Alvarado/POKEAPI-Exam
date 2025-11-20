const evoContainer = document.getElementById('evolution-container')

const PokemonIdUrl = () => new URLSearchParams(window.location.search).get('id')

const fetchPokemonData = async (pokeId) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
  return res.json().catch(() => console.error('Error fetching Pokémon data'))
}

const fetchSpeciesData = async (speciesUrl) => {
  const res = await fetch(speciesUrl)
  return res.json().catch(() => console.error('Error fetching species data'))
}

const fetchEvolutionChain = async (chainUrl) => {
  const res = await fetch(chainUrl)
  return res.json().catch(() => console.error('Error fetching evolution chain'))
}

const extractEvolutionList = (chainNode) => {
  const list = []
  const traverseChain = (node) => {
    list.push({
      name: node.species.name,
      url: node.species.url,
    })
    node.evolves_to.forEach((next) => traverseChain(next))
  }
  traverseChain(chainNode)
  return list
}

const fetchAllEvolutionDetails = async (evolutions) => {
  const promises = evolutions.map(async (evo) => {
    const id = evo.url.split('/').slice(-2, -1)[0]
    return fetchPokemonData(id)
  })
  return Promise.all(promises)
}

const renderEvolutionChain = (evolutionDetails) => {
  evoContainer.innerHTML = `
    <div class="chain-wrapper">
      ${evolutionDetails
        .map(
          (poke, idx) => `
        <div class="evolution-block">
          <div class="evo-card">
            <img src="${
              poke.sprites.other['official-artwork'].front_default
            }" alt="${poke.name}">
            <h3>${poke.name}</h3>
            <p>#${poke.id}</p>
            <p>${poke.types.map((t) => t.type.name).join(', ')}</p>
          </div>
          ${
            idx < evolutionDetails.length - 1
              ? '<span class="arrow-icon">→</span>'
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>
  `
}
const backButton = document.getElementById('back-btn')
backButton.addEventListener('click', () => {
  history.back()
})

const initEvolutions = async () => {
  const pokeId = PokemonIdUrl()
  if (!pokeId) {
    evoContainer.innerHTML = '<p>No se especificó un Pokémon.</p>'
    return
  }

  evoContainer.innerHTML = '<p>Cargando evoluciones...</p>'

  const pokeData = await fetchPokemonData(pokeId)
  if (!pokeData) return

  const speciesData = await fetchSpeciesData(pokeData.species.url)
  if (!speciesData) return

  const evolutionChainData = await fetchEvolutionChain(
    speciesData.evolution_chain.url
  )
  if (!evolutionChainData) return

  const evoList = extractEvolutionList(evolutionChainData.chain)
  const evoDetails = await fetchAllEvolutionDetails(evoList)

  renderEvolutionChain(evoDetails)
}

initEvolutions()
