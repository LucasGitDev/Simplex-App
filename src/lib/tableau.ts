export function initializeTableau(
  objectiveCoeffs: number[],
  constraintMatrix: number[][],
  constraintRhs: number[],
): number[][] {
  const numVars = objectiveCoeffs.length
  const numConstraints = constraintMatrix.length

  // Criar o tableau com zeros
  const tableau: number[][] = Array(numConstraints + 1)
    .fill(0)
    .map(() => Array(numVars + numConstraints + 1).fill(0))

  // Preencher a matriz de restrições
  for (let i = 0; i < numConstraints; i++) {
    for (let j = 0; j < numVars; j++) {
      tableau[i][j] = constraintMatrix[i][j]
    }
    // Adicionar variáveis de folga
    tableau[i][numVars + i] = 1
    // Adicionar RHS
    tableau[i][numVars + numConstraints] = constraintRhs[i]
  }

  // Preencher a função objetivo (negativa para maximização)
  for (let j = 0; j < numVars; j++) {
    tableau[numConstraints][j] = -objectiveCoeffs[j]
  }

  return tableau
}

/**
 * Escolhe a coluna pivô para a próxima iteração do Simplex.
 */
export function choosePivot(objectiveRow: number[]): number | null {
  let minValue = 0
  let pivotCol = null

  for (let j = 0; j < objectiveRow.length; j++) {
    if (objectiveRow[j] < minValue) {
      minValue = objectiveRow[j]
      pivotCol = j
    }
  }

  return pivotCol
}

/**
 * Realiza a operação de pivoteamento no tableau.
 */
export function pivotOperation(tableau: number[][], pivotRow: number, pivotCol: number): number[][] {
  const numRows = tableau.length
  const numCols = tableau[0].length
  const newTableau = JSON.parse(JSON.stringify(tableau)) // Deep copy

  // Normalizar a linha pivô
  const pivotValue = newTableau[pivotRow][pivotCol]
  for (let j = 0; j < numCols; j++) {
    newTableau[pivotRow][j] /= pivotValue
  }

  // Atualizar as outras linhas
  for (let i = 0; i < numRows; i++) {
    if (i !== pivotRow) {
      const factor = newTableau[i][pivotCol]
      for (let j = 0; j < numCols; j++) {
        newTableau[i][j] -= factor * newTableau[pivotRow][j]
      }
    }
  }

  return newTableau
}

/**
 * Extrai a solução do tableau final.
 */
export function extractSolution(tableau: number[][], numVars: number): [number[], number] {
  const solution = Array(numVars).fill(0)
  const numRows = tableau.length - 1 // Excluindo a linha da função objetivo
  const numCols = tableau[0].length

  // Para cada variável original
  for (let j = 0; j < numVars; j++) {
    // Verificar se é uma variável básica
    let basicVar = true
    let basicRow = -1

    for (let i = 0; i < numRows; i++) {
      if (Math.abs(tableau[i][j]) < 1e-10) continue

      if (Math.abs(tableau[i][j] - 1) < 1e-10 && basicRow === -1) {
        basicRow = i
      } else {
        basicVar = false
        break
      }
    }

    if (basicVar && basicRow !== -1) {
      solution[j] = tableau[basicRow][numCols - 1]
    }
  }

  // Valor ótimo (negativo porque a função objetivo foi negada para maximização)
  const optimalValue = tableau[numRows][numCols - 1]

  return [solution, optimalValue]
}
