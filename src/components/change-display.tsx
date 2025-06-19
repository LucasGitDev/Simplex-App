import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ChangeAnalysisResult {
  constraintsResults: {
    constraint: string;
    expression: string;
    result: number;
    satisfied: boolean;
  }[];
  lucroExpressao: string; // Nova string contendo o cálculo detalhado do lucro
  lucroTotal: number;
  viavel: boolean;
}

interface ChangeAnalysisDisplayProps {

}

export function ChangeAnalysisDisplay({ }: ChangeAnalysisDisplayProps) {
  const result: ChangeAnalysisResult = {
    constraintsResults: [
      {
        constraint: "Restrição 1",
        expression: `2*(250) - 0.5*(0) + 250`,
        result: 750,
        satisfied: true,
      },
      {
        constraint: "Restrição 2",
        expression: `-1*(250) + 0 + 350`,
        result: 100,
        satisfied: true,
      },
      {
        constraint: "Restrição 3",
        expression: `-1*(250) + 0.5*(0)`,
        result: -250,
        satisfied: false,
      },
    ],
    lucroExpressao: `40*(250) + 0*(0) + 15*(0) + 17500 = R$ 27500`,
    lucroTotal: 27500,
    viavel: false,
  };
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
              {result.constraintsResults.map((res, index) => (
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
          <p className="text-base">{result.lucroExpressao}</p>
        </div>


        {/* Resultado Final */}
        <div>
          <p className="text-lg">
            Situação da Alteração:{" "}
            {result.viavel ? (
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
