"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Problem } from "@/types/simplex";
import { useEffect, useState } from "react";

interface ProblemFormProps {
  onSubmit: (problem: Problem) => void;
  initialProblem: Problem | null;
}

export function ProblemForm({ onSubmit, initialProblem }: ProblemFormProps) {
  const [numVars, setNumVars] = useState(2);
  const [numConstraints, setNumConstraints] = useState(3);
  const [maximize, setMaximize] = useState(true);
  const [variableNames, setVariableNames] = useState<string[]>(["x1", "x2"]);
  const [constraintNames, setConstraintNames] = useState<string[]>([
    "Restrição 1",
    "Restrição 2",
    "Restrição 3",
  ]);
  const [constraintSigns, setConstraintSigns] = useState<string[]>([
    "≤",
    "≤",
    "≤",
  ]);
  const [objectiveCoeffs, setObjectiveCoeffs] = useState<number[]>([0, 0]);
  const [constraintMatrix, setConstraintMatrix] = useState<number[][]>([
    [0, 0],
    [0, 0],
    [0, 0],
  ]);
  const [constraintRhs, setConstraintRhs] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (initialProblem) {
      setNumVars(initialProblem.variableNames.length);
      setNumConstraints(initialProblem.constraintNames.length);
      setMaximize(initialProblem.maximize);
      setVariableNames([...initialProblem.variableNames]);
      setConstraintNames([...initialProblem.constraintNames]);
      setConstraintSigns([...initialProblem.constraintSigns]);
      setObjectiveCoeffs([...initialProblem.objectiveCoeffs]);
      setConstraintMatrix(
        initialProblem.constraintMatrix.map((row) => [...row])
      );
      setConstraintRhs([...initialProblem.constraintRhs]);
    }
  }, [initialProblem]);

  const handleNumVarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumVars = Number.parseInt(e.target.value);
    if (newNumVars > 0) {
      setNumVars(newNumVars);

      // Atualizar nomes de variáveis
      const newVarNames = Array(newNumVars)
        .fill(0)
        .map((_, i) => `x${i + 1}`);
      setVariableNames(newVarNames);

      // Atualizar coeficientes da função objetivo
      const newObjCoeffs = Array(newNumVars).fill(0);
      objectiveCoeffs.forEach((val, i) => {
        if (i < newNumVars) newObjCoeffs[i] = val;
      });
      setObjectiveCoeffs(newObjCoeffs);

      // Atualizar matriz de restrições
      const newMatrix = constraintMatrix.map((row) => {
        const newRow = Array(newNumVars).fill(0);
        row.forEach((val, i) => {
          if (i < newNumVars) newRow[i] = val;
        });
        return newRow;
      });
      setConstraintMatrix(newMatrix);
    }
  };

  const handleNumConstraintsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNumConstraints = Number.parseInt(e.target.value);
    if (newNumConstraints > 0) {
      setNumConstraints(newNumConstraints);

      // Atualizar nomes de restrições
      const newConstraintNames = Array(newNumConstraints)
        .fill(0)
        .map((_, i) => `Restrição ${i + 1}`);
      setConstraintNames(newConstraintNames);

      // Atualizar sinais de restrições
      const newConstraintSigns = Array(newNumConstraints).fill("≤");
      constraintSigns.forEach((sign, i) => {
        if (i < newNumConstraints) newConstraintSigns[i] = sign;
      });
      setConstraintSigns(newConstraintSigns);

      // Atualizar matriz de restrições
      const newMatrix = Array(newNumConstraints)
        .fill(0)
        .map((_, i) => {
          if (i < constraintMatrix.length) {
            return [...constraintMatrix[i]];
          } else {
            return Array(numVars).fill(0);
          }
        });
      setConstraintMatrix(newMatrix);

      // Atualizar RHS
      const newRhs = Array(newNumConstraints).fill(0);
      constraintRhs.forEach((val, i) => {
        if (i < newNumConstraints) newRhs[i] = val;
      });
      setConstraintRhs(newRhs);
    }
  };

  const handleVariableNameChange = (index: number, value: string) => {
    const newNames = [...variableNames];
    newNames[index] = value;
    setVariableNames(newNames);
  };

  const handleConstraintNameChange = (index: number, value: string) => {
    const newNames = [...constraintNames];
    newNames[index] = value;
    setConstraintNames(newNames);
  };

  const handleObjectiveCoefficientChange = (index: number, value: string) => {
    const newCoeffs = [...objectiveCoeffs];
    newCoeffs[index] = Number.parseFloat(value) || 0;
    setObjectiveCoeffs(newCoeffs);
  };

  const handleConstraintCoefficientChange = (
    row: number,
    col: number,
    value: string
  ) => {
    const newMatrix = [...constraintMatrix];
    newMatrix[row] = [...newMatrix[row]];
    newMatrix[row][col] = Number.parseFloat(value) || 0;
    setConstraintMatrix(newMatrix);
  };

  const handleConstraintRhsChange = (index: number, value: string) => {
    const newRhs = [...constraintRhs];
    newRhs[index] = Number.parseFloat(value) || 0;
    setConstraintRhs(newRhs);
  };

  const handleConstraintSignChange = (index: number, value: string) => {
    const newSigns = [...constraintSigns];
    newSigns[index] = value;
    setConstraintSigns(newSigns);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const problem: Problem = {
      objectiveCoeffs,
      constraintMatrix,
      constraintRhs,
      constraintNames,
      variableNames,
      maximize,
      constraintSigns,
    };

    onSubmit(problem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numVars">Número de Variáveis</Label>
          <Input
            id="numVars"
            type="number"
            min="1"
            value={numVars}
            onChange={handleNumVarsChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numConstraints">Número de Restrições</Label>
          <Input
            id="numConstraints"
            type="number"
            min="1"
            value={numConstraints}
            onChange={handleNumConstraintsChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="maximize"
          checked={maximize}
          onCheckedChange={setMaximize}
        />
        <Label htmlFor="maximize">{maximize ? "Maximizar" : "Minimizar"}</Label>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Nomes das Variáveis</h3>
        <div className="grid grid-cols-4 gap-2">
          {variableNames.map((name, i) => (
            <div key={`var-${i}`} className="space-y-1">
              <Label htmlFor={`var-${i}`}>Variável {i + 1}</Label>
              <Input
                id={`var-${i}`}
                value={name}
                onChange={(e) => handleVariableNameChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Função Objetivo</h3>
        <div className="grid grid-cols-4 gap-2">
          {objectiveCoeffs.map((coeff, i) => (
            <div key={`obj-${i}`} className="space-y-1">
              <Label htmlFor={`obj-${i}`}>{variableNames[i]}</Label>
              <Input
                id={`obj-${i}`}
                type="number"
                step="any"
                value={coeff}
                onChange={(e) =>
                  handleObjectiveCoefficientChange(i, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Restrições</h3>
        {constraintMatrix.map((row, i) => (
          <div
            key={`constraint-${i}`}
            className="space-y-2 p-4 border rounded-md"
          >
            <div className="space-y-1">
              <Label htmlFor={`constraint-name-${i}`}>Nome da Restrição</Label>
              <Input
                id={`constraint-name-${i}`}
                value={constraintNames[i]}
                onChange={(e) => handleConstraintNameChange(i, e.target.value)}
              />
            </div>
            <div className="grid grid-cols-5 gap-2 items-end">
              {row.map((coeff, j) => (
                <div key={`constraint-${i}-${j}`} className="space-y-1">
                  <Label htmlFor={`constraint-${i}-${j}`}>
                    {variableNames[j]}
                  </Label>
                  <Input
                    id={`constraint-${i}-${j}`}
                    type="number"
                    step="any"
                    value={coeff}
                    onChange={(e) =>
                      handleConstraintCoefficientChange(i, j, e.target.value)
                    }
                  />
                </div>
              ))}
              <div className="flex items-center justify-center">
                <select
                  value={constraintSigns[i]}
                  onChange={(e) =>
                    handleConstraintSignChange(i, e.target.value)
                  }
                >
                  <option value="≤">≤</option>
                  <option value="≥">≥</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor={`rhs-${i}`}>RHS</Label>
                <Input
                  id={`rhs-${i}`}
                  type="number"
                  step="any"
                  value={constraintRhs[i]}
                  onChange={(e) => handleConstraintRhsChange(i, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full">
        Resolver
      </Button>
    </form>
  );
}
