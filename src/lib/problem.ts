import type { Problem } from "@/types/simplex"

/**
 * Retorna a função objetivo no formato esperado pelo Simplex.
 *
 * Se o problema for de maximização, retorna os coeficientes como foram passados.
 * Se for de minimização, retorna os coeficientes multiplicados por -1,
 * pois o Simplex resolve problemas como maximização por padrão.
 */
export function getStandardObjective(problem: Problem): number[] {
  return problem.maximize ? [...problem.objectiveCoeffs] : problem.objectiveCoeffs.map((coef) => -coef)
}

/**
 * Gera nomes curtos únicos para variáveis, usando primeira letra + resolução de conflito.
 */
export function generateShortNames(variableNames: string[]): string[] {
  const counter: Record<string, number> = {}
  const shortNames: string[] = []

  for (const name of variableNames) {
    const base = name[0].toLowerCase()
    const count = counter[base] || 0
    counter[base] = count + 1

    const shortName = count === 0 ? base : base + (count + 1)
    shortNames.push(shortName)
  }

  return shortNames
}
