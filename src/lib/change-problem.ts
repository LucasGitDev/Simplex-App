import type {
  ChangeAnalysisResult,
  ChangeProblem,
  Solution,
} from "@/types/simplex";

export function changeSimplex(
  solution: Solution,
  changeProblem: ChangeProblem,
  constraintNames: string[]
): ChangeAnalysisResult {
  type Tableau = number[][];

  const reducedTableau: Tableau = solution.tableau.map((row) =>
    row.slice((changeProblem.constraintNewRhs.length + 1) * -1)
  );

  const deltas = changeProblem.constraintNewRhs;
  const linhaZ = reducedTableau[reducedTableau.length - 1];

  const constraintsResults: ChangeAnalysisResult["constraintsResults"] = [];

  // Analisar as restrições
  for (let i = 0; i < reducedTableau.length - 1; i++) {
    let soma = 0;
    const termos: string[] = [];

    for (let j = 0; j < deltas.length; j++) {
      const coef = reducedTableau[i][j];
      const delta = deltas[j];
      soma += coef * delta;
      termos.push(`${coef.toFixed(2)}*(${delta})`);
    }

    const rhs = reducedTableau[i][reducedTableau[i].length - 1];
    soma += rhs;
    termos.push(`${rhs}`);

    constraintsResults.push({
      constraint: constraintNames[i],
      expression: termos.join(" + "),
      result: soma,
      satisfied: soma >= 0,
    });
  }

  // Calcular o lucro
  let lucroTotal = 0;
  const lucroTermos: string[] = [];

  for (let j = 0; j < deltas.length; j++) {
    const coef = linhaZ[j];
    const delta = deltas[j];
    const produto = coef * delta;
    lucroTotal += produto;
    lucroTermos.push(`${coef.toFixed(2)}*(${delta})`);
  }

  const zOriginal = linhaZ[linhaZ.length - 1];
  lucroTotal += zOriginal;
  lucroTermos.push(`${zOriginal}`);

  const lucroExpressao = `${lucroTermos.join(" + ")} = R$ ${lucroTotal}`;

  // Verificar se todas as restrições estão satisfeitas
  const viavel = constraintsResults.every((r) => r.satisfied);

  return {
    constraintsResults,
    lucroExpressao,
    lucroTotal,
    viavel,
  };
}
