export interface Pesquisa {
  id: string;
  instituto: string;
  cargo: "Presidente" | "Governador de São Paulo" | "Senador de São Paulo";
  turno: "1º turno" | "2º turno";
  dataPublicacao: string; // ISO
  periodoColeta: string;
  entrevistados?: number;
  margemErro?: string;
  metodologia?: string;
  fonte: string;
  resultados: { candidato: string; percentual: number }[];
}

export const pesquisas: Pesquisa[] = [
  {
    id: "p1",
    instituto: "Instituto A",
    cargo: "Presidente",
    turno: "1º turno",
    dataPublicacao: "2026-03-10",
    periodoColeta: "05/03/2026 a 08/03/2026",
    entrevistados: 2000,
    margemErro: "± 2 pontos percentuais",
    metodologia: "Entrevistas presenciais com questionário estruturado",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Lula", percentual: 34 },
      { candidato: "Flávio Bolsonaro", percentual: 24 },
      { candidato: "Ronaldo Caiado", percentual: 8 },
      { candidato: "Romeu Zema", percentual: 7 },
      { candidato: "Outros", percentual: 12 },
      { candidato: "Brancos/nulos/indecisos", percentual: 15 },
    ],
  },
  {
    id: "p2",
    instituto: "Instituto B",
    cargo: "Presidente",
    turno: "1º turno",
    dataPublicacao: "2026-05-14",
    periodoColeta: "09/05/2026 a 12/05/2026",
    entrevistados: 2400,
    margemErro: "± 2 pontos percentuais",
    metodologia: "Entrevistas por telefone",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Lula", percentual: 35 },
      { candidato: "Flávio Bolsonaro", percentual: 26 },
      { candidato: "Ronaldo Caiado", percentual: 9 },
      { candidato: "Romeu Zema", percentual: 6 },
      { candidato: "Outros", percentual: 11 },
      { candidato: "Brancos/nulos/indecisos", percentual: 13 },
    ],
  },
  {
    id: "p3",
    instituto: "Instituto A",
    cargo: "Presidente",
    turno: "1º turno",
    dataPublicacao: "2026-07-22",
    periodoColeta: "17/07/2026 a 20/07/2026",
    entrevistados: 2100,
    margemErro: "± 2 pontos percentuais",
    metodologia: "Entrevistas presenciais com questionário estruturado",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Lula", percentual: 33 },
      { candidato: "Flávio Bolsonaro", percentual: 28 },
      { candidato: "Ronaldo Caiado", percentual: 10 },
      { candidato: "Romeu Zema", percentual: 6 },
      { candidato: "Outros", percentual: 10 },
      { candidato: "Brancos/nulos/indecisos", percentual: 13 },
    ],
  },
  {
    id: "p4",
    instituto: "Instituto B",
    cargo: "Presidente",
    turno: "2º turno",
    dataPublicacao: "2026-07-25",
    periodoColeta: "20/07/2026 a 23/07/2026",
    entrevistados: 2400,
    margemErro: "± 2 pontos percentuais",
    metodologia: "Entrevistas por telefone",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Lula", percentual: 45 },
      { candidato: "Flávio Bolsonaro", percentual: 42 },
      { candidato: "Brancos/nulos/indecisos", percentual: 13 },
    ],
  },
  {
    id: "p5",
    instituto: "Instituto C",
    cargo: "Governador de São Paulo",
    turno: "1º turno",
    dataPublicacao: "2026-06-18",
    periodoColeta: "13/06/2026 a 16/06/2026",
    entrevistados: 1600,
    margemErro: "± 3 pontos percentuais",
    metodologia: "Entrevistas presenciais no estado de São Paulo",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Tarcísio", percentual: 38 },
      { candidato: "Haddad", percentual: 31 },
      { candidato: "Outros", percentual: 12 },
      { candidato: "Brancos/nulos/indecisos", percentual: 19 },
    ],
  },
  {
    id: "p6",
    instituto: "Instituto C",
    cargo: "Governador de São Paulo",
    turno: "1º turno",
    dataPublicacao: "2026-08-05",
    periodoColeta: "31/07/2026 a 03/08/2026",
    entrevistados: 1600,
    margemErro: "± 3 pontos percentuais",
    metodologia: "Entrevistas presenciais no estado de São Paulo",
    fonte: "Registro público da pesquisa",
    resultados: [
      { candidato: "Tarcísio", percentual: 39 },
      { candidato: "Haddad", percentual: 33 },
      { candidato: "Outros", percentual: 11 },
      { candidato: "Brancos/nulos/indecisos", percentual: 17 },
    ],
  },
];

export const institutos = Array.from(new Set(pesquisas.map((p) => p.instituto))).sort();

export const formatarData = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR");
