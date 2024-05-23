import express from 'express'
import { getPokemonData, getPokemonNamesData } from '../services/pokeApi.service'
import { filtrarPorPrefijo } from '../utils'
const router = express.Router()

const handlePokemonRequest = async (req: express.Request, res: express.Response, _next: express.NextFunction): Promise<void> => {
  try {
    const pokemonNameData = getPokemonNamesData()
    const pokeName = req.query.pokeName as string

    if (typeof pokeName !== 'string' || pokeName === '') {
      res.status(400).send('El parámetro pokeName es requerido.')
      return
    }

    const arrayOfPosiblePokemons = filtrarPorPrefijo(pokemonNameData, pokeName)

    const pokemonDataPromises = arrayOfPosiblePokemons.map(async pokemon => await getPokemonData(pokemon.toLowerCase()))
    const pokemonDataArray = await Promise.all(pokemonDataPromises)

    res.status(200).send(pokemonDataArray)
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error'
    res.status(500).send(`Ha ocurrido un error: ${errorMessage}`)
  }
}

router.get('/', (req, res, next) => {
  handlePokemonRequest(req, res, next).catch(next)
})

export default router
