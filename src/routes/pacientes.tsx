import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pacientes")({
  component: PacientesPage,
});

function PacientesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">
        Gestão de Pacientes
      </h1>
      <p className="text-subtext">
        Página para gerenciar pacientes do sistema de nefrologia pediátrica.
      </p>
    </div>
  );
}
