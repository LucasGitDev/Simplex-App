import type { AnalysisResult } from "@/types/simplex";

/**
 * Identifica restrições economicamente ativas (binding) no tableau final.
 */
export function getBindingConstraints(
  tableau: number[][],
  tolerance = 1e-5
): number[] {
  const numConstraints = tableau.length - 1;
  const numVariables = tableau[0].length - numConstraints - 1;

  const slack = tableau
    .slice(0, numConstraints)
    .map((row) => row[row.length - 1]);
  const shadowPrices = tableau[tableau.length - 1].slice(
    numVariables,
    numVariables + numConstraints
  );

  const binding: number[] = [];
  for (let i = 0; i < numConstraints; i++) {
    if (
      Math.abs(slack[i]) < tolerance ||
      Math.abs(shadowPrices[i]) > tolerance
    ) {
      binding.push(i);
    }
  }

  return binding;
}

/**
 * Extrai os preços sombra (shadow prices) do tableau final do Simplex.
 */
export function getShadowPrices(tableau: number[][]): number[] {
  const numConstraints = tableau.length - 1;
  const numVariables = tableau[0].length - numConstraints - 1;
  return tableau[tableau.length - 1].slice(
    numVariables,
    numVariables + numConstraints
  );
}

/**
 * Gera uma explicação em linguagem natural da análise pós-otimização do Simplex.
 */
export function explainAnalysis(
  tableau: number[][],
  constraintNames: string[]
): Record<string, string> {
  const binding = getBindingConstraints(tableau);
  const shadowPrices = getShadowPrices(tableau);
  const explanations: Record<string, string> = {};

  for (let i = 0; i < constraintNames.length; i++) {
    const name = constraintNames[i];
    const price = shadowPrices[i];

    if (binding.includes(i)) {
      explanations[name] =
        `✅ A restrição '${name}' está ativa. ` +
        `Aumentar o recurso em 1 unidade aumentaria o lucro em aproximadamente ${price.toFixed(
          2
        )}.`;
    } else {
      explanations[name] =
        `ℹ️ A restrição '${name}' não está ativa. ` +
        `Aumentar o recurso não traria ganho imediato no lucro (preço sombra ≈ ${price.toFixed(
          2
        )}).`;
    }
  }

  return explanations;
}

/**
 * Realiza a análise completa do tableau final.
 */
export function analyzeTableau(
  tableau: number[][],
  constraintNames: string[]
): AnalysisResult {
  const bindingConstraints = getBindingConstraints(tableau);
  const shadowPrices = getShadowPrices(tableau);
  const explanations = explainAnalysis(tableau, constraintNames);

  return {
    bindingConstraints,
    shadowPrices,
    explanations,
  };
}
