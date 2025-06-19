import type { ChangeProblem, Solution } from "@/types/simplex";
import { getStandardObjective } from "./problem";
import {
  choosePivot,
  extractSolution,
  initializeTableau,
  pivotOperation,
} from "./tableau";

export function changeSimplex(solution: Solution, changeProblem: ChangeProblem): any {
  type Tableau = number[][];

  function verificarRestricoes(tableau: Tableau, deltas: number[]): boolean {
    for (let i = 0; i < tableau.length - 1; i++) {
      let soma = 0;
      for (let j = 0; j < deltas.length; j++) {
        soma += tableau[i][j] * deltas[j];
      }
      soma += tableau[i][tableau[i].length - 1];  // Lado direito (b)
      console.log(`Restrição ${i + 1}: Soma = ${soma} >= 0 ?`, soma >= 0);
      if (soma < 0) return false;
    }
    return true;
  }

  function calcularLucro(tableau: Tableau, deltas: number[]): number {
    const linhaObjetivo = tableau[tableau.length - 1];
    let lucro = 0;
    for (let j = 0; j < deltas.length; j++) {
      console.log(linhaObjetivo[j], '*', deltas[j])
      lucro += linhaObjetivo[j] * deltas[j];
    }
    lucro += linhaObjetivo[linhaObjetivo.length - 1];  // Termo constante (17500)
    return lucro;
  }

  // Seu tableau (exemplo vindo da imagem)

  const reducedTableau: Tableau = solution.tableau.map(row =>
    row.slice((changeProblem.constraintNewRhs.length + 1) * -1)
  );
  console.log(reducedTableau)
  // Tentativa inicial: Dobrar o estoque de tábuas (∆1 = 250, ∆2 = 0, ∆3 = 0)

  console.log("\n--- Tentativa 1 ---");
  const viavel1 = verificarRestricoes(reducedTableau, changeProblem.constraintNewRhs);
  console.log("Viável?", viavel1);
  console.log("Lucro:", calcularLucro(reducedTableau, changeProblem.constraintNewRhs));
}
