import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqData: FAQItem[] = [
  {
    question: "Qual é o objetivo deste projeto?",
    answer:
      "Este dashboard foi criado pelo CESMAC para controlar e visualizar dados nefrológicos de forma centralizada. O sistema permite monitorar pacientes, exames e diagnósticos relacionados à nefrologia, facilitando a gestão clínica e administrativa.",
  },
  {
    question: "De onde vêm os dados utilizados?",
    answer:
      "Os dados são baseados no MIMIC-IV (Medical Information Mart for Intensive Care), um grande conjunto de dados médicos desidentificados de pacientes admitidos em unidades de terapia intensiva. O MIMIC-IV é uma referência mundial em pesquisa médica e está disponível no PhysioNet.",
  },
  {
    question: "O que significa CID-10?",
    answer:
      "CID-10 é a Classificação Internacional de Doenças, 10ª revisão. É um sistema de códigos usado para classificar doenças e outros problemas de saúde. Cada diagnóstico tem um código único (ex: N28.100 para Cisto renal).",
  },
  {
    question: "Como funciona a tradução dos diagnósticos?",
    answer:
      "O sistema traduz automaticamente os diagnósticos do inglês para o português. Atualmente temos 42 diagnósticos traduzidos, incluindo condições renais, urológicas e ginecológicas.",
  },
  {
    question: "Quantos tipos de exames são realizados?",
    answer:
      "O sistema registra 6 categorias principais de exames nefrológicos: Creatinina, Ureia, Ácido úrico, Proteinúria, Microalbuminúria e Clearance de creatinina.",
  },
  {
    question: "Quais são os diagnósticos mais frequentes?",
    answer:
      "Os diagnósticos mais frequentes incluem condições como Cisto renal, Insuficiência renal aguda, Transtornos do rim e ureter, Síndrome nefrítica aguda, Doença renal crônica, Síndrome nefrótica, Cólica renal, Hidronefrose, Pielonefrite e Glomerulonefrite.",
  },
  {
    question: "O que significam os gráficos de distribuição?",
    answer:
      "Os gráficos mostram a distribuição dos dados: Gráfico de barras para pacientes por idade, gráfico de pizza para distribuição de exames, e listas horizontais para diagnósticos mais frequentes.",
  },
  {
    question: "Como os dados são atualizados?",
    answer:
      "Os dados são carregados automaticamente quando você acessa o dashboard. Para ver informações atualizadas, basta recarregar a página. O sistema busca dados diretamente no banco de dados, garantindo que você sempre tenha acesso às informações mais recentes.",
  },
];

export const FAQPopup = ({ isOpen, onClose }: FAQPopupProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevenir scroll do body quando popup está aberto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden z-[10000] animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <AiOutlineQuestionCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Perguntas Frequentes
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Fechar FAQ"
          >
            <AiOutlineClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={`faq-${index}-${item.question.slice(0, 20)}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`text-gray-500 transition-transform ${
                      expandedItems.has(index) ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {expandedItems.has(index) && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
