const api = "https://pokeapi.co/api/v2/pokemon"

export const fetchPokemon = async (pokemon) => {
    const response = await fetch(`${api}/${pokemon}`)
    const pokemonJson = await response.json()
    return pokemonJson
}