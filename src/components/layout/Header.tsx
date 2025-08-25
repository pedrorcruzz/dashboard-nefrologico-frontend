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
    <div className="w-full fixed top-0 left-0 right-0 z-50">
      <div className="bg-background-header h-20 lg:h-24 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <img
              src="/cesmac-logo.png"
              alt="CESMAC Centro Universitário"
              className="h-6 lg:h-8"
            />
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/sistemas_info.png"
              alt="Sistemas de Informação"
              className="h-18 lg:h-20"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src="/dr-cesmac.png"
              alt="Dr. CESMAC"
              className="w-26 h-34 object-contain relative top-4"
            />

            <div className="w-8 h-8 bg-icons-background rounded-lg flex items-center justify-center cursor-pointer hover:bg-icons-background-active transition-colors relative -top-4 -left-4">
              <AiOutlineQuestion className="w-4 h-4 text-icons" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background-header h-16 px-4 lg:px-6 flex items-center justify-between border-b border-gray-200/60 -mt-2 lg:-mt-4">
        <div className="flex items-center space-x-4 lg:space-x-8 overflow-x-auto">
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

          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
            <img
              src="/dr-cesmac.png"
              alt="Dr. CESMAC"
              className="w-16 h-20 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="md:hidden absolute top-4 right-4 w-6 h-6 bg-icons-background rounded-lg flex items-center justify-center cursor-pointer hover:bg-icons-background-active transition-colors z-10">
        <AiOutlineQuestion className="w-3 h-3 text-icons" />
      </div>
    </div>
  );
};
