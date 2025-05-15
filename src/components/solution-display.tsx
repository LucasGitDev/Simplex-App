import type { Problem, Solution } from "@/types/simplex"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SolutionDisplayProps {
  solution: Solution
  problem: Problem
}

export function SolutionDisplay({ solution, problem }: SolutionDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solução Ótima</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Valor Ótimo</h3>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-xl font-mono">Z* = {solution.optimalValue.toFixed(4)}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Valores das Variáveis</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {solution.solution.map((value, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">{problem.variableNames[i]}</p>
                <p className="text-lg font-mono">{value.toFixed(4)}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
