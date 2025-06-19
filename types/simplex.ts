export interface Problem {
  objectiveCoeffs: number[];
  constraintMatrix: number[][];
  constraintRhs: number[];
  constraintNames: string[];
  variableNames: string[];
  maximize: boolean;
}

export interface Solution {
  solution: number[];
  optimalValue: number;
  tableau: number[][];
  iteration: number;
}

export interface AnalysisResult {
  bindingConstraints: number[];
  shadowPrices: number[];
  explanations: Record<string, string>;
}

export interface ChangeProblem {
  constraintNewRhs: number[];
}
