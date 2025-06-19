"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProblemForm } from "@/components/problem-form"
import { ProblemDisplay } from "@/components/problem-display"
import { TableauDisplay } from "@/components/tableau-display"
import { SolutionDisplay } from "@/components/solution-display"
import { AnalysisDisplay } from "@/components/analysis-display"
import type { Problem, Solution, AnalysisResult, ChangeProblem } from "@/types/simplex"
import { simplex } from "@/lib/solver"
import { analyzeTableau } from "@/lib/analysis"
import { getVenixProblem } from "@/lib/problems"
import { ChangeForm } from "@/components/change-form"
import { changeSimplex } from "@/lib/change-problem"
import { ChangeAnalysisDisplay } from "./change-display"

export function SimplexSolver() {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [solution, setSolution] = useState<Solution | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("problem")

  const handleSolveProblem = (problem: Problem) => {
    try {
      setProblem(problem)
      const solutionResult = simplex(problem)
      setSolution(solutionResult)

      const analysisResult = analyzeTableau(solutionResult.tableau, problem.constraintNames)
      setAnalysis(analysisResult)

      setError(null)
      setActiveTab("solution")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao resolver o problema")
      setSolution(null)
      setAnalysis(null)
    }
  }

  const handleChangeProblem = (changeProblem: ChangeProblem) => {
    try {
      solution &&
        changeSimplex(solution, changeProblem)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao resolver o problema")

    }
  }

  const handleLoadExample = () => {
    const exampleProblem = getVenixProblem()
    setProblem(exampleProblem)
    setActiveTab("problem")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleLoadExample}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Carregar Exemplo
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          <p className="font-medium">Erro:</p>
          <p>{error}</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="problem">Problema</TabsTrigger>
          <TabsTrigger value="solution" disabled={!solution}>
            Solução
          </TabsTrigger>
          <TabsTrigger value="tableau" disabled={!solution}>
            Tableau
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysis}>
            Análise
          </TabsTrigger>
          <TabsTrigger value="change" disabled={!solution}>
            Alteração
          </TabsTrigger>
          <TabsTrigger value="change-solution" disabled={!solution}>
            Alteração solução
          </TabsTrigger>
        </TabsList>

        <TabsContent value="problem" className="space-y-6">
          <ProblemForm onSubmit={handleSolveProblem} initialProblem={problem} />
          {problem && <ProblemDisplay problem={problem} />}
        </TabsContent>

        <TabsContent value="change" className="space-y-6">
          {problem && <ChangeForm onSubmit={handleChangeProblem} problem={problem} />}
        </TabsContent>

        <TabsContent value="solution">
          {solution && problem && <SolutionDisplay solution={solution} problem={problem} />}
        </TabsContent>

        <TabsContent value="tableau">
          {solution && problem && (
            <TableauDisplay
              tableau={solution.tableau}
              variableNames={problem.variableNames}
              constraintNames={problem.constraintNames}
            />
          )}
        </TabsContent>

        <TabsContent value="analysis">
          {analysis && problem && solution && (
            <AnalysisDisplay analysis={analysis} problem={problem} solution={solution} />
          )}
        </TabsContent>

        <TabsContent value="change-solution" className="space-y-6">
          {solution && problem && <ChangeAnalysisDisplay />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
