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
  variableNames: string[];
  constraintNames: string[];
  tableauHistory: number[][][];
}

export function TableauDisplay({
  tableauHistory,
  variableNames,
  constraintNames,
}: TableauDisplayProps) {
  // Gerar nomes para as colunas do tableau
  const columnNames = [
    ...variableNames,
    ...constraintNames.map((_, i) => `s${i + 1}`),
    "RHS",
  ];

  // Gerar nomes para as linhas do tableau
  const rowNames = [...constraintNames, "Z"];

  return (
    <>
      {tableauHistory.map((tableau, i) => (
        <Card key={i} className="mb-4">
          <CardHeader>
            <CardTitle>
              Tableau{" "}
              {i + 1 === tableauHistory.length ? "Final" : `Interação ${i + 1}`}
            </CardTitle>
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
      ))}
    </>
  );
}
