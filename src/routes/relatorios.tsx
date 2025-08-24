import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/relatorios")({
  component: RelatoriosPage,
});

function RelatoriosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">
        Relatórios Médicos
      </h1>
      <p className="text-subtext">
        Página para gerar e visualizar relatórios médicos dos pacientes.
      </p>
    </div>
  );
}
