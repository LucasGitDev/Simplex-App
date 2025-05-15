import type { Problem, Solution, AnalysisResult } from "@/types/simplex"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AnalysisDisplayProps {
  analysis: AnalysisResult
  problem: Problem
  solution: Solution
}

export function AnalysisDisplay({ analysis, problem, solution }: AnalysisDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise Pós-Otimização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Preços Sombra</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restrição</TableHead>
                <TableHead>Preço Sombra</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problem.constraintNames.map((name, i) => (
                <TableRow key={i}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{analysis.shadowPrices[i].toFixed(4)}</TableCell>
                  <TableCell>
                    {analysis.bindingConstraints.includes(i) ? (
                      <span className="text-green-600">Ativa</span>
                    ) : (
                      <span className="text-gray-500">Não ativa</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Explicações</h3>
          <div className="space-y-2">
            {Object.entries(analysis.explanations).map(([name, explanation]) => (
              <div key={name} className="p-4 bg-gray-50 rounded-md">
                <p dangerouslySetInnerHTML={{ __html: explanation }} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
