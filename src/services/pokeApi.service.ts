import axios from 'axios'
import categoriesData from '../db/categories.json'
import pokemonNamesData from '../db/pokemonNames.json'
import { PokemonData } from '../@types/types'

export const getCategoryData = (): string[] => {
  return categoriesData
}
export const getPokemonNamesData = (): string[] => {
  return pokemonNamesData
}

export const getPokemonData = async (pokemonName: string): Promise<PokemonData> => {
  const pokemonId = await getPokemonId(pokemonName)
  const pokemonData = await getPokemonDataFromId(pokemonId)
  return pokemonData
}

export const getPokemonId = async (pokemonName: string): Promise<number> => {
  try {
    const formattedName = pokemonName.toLowerCase().replace(/ /g, '-')

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${formattedName.toLowerCase()}`)
    const data = response.data
    const id = data.id
    return id
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error'
    throw new Error(`Error fetching ID for Pokémon ${pokemonName}: ${errorMessage}`)
  }
}

export const getPokemonDataFromId = async (pokemonId: number): Promise<PokemonData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const data = response.data

    const sprite = data.sprites.front_default
    const type1 = data.types[0].type.name
    const type2 = data.types[1]?.type.name

    return {
      id: pokemonId,
      sprite,
      type1,
      type2
    }
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error'
    throw new Error(`Error fetching data for Pokémon with ID ${pokemonId}: ${errorMessage}`)
  }
}
