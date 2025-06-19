import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableauDisplayProps {
  tableau: number[][];
  variableNames: string[];
  constraintNames: string[];
}

export function TableauDisplay({
  tableau,
  variableNames,
  constraintNames,
}: TableauDisplayProps) {
  console.log(constraintNames)
  // Gerar nomes para as colunas do tableau
  const columnNames = [
    ...variableNames,
    ...constraintNames.map((_, i) => `s${i + 1}`),
    "RHS",
  ];

  // Gerar nomes para as linhas do tableau
  const rowNames = [...constraintNames, "Z"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tableau Final</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Base</TableHead>
                {columnNames.map((name, i) => (
                  <TableHead key={i}>{name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableau.map((row, i) => (
                <TableRow
                  key={i}
                  className={i === tableau.length - 1 ? "font-bold" : ""}
                >
                  <TableCell>{rowNames[i]}</TableCell>
                  {row.map((value, j) => (
                    <TableCell key={j}>{value.toFixed(4)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
