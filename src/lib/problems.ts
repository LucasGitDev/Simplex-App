import type { Problem } from "@/types/simplex";

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
    constraintSigns: ["≤", "≤", "≤"],
  };
}

export function get14demaio(): Problem {
  return {
    objectiveCoeffs: [3, 2, 5],
    constraintMatrix: [
      [1, 2, 1],
      [3, 0, 2],
      [1, 4, 0],
    ],
    constraintRhs: [430, 460, 420],
    constraintNames: ["A", "B", "C"],
    variableNames: ["x1", "x2", "x3"],
    maximize: true,
    constraintSigns: ["≤", "≤", "≤"],
  };
}
