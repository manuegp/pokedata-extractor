import express from 'express'
import { getCategoryData } from '../services/pokeApi.service'
import { obtenerStringsAleatorios, convertirAFormatoSudoku } from '../utils'
const router = express.Router()

router.get('/', (_req, res) => {
  try {
    const categoryData = getCategoryData()
    const arrayWith6Categories = obtenerStringsAleatorios(categoryData)
    const finalScheme = convertirAFormatoSudoku(arrayWith6Categories)
    res.send(finalScheme).status(200)
  } catch (error) {
    res.send('Ha ocurrido un error').sendStatus(500)
  }
})

export default router
