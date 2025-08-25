import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineReload,
} from "react-icons/ai";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo CESMAC */}
        <div className="flex justify-center mb-8">
          <img
            src="/cesmac-logo.png"
            alt="CESMAC Centro Universitário"
            className="h-16 lg:h-20"
          />
        </div>

        {/* Ícone de erro */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-card-secondary/20 rounded-full flex items-center justify-center">
            <AiOutlineReload className="w-12 h-12 text-card-secondary" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-card-text">
            Erro no Sistema
          </h1>
          <p className="text-card-subtext text-lg">
            Ocorreu um erro inesperado. Tente novamente.
          </p>
        </div>

        {/* Componente de erro */}
        <div className="bg-card-background/50 rounded-lg p-4 border border-card-line/40">
          <ErrorComponent error={error} />
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => {
              router.invalidate();
            }}
            className="flex items-center justify-center gap-2 bg-card-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-card-secondary/90 transition-colors"
          >
            <AiOutlineReload className="w-4 h-4" />
            Tentar Novamente
          </button>

          {isRoot ? (
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-card-items text-card-text px-6 py-3 rounded-lg font-semibold hover:bg-card-items/90 transition-colors"
            >
              <AiOutlineHome className="w-4 h-4" />
              Início
            </Link>
          ) : (
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 bg-card-items text-card-text px-6 py-3 rounded-lg font-semibold hover:bg-card-items/90 transition-colors"
            >
              <AiOutlineArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
