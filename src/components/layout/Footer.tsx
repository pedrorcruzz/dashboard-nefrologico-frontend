import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-background border-t border-gray-200/30 py-6 md:py-14 px-4 md:px-10">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2 md:space-y-1 text-center md:text-left">
          <p className="text-footer text-xs md:text-sm">
            © {currentYear} TODOS OS DIREITOS RESERVADOS CESMAC | Dashboard
            Nefrológico | Versão 1.0
          </p>
          <p className="text-footer text-xs md:text-sm">
            Equipe de Desenvolvimento:{" "}
            <a
              href="https://github.com/pedrorosa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200 font-medium"
            >
              Pedro Rosa
            </a>
            ,{" "}
            <a
              href="https://github.com/iagomauricio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200 font-medium"
            >
              Iago Mauricio
            </a>
            ,{" "}
            <a
              href="https://github.com/tacyana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200 font-medium"
            >
              Tacyana
            </a>{" "}
            e{" "}
            <a
              href="https://github.com/wagner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200 font-medium"
            >
              Wagner
            </a>
          </p>
        </div>

        <div className="hidden md:flex items-center">
          <img
            src="/apple-touch-icon.png"
            alt="Logo CESMAC"
            className="w-12 h-12 object-contain"
          />
        </div>

        <div className="md:hidden flex justify-center pt-2">
          <img
            src="/apple-touch-icon.png"
            alt="Logo CESMAC"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};
