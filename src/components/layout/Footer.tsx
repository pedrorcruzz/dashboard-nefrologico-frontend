import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-primary border-t border-gray-200/30 py-6 px-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-1">
          <p className="text-footer text-sm">
            © {currentYear} TODOS OS DIREITOS RESERVADOS CESMAC | Dashboard
            Nefrológico | Versão 1.0
          </p>
          <p className="text-footer text-sm">
            Equipe de Desenvolvimento:{" "}
            <a
              href="https://github.com/pedrorosa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200"
            >
              Pedro Rosa
            </a>
            ,{" "}
            <a
              href="https://github.com/iagomauricio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200"
            >
              Iago Mauricio
            </a>
            ,{" "}
            <a
              href="https://github.com/tacyana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200"
            >
              Tacyana
            </a>{" "}
            e{" "}
            <a
              href="https://github.com/wagner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer hover:text-footer-active transition-colors duration-200"
            >
              Wagner
            </a>
          </p>
        </div>

        <div className="flex items-center ">
          <img
            src="/apple-touch-icon.png"
            alt="Logo CESMAC"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};
