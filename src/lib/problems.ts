import type { Problem } from "@/types/simplex"

export function getVenixProblem(): Problem {
  return {
    objectiveCoeffs: [12, 60],
    constraintMatrix: [
      [6, 30],
      [6, 45],
      [6, 24],
    ],
    constraintRhs: [2160, 1320, 900],
    constraintNames: ["Usinagem", "Pintura", "Montagem"],
    variableNames: ["Carrinhos", "Triciclos"],
    maximize: true,
  }
}
