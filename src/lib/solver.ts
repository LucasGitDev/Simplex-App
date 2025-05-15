import type { Problem, Solution } from "@/types/simplex"
import { getStandardObjective } from "./problem"
import { initializeTableau, choosePivot, pivotOperation, extractSolution } from "./tableau"

export function simplex(problem: Problem): Solution {
  const c = getStandardObjective(problem)
  const A = problem.constraintMatrix
  const b = problem.constraintRhs

  let tableau = initializeTableau(c, A, b)
  let iteration = 0

  while (true) {
    const pivotCol = choosePivot(tableau[tableau.length - 1].slice(0, -1))
    if (pivotCol === null) {
      break
    }

    // Calcular razões para encontrar a linha pivô
    const ratios: number[] = []
    for (let i = 0; i < A.length; i++) {
      if (tableau[i][pivotCol] > 0) {
        ratios[i] = tableau[i][tableau[0].length - 1] / tableau[i][pivotCol]
      } else {
        ratios[i] = Number.POSITIVE_INFINITY
      }
    }

    const pivotRow = ratios.indexOf(Math.min(...ratios))

    // Verificar se o problema é ilimitado
    if (tableau.every((row, i) => i === tableau.length - 1 || row[pivotCol] <= 0)) {
      throw new Error("Problema ilimitado")
    }

    // Realizar operação de pivoteamento
    tableau = pivotOperation(tableau, pivotRow, pivotCol)
    iteration++
  }

  const [solution, optimalValue] = extractSolution(tableau, A[0].length)

  return {
    solution,
    optimalValue,
    tableau,
  }
}
