const diagnosisTranslations: Record<string, string> = {
  "Cyst of kidney": "Cisto renal",
  "Acute renal failure, unspecified":
    "Insuficiência renal aguda, não especificada",
  "Disorder of kidney and ureter, unspecified":
    "Transtorno do rim e ureter, não especificado",
  "Acute nephritic syndrome": "Síndrome nefrítica aguda",
  "Chronic kidney disease": "Doença renal crônica",
  "Nephrotic syndrome": "Síndrome nefrótica",
  "Renal colic": "Cólica renal",
  Hydronephrosis: "Hidronefrose",
  Pyelonephritis: "Pielonefrite",
  Glomerulonephritis: "Glomerulonefrite",
  "Renal insufficiency": "Insuficiência renal",
  "Kidney stone": "Cálculo renal",
  "Renal cyst": "Cisto renal",
  "Polycystic kidney disease": "Doença renal policística",
  "Diabetic nephropathy": "Nefropatia diabética",
  "Hypertensive nephropathy": "Nefropatia hipertensiva",
  "Renal artery stenosis": "Estenose da artéria renal",
  "Renal vein thrombosis": "Trombose da veia renal",
  "Renal abscess": "Abscesso renal",
  "Renal tumor": "Tumor renal",

  // Diagnósticos urológicos e ginecológicos
  "Inflammatory disorders of scrotum": "Transtornos inflamatórios do escroto",
  "Female pelvic inflammatory disease, unspecified":
    "Doença inflamatória pélvica feminina, não especificada",

  // Diagnósticos gerais comuns
  "Unspecified disorder": "Transtorno não especificado",
  "Other specified disorder": "Outro transtorno especificado",
  "Complication of procedure": "Complicação de procedimento",
  "Postprocedural disorder": "Transtorno pós-procedimento",

  // Diagnósticos adicionais
  "Calculus of kidney": "Cálculo renal",
  "Chronic kidney disease, unspecified":
    "Doença renal crônica, não especificada",
  Hydroureter: "Hidroureter",
  "Kinking and stricture of ureter without hydronephrosis":
    "Torção e estenose do ureter sem hidronefrose",
  "Neuromuscular dysfunction of bladder, unspecified":
    "Disfunção neuromuscular da bexiga, não especificada",
  "Noninflammatory disorder of ovary, fallopian tube and broad ligament, unspecified":
    "Transtorno não inflamatório do ovário, trompa de falópio e ligamento largo, não especificado",
  "Other and unspecified hydronephrosis":
    "Outras hidronefroses não especificadas",
};

/**
 * Traduz o título de um diagnóstico de inglês para português
 * @param title - Título do diagnóstico em inglês
 * @returns Título traduzido em português ou o título original se não encontrado
 */
export function translateDiagnosisTitle(title: string): string {
  return diagnosisTranslations[title] || title;
}

/**
 * Adiciona uma nova tradução ao dicionário
 * @param english - Termo em inglês
 * @param portuguese - Termo em português
 */
export function addDiagnosisTranslation(
  english: string,
  portuguese: string
): void {
  diagnosisTranslations[english] = portuguese;
}

/**
 * @returns Objeto com todas as traduções
 */
export function getAllTranslations(): Record<string, string> {
  return { ...diagnosisTranslations };
}

/**
 * Formata números com separador de milhares usando ponto (.)
 * @param value - Número a ser formatado
 * @returns String formatada com ponto como separador de milhares
 */
export function formatNumberWithDot(value: number): string {
  return value.toLocaleString("pt-BR").replace(",", ".");
}
