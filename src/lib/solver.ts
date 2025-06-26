import type { Problem, Solution } from "@/types/simplex";
import { getStandardObjective } from "./problem";
import {
  choosePivot,
  extractSolution,
  initializePhase1Tableau,
  initializeTableau,
  pivotOperation,
} from "./tableau";

export function simplex(problem: Problem): Solution {
  const c = getStandardObjective(problem);
  const A = problem.constraintMatrix;
  const b = problem.constraintRhs;
  const constraintSigns = problem.constraintSigns;
  const tableauHistory: number[][][] = [];

  const needsPhase1 = constraintSigns.some(
    (sign) => sign === "≥" || sign === "="
  );

  let tableau: number[][];
  let iteration = 0;

  if (needsPhase1) {
    tableau = initializePhase1Tableau(c, A, b, constraintSigns);
    tableauHistory.push(tableau);

    while (true) {
      const pivotCol = choosePivot(tableau[tableau.length - 1].slice(0, -1));
      if (pivotCol === null) {
        break;
      }

      const ratios: number[] = [];
      for (let i = 0; i < A.length; i++) {
        if (tableau[i][pivotCol] > 0) {
          ratios[i] = tableau[i][tableau[0].length - 1] / tableau[i][pivotCol];
        } else {
          ratios[i] = Number.POSITIVE_INFINITY;
        }
      }

      const pivotRow = ratios.indexOf(Math.min(...ratios));

      if (
        tableau.every(
          (row, i) => i === tableau.length - 1 || row[pivotCol] <= 0
        )
      ) {
        throw new Error("Problema ilimitado");
      }

      tableau = pivotOperation(tableau, pivotRow, pivotCol);
      iteration++;
      tableauHistory.push(tableau);
    }

    const phase1Value = tableau[tableau.length - 1][tableau[0].length - 1];
    if (Math.abs(phase1Value) > 1e-10) {
      throw new Error("Problema inviável");
    }

    tableau = initializeTableau(c, A, b, constraintSigns);
    tableauHistory.push(tableau);
  } else {
    tableau = initializeTableau(c, A, b, constraintSigns);
    tableauHistory.push(tableau);
  }

  while (true) {
    const pivotCol = choosePivot(tableau[tableau.length - 1].slice(0, -1));
    if (pivotCol === null) {
      break;
    }

    const ratios: number[] = [];
    for (let i = 0; i < A.length; i++) {
      if (tableau[i][pivotCol] > 0) {
        ratios[i] = tableau[i][tableau[0].length - 1] / tableau[i][pivotCol];
      } else {
        ratios[i] = Number.POSITIVE_INFINITY;
      }
    }

    const pivotRow = ratios.indexOf(Math.min(...ratios));

    if (
      tableau.every((row, i) => i === tableau.length - 1 || row[pivotCol] <= 0)
    ) {
      throw new Error("Problema ilimitado");
    }

    tableau = pivotOperation(tableau, pivotRow, pivotCol);
    iteration++;
    tableauHistory.push(tableau);
  }

  const [solution, optimalValue] = extractSolution(tableau, A[0].length);

  return {
    solution,
    optimalValue,
    tableau,
    iteration,
    tableauHistory,
  };
}
