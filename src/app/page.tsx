import { SimplexSolver } from "@/components/simplex-solver";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Simplex Solver</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Resolva problemas de programação linear utilizando o Método Simplex
      </p>
      <SimplexSolver />
    </div>
  );
}
