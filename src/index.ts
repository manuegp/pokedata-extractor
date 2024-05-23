import express from 'express'
import sudokuRouter from './routes/sudoku'
import searchPokemonRouter from './routes/searchPokemon'

const app = express()
app.use(express.json())

const PORT = 3000

app.use('/api/getSudoku', sudokuRouter)
app.use('/api/searchPokemon', searchPokemonRouter)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
