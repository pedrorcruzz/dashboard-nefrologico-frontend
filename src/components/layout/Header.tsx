import { useId } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  AiOutlineQuestion,
  AiOutlineBarChart,
  AiOutlineHome,
} from "react-icons/ai";
import { FAQPopup } from "../FAQPopup";
import { useFAQPopup } from "../../hooks/useFAQPopup";

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigationId = useId();
  const { isOpen, openPopup, closePopup } = useFAQPopup();

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <div className="bg-background-header h-20 lg:h-24 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <img
              src="/cesmac-logo.png"
              alt="CESMAC Centro Universitário - Logo"
              className="h-6 lg:h-8"
            />
          </div>

          <div className="flex items-center space-x-2">
            <img
              src="/sistemas_info.png"
              alt="Sistemas de Informação - Logo"
              className="h-18 lg:h-20"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src="/dr-cesmac.png"
              alt="Dr. CESMAC - Personagem mascote"
              className="w-26 h-34 object-contain relative top-4"
            />

            <button
              type="button"
              onClick={openPopup}
              className="w-8 h-8 bg-icons-background rounded-lg flex items-center justify-center hover:bg-icons-background-active transition-colors relative -top-4 -left-4 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 cursor-pointer"
              aria-label="Abrir ajuda e informações"
              title="Ajuda e informações"
            >
              <AiOutlineQuestion
                className="w-4 h-4 text-icons"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <nav
        id={navigationId}
        className="bg-background-header h-16 px-4 lg:px-6 flex items-center justify-between border-b border-gray-200/60 -mt-2 lg:-mt-4"
        aria-label="Navegação principal"
      >
        <div className="flex items-center space-x-4 lg:space-x-8 overflow-x-auto">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 focus:outline-none p-1 ${
              currentPath === "/" ? "border-b-2 border-foreground pb-1" : ""
            }`}
            aria-current={currentPath === "/" ? "page" : undefined}
            aria-label="Ir para página de resumo"
          >
            <AiOutlineHome
              className={`w-5 h-5 ${
                currentPath === "/"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-sm font-medium ${
                currentPath === "/"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            >
              Resumo
            </span>
          </Link>

          <Link
            to="/relatorios"
            className={`flex flex-col items-center space-y-1 focus:outline-none p-1 ${
              currentPath === "/relatorios"
                ? "border-b-2 border-foreground pb-1"
                : ""
            }`}
            aria-current={currentPath === "/relatorios" ? "page" : undefined}
            aria-label="Ir para registros de diagnósticos"
          >
            <AiOutlineBarChart
              className={`w-5 h-5 ${
                currentPath === "/relatorios"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-sm font-medium ${
                currentPath === "/relatorios"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            >
              Registros
            </span>
          </Link>

          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
            <img
              src="/dr-cesmac.png"
              alt="Dr. CESMAC - Personagem mascote"
              className="w-16 h-20 object-contain"
            />
          </div>
        </div>
      </nav>

      <button
        type="button"
        onClick={openPopup}
        className="md:hidden absolute top-4 right-4 w-6 h-6 bg-icons-background rounded-lg flex items-center justify-center hover:bg-icons-background-active transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 cursor-pointer"
        aria-label="Abrir menu de ajuda"
        title="Ajuda"
      >
        <AiOutlineQuestion className="w-3 h-3 text-icons" aria-hidden="true" />
      </button>

      {/* FAQ Popup */}
      <FAQPopup isOpen={isOpen} onClose={closePopup} />
    </header>
  );
};
