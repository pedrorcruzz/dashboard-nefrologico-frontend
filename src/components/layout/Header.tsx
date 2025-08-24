import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  AiOutlineEye,
  AiOutlineQuestion,
  AiOutlineMenu,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";

export const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-full">
      <div className="bg-background-header h-16 px-6 flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <img
              src="/cesmac-logo.png"
              alt="CESMAC Centro Universitário"
              className="h-8"
            />
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/dash-nefro.png"
              alt="Dashboard Nefrológico"
              className="h-24"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src="/dr-cesmac.png"
              alt="Dr. CESMAC"
              className="w-26 h-35 object-contain relative top-6"
            />

            <div className="w-8 h-8 bg-icons-background rounded-lg flex items-center justify-center cursor-pointer hover:bg-icons-background-active transition-colors">
              <AiOutlineQuestion className="w-4 h-4 text-icons" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-header h-16 px-6 flex items-center justify-between border-b border-gray-200/60">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              currentPath === "/" ? "border-b-2 border-foreground pb-1" : ""
            }`}
          >
            <AiOutlineHome
              className={`w-5 h-5 ${
                currentPath === "/"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
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
            to="/pacientes"
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              currentPath === "/pacientes"
                ? "border-b-2 border-foreground pb-1"
                : ""
            }`}
          >
            <AiOutlineUser
              className={`w-5 h-5 ${
                currentPath === "/pacientes"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                currentPath === "/pacientes"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            >
              Pacientes
            </span>
          </Link>

          <Link
            to="/exames"
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              currentPath === "/exames"
                ? "border-b-2 border-foreground pb-1"
                : ""
            }`}
          >
            <AiOutlineBarChart
              className={`w-5 h-5 ${
                currentPath === "/exames"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                currentPath === "/exames"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            >
              Exames
            </span>
          </Link>

          <Link
            to="/relatorios"
            className={`flex flex-col items-center space-y-1 cursor-pointer ${
              currentPath === "/relatorios"
                ? "border-b-2 border-foreground pb-1"
                : ""
            }`}
          >
            <AiOutlineBarChart
              className={`w-5 h-5 ${
                currentPath === "/relatorios"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                currentPath === "/relatorios"
                  ? "text-text-primary"
                  : "text-text-primary/60"
              }`}
            >
              Relatórios
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
