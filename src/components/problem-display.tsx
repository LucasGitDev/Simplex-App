import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Problem } from "@/types/simplex";

interface ProblemDisplayProps {
  problem: Problem;
}

export function ProblemDisplay({ problem }: ProblemDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Problema de Programação Linear</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Função Objetivo</h3>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="font-mono">
              {problem.maximize ? "Maximizar" : "Minimizar"} Z ={" "}
              {problem.objectiveCoeffs.map((coeff, i) => (
                <span key={i}>
                  {i > 0 && coeff >= 0 && "+ "}
                  {coeff < 0 && "- "}
                  {Math.abs(coeff)}
                  {"*"}
                  {problem.variableNames[i]}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Restrições</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restrição</TableHead>
                {problem.variableNames.map((name, i) => (
                  <TableHead key={i}>{name}</TableHead>
                ))}
                <TableHead></TableHead>
                <TableHead>RHS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problem.constraintMatrix.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{problem.constraintNames[i]}</TableCell>
                  {row.map((coeff, j) => (
                    <TableCell key={j}>{coeff}</TableCell>
                  ))}
                  <TableCell>≤</TableCell>
                  <TableCell>{problem.constraintRhs[i]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">
            Forma Padrão (com folgas)
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restrição</TableHead>
                {problem.variableNames.map((name, i) => (
                  <TableHead key={i}>{name}</TableHead>
                ))}
                {problem.constraintNames.map((_, i) => (
                  <TableHead key={i}>s{i + 1}</TableHead>
                ))}
                <TableHead></TableHead>
                <TableHead>RHS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problem.constraintMatrix.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{problem.constraintNames[i]}</TableCell>
                  {row.map((coeff, j) => (
                    <TableCell key={j}>{coeff}</TableCell>
                  ))}
                  {problem.constraintNames.map((_, j) => (
                    <TableCell key={j}>{i === j ? 1 : 0}</TableCell>
                  ))}
                  <TableCell>=</TableCell>
                  <TableCell>{problem.constraintRhs[i]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
