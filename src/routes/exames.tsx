import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exames")({
  component: ExamesPage,
});

function ExamesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">
        Resultados de Exames
      </h1>
      <p className="text-subtext">
        Página para visualizar e gerenciar resultados de exames dos pacientes.
      </p>
    </div>
  );
}
