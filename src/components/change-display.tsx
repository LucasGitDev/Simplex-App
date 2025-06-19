import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChangeAnalysisResult } from "@/types/simplex";

interface ChangeAnalysisDisplayProps {
  changeSolution: ChangeAnalysisResult
}

export function ChangeAnalysisDisplay({ changeSolution }: ChangeAnalysisDisplayProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise da Alteração Proposta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Restrições */}
        <div>
          <h3 className="text-lg font-medium mb-2">Verificação das Restrições</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restrição</TableHead>
                <TableHead>Expressão</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changeSolution.constraintsResults.map((res, index) => (
                <TableRow key={index}>
                  <TableCell>{res.constraint}</TableCell>
                  <TableCell>{res.expression}</TableCell>
                  <TableCell>{res.result.toFixed(2)}</TableCell>
                  <TableCell>
                    {res.satisfied ? (
                      <span className="text-green-600">OK</span>
                    ) : (
                      <span className="text-red-600">Não Satisfeita</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>


        <div>
          <h3 className="text-lg font-medium mb-2">Cálculo do Novo Lucro</h3>
          <p className="text-base">{changeSolution.lucroExpressao}</p>
        </div>


        {/* Resultado Final */}
        <div>
          <p className="text-lg">
            Situação da Alteração:{" "}
            {changeSolution.viavel ? (
              <span className="text-green-600">Viável</span>
            ) : (
              <span className="text-red-600">Não Viável</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
