import { sudokuScheme } from './@types/types'

export const obtenerStringsAleatorios = (lista: string[]): string[] => {
  if (lista.length < 6) {
    return ['La lista no contiene suficientes elementos.']
  } else {
    const resultados: string[] = []
    const indicesElegidos: Set<number> = new Set()
    while (indicesElegidos.size < 6) {
      const indice = Math.floor(Math.random() * lista.length)
      if (!indicesElegidos.has(indice)) {
        resultados.push(lista[indice])
        indicesElegidos.add(indice)
      }
    }
    return resultados
  }
}

export const convertirAFormatoSudoku = (strings: string[]): sudokuScheme => {
  if (strings.length !== 6) {
    throw new Error('La lista debe contener exactamente 6 elementos.')
  }

  return {
    x: [strings[0], strings[1], strings[2]],
    y: [strings[3], strings[4], strings[5]]
  }
}

export const filtrarPorPrefijo = (array: string[], prefijo: string): string[] => {
  return array.filter(item => item.toLowerCase().startsWith(prefijo.toLowerCase()))
}
