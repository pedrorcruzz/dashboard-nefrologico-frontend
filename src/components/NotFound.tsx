import { Link } from "@tanstack/react-router";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineFileSearch,
} from "react-icons/ai";

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="min-h-screen bg-background-primary flex items-start justify-center pt-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <img
            src="/cesmac-logo.png"
            alt="CESMAC Centro Universitário"
            className="h-16 lg:h-18"
          />
        </div>

        <div className="flex justify-center">
          <div className="w-20 h-20 bg-card-secondary/20 rounded-full flex items-center justify-center">
            <AiOutlineFileSearch className="w-10 h-10 text-card-secondary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-card-text">
            Página não encontrada
          </h1>
          <p className="text-card-subtext text-base">
            {children || "A página que você está procurando não existe."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-[#0169AD] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0169AD]/90 transition-colors text-base cursor-pointer"
          >
            <AiOutlineArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-card-items text-white px-6 py-3 rounded-lg font-semibold hover:bg-card-items/90 transition-colors text-base cursor-pointer"
          >
            <AiOutlineHome className="w-4 h-4" />
            Início
          </Link>
        </div>
      </div>
    </div>
  );
}
