export type Cargo =
  | "Presidente"
  | "Governador de São Paulo"
  | "Senador de São Paulo"
  | "Ministro da Fazenda";

export type Posicionamento =
  | "Esquerda"
  | "Centro-esquerda"
  | "Centro"
  | "Centro-direita"
  | "Direita"
  | "Outro / Não classificado";

export type CategoriaProposta =
  | "Economia"
  | "Saúde"
  | "Educação"
  | "Segurança"
  | "Meio ambiente"
  | "Infraestrutura"
  | "Trabalho"
  | "Assistência social"
  | "Direitos civis"
  | "Tecnologia"
  | "Outros";

export const CATEGORIAS: CategoriaProposta[] = [
  "Economia",
  "Saúde",
  "Educação",
  "Segurança",
  "Meio ambiente",
  "Infraestrutura",
  "Trabalho",
  "Assistência social",
  "Direitos civis",
  "Tecnologia",
  "Outros",
];

export const POSICIONAMENTOS: Posicionamento[] = [
  "Esquerda",
  "Centro-esquerda",
  "Centro",
  "Centro-direita",
  "Direita",
  "Outro / Não classificado",
];

export interface Proposta {
  categoria: CategoriaProposta;
  tema: string;
  proposta: string;
  fonte?: string;
}

export interface Candidato {
  id: string;
  slug: string;
  nome: string;
  nomeUrna: string;
  cargo: Cargo;
  partido: string;
  siglaPartido: string;
  numero?: string;
  posicionamento: Posicionamento;
  resumo: string;
  historico: string[];
  propostas: Proposta[];
  redesSociais: { x?: string; instagram?: string; linkedin?: string };
  fontes: string[];
  dataAtualizacao: string;
  situacaoCandidatura: string;
}

const FONTE_PADRAO = [
  "Declarações públicas e material de campanha divulgado pelos partidos",
  "Cobertura de veículos de imprensa de circulação nacional",
];

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export const iniciaisDe = iniciais;

export const candidatos: Candidato[] = [
  {
    id: "c01",
    slug: "luis-inacio-lula-da-silva",
    nome: "Luis Inácio Lula da Silva",
    nomeUrna: "Lula",
    cargo: "Presidente",
    partido: "Partido dos Trabalhadores",
    siglaPartido: "PT",
    numero: "13",
    posicionamento: "Esquerda",
    resumo:
      "Candidato à reeleição à Presidência da República. Sua candidatura é apresentada com foco em programas sociais, desenvolvimento econômico e estabilidade institucional.",
    historico: [
      "Presidente da República (2003–2010 e a partir de 2023)",
      "Deputado federal por São Paulo (1987–1991)",
      "Dirigente sindical dos metalúrgicos do ABC paulista",
    ],
    propostas: [
      {
        categoria: "Assistência social",
        tema: "Programas de transferência de renda",
        proposta: "Continuidade e ampliação de programas sociais de transferência de renda.",
      },
      {
        categoria: "Economia",
        tema: "Desenvolvimento",
        proposta: "Estímulo ao crédito, ao investimento público e à reindustrialização.",
      },
      {
        categoria: "Outros",
        tema: "Institucional",
        proposta: "Ênfase em estabilidade institucional e fortalecimento de órgãos públicos.",
      },
    ],
    redesSociais: {
      x: "https://x.com/LulaOficial",
      instagram: "https://instagram.com/lulaoficial",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c02",
    slug: "flavio-bolsonaro",
    nome: "Flávio Bolsonaro",
    nomeUrna: "Flávio Bolsonaro",
    cargo: "Presidente",
    partido: "Partido Liberal",
    siglaPartido: "PL",
    numero: "22",
    posicionamento: "Direita",
    resumo:
      "Candidatura de oposição ao governo federal, apresentada com foco em pautas conservadoras, livre mercado e segurança pública.",
    historico: [
      "Senador da República pelo Rio de Janeiro",
      "Deputado estadual pelo Rio de Janeiro (2003–2019)",
    ],
    propostas: [
      {
        categoria: "Segurança",
        tema: "Segurança pública",
        proposta: "Endurecimento penal e ampliação do apoio às forças policiais.",
      },
      {
        categoria: "Economia",
        tema: "Livre mercado",
        proposta: "Redução da carga tributária e menor intervenção do Estado na economia.",
      },
      {
        categoria: "Direitos civis",
        tema: "Pautas de costumes",
        proposta: "Defesa de pautas conservadoras em temas de costumes.",
      },
    ],
    redesSociais: {
      x: "https://x.com/FlavioBolsonaro",
      instagram: "https://instagram.com/flaviobolsonaro",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c03",
    slug: "renan-santos",
    nome: "Renan Santos",
    nomeUrna: "Renan Santos",
    cargo: "Presidente",
    partido: "Missão",
    siglaPartido: "MISSÃO",
    posicionamento: "Outro / Não classificado",
    resumo:
      "Candidatura apresentada como antissistema, com foco em combate à corrupção e corte de privilégios da classe política.",
    historico: ["Atuação em movimentos políticos de mobilização civil"],
    propostas: [
      {
        categoria: "Outros",
        tema: "Combate à corrupção",
        proposta: "Endurecimento de mecanismos de controle e transparência do gasto público.",
      },
      {
        categoria: "Economia",
        tema: "Privilégios",
        proposta: "Redução de privilégios e benefícios de agentes públicos.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c04",
    slug: "ronaldo-caiado",
    nome: "Ronaldo Caiado",
    nomeUrna: "Ronaldo Caiado",
    cargo: "Presidente",
    partido: "Partido Social Democrático",
    siglaPartido: "PSD",
    posicionamento: "Centro-direita",
    resumo:
      "Candidatura de centro-direita apresentada com foco em segurança pública e no papel do agronegócio na economia.",
    historico: [
      "Governador de Goiás (a partir de 2019)",
      "Senador da República por Goiás (2015–2019)",
      "Deputado federal por Goiás",
    ],
    propostas: [
      {
        categoria: "Segurança",
        tema: "Tolerância zero ao crime",
        proposta: "Replicação nacional de políticas estaduais de segurança pública integrada.",
      },
      {
        categoria: "Economia",
        tema: "Agronegócio",
        proposta: "Fortalecimento do agronegócio e da infraestrutura de escoamento.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/ronaldocaiado" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c05",
    slug: "romeu-zema",
    nome: "Romeu Zema",
    nomeUrna: "Romeu Zema",
    cargo: "Presidente",
    partido: "Novo",
    siglaPartido: "NOVO",
    posicionamento: "Direita",
    resumo:
      "Candidatura de perfil liberal econômico, apresentada com foco em privatizações, corte de gastos e desburocratização.",
    historico: [
      "Governador de Minas Gerais (a partir de 2019)",
      "Atuação anterior no setor privado (varejo)",
    ],
    propostas: [
      {
        categoria: "Economia",
        tema: "Privatizações",
        proposta: "Transferência de empresas e serviços estatais à iniciativa privada.",
      },
      {
        categoria: "Economia",
        tema: "Gasto público",
        proposta: "Corte de despesas e revisão de estruturas administrativas.",
      },
      {
        categoria: "Outros",
        tema: "Desburocratização",
        proposta: "Simplificação de processos e redução de exigências regulatórias.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/romeuzema" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c06",
    slug: "leonardo-avalanche",
    nome: "Leonardo Avalanche",
    nomeUrna: "Leonardo Avalanche",
    cargo: "Presidente",
    partido: "Partido Renovador Trabalhista Brasileiro",
    siglaPartido: "PRTB",
    posicionamento: "Outro / Não classificado",
    resumo: "Informação não disponível.",
    historico: [],
    propostas: [],
    redesSociais: {},
    fontes: [],
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Ainda não informado.",
  },
  {
    id: "c07",
    slug: "edmilson-dias",
    nome: "Edmilson Dias",
    nomeUrna: "Edmilson Dias",
    cargo: "Presidente",
    partido: "Partido Comunista Brasileiro",
    siglaPartido: "PCB",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com foco em estatização de setores estratégicos, reforma agrária e direitos trabalhistas.",
    historico: ["Atuação em movimentos sindicais e partidários"],
    propostas: [
      {
        categoria: "Economia",
        tema: "Estatização",
        proposta: "Controle estatal de setores considerados estratégicos.",
      },
      {
        categoria: "Trabalho",
        tema: "Direitos trabalhistas",
        proposta: "Ampliação de direitos trabalhistas e revogação de flexibilizações.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c08",
    slug: "hertz-dias",
    nome: "Hertz Dias",
    nomeUrna: "Hertz Dias",
    cargo: "Presidente",
    partido: "Partido Socialista dos Trabalhadores Unificado",
    siglaPartido: "PSTU",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com foco em estatização de setores estratégicos, reforma agrária e direitos trabalhistas.",
    historico: ["Atuação em movimentos sindicais"],
    propostas: [
      {
        categoria: "Economia",
        tema: "Estatização",
        proposta: "Controle estatal de setores considerados estratégicos.",
      },
      {
        categoria: "Trabalho",
        tema: "Direitos trabalhistas",
        proposta: "Ampliação de direitos trabalhistas.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c09",
    slug: "samara-martins",
    nome: "Samara Martins",
    nomeUrna: "Samara Martins",
    cargo: "Presidente",
    partido: "Unidade Popular",
    siglaPartido: "UP",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com foco em estatização de setores estratégicos, reforma agrária e direitos trabalhistas.",
    historico: ["Atuação em movimentos populares"],
    propostas: [
      {
        categoria: "Economia",
        tema: "Reforma agrária",
        proposta: "Programa de reforma agrária e distribuição de terras.",
      },
      {
        categoria: "Trabalho",
        tema: "Direitos trabalhistas",
        proposta: "Ampliação de direitos trabalhistas.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c10",
    slug: "augusto-cury",
    nome: "Augusto Cury",
    nomeUrna: "Augusto Cury",
    cargo: "Presidente",
    partido: "Avante",
    siglaPartido: "AVANTE",
    posicionamento: "Outro / Não classificado",
    resumo:
      "Candidatura apresentada com foco em saúde mental, educação e proposta de transição para o semipresidencialismo.",
    historico: ["Médico psiquiatra e escritor"],
    propostas: [
      {
        categoria: "Saúde",
        tema: "Saúde mental",
        proposta: "Política nacional de prevenção e cuidado em saúde mental.",
      },
      {
        categoria: "Educação",
        tema: "Educação socioemocional",
        proposta: "Inclusão de formação socioemocional nas escolas.",
      },
      {
        categoria: "Outros",
        tema: "Sistema de governo",
        proposta: "Transição para o semipresidencialismo.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/augustocury" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c11",
    slug: "wilson-grassi",
    nome: "Wilson Grassi",
    nomeUrna: "Wilson Grassi",
    cargo: "Presidente",
    partido: "Democrata",
    siglaPartido: "DEMOCRATA",
    posicionamento: "Outro / Não classificado",
    resumo:
      "Candidatura apresentada com foco em pautas de proteção animal ligadas à saúde, educação e incentivo ao empreendedorismo.",
    historico: ["Atuação em causas de proteção animal"],
    propostas: [
      {
        categoria: "Direitos civis",
        tema: "Proteção animal",
        proposta: "Políticas públicas de proteção animal.",
      },
      {
        categoria: "Economia",
        tema: "Empreendedorismo",
        proposta: "Incentivo a pequenos negócios e empreendedorismo.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c12",
    slug: "tarcisio-de-freitas",
    nome: "Tarcísio de Freitas",
    nomeUrna: "Tarcísio",
    cargo: "Governador de São Paulo",
    partido: "Republicanos",
    siglaPartido: "REPUBLICANOS",
    numero: "10",
    posicionamento: "Centro-direita",
    resumo:
      "Candidatura à reeleição ao Governo de São Paulo, apresentada com foco em privatizações e grandes obras de infraestrutura.",
    historico: [
      "Governador do Estado de São Paulo (a partir de 2023)",
      "Ministro da Infraestrutura (2019–2022)",
      "Engenheiro militar de formação",
    ],
    propostas: [
      {
        categoria: "Infraestrutura",
        tema: "Obras e mobilidade",
        proposta: "Expansão de linhas de metrô e concessões rodoviárias.",
      },
      {
        categoria: "Economia",
        tema: "Privatizações",
        proposta: "Concessão e privatização de serviços estaduais.",
      },
      {
        categoria: "Segurança",
        tema: "Policiamento",
        proposta: "Ampliação de efetivo e uso de tecnologia no policiamento.",
      },
    ],
    redesSociais: {
      x: "https://x.com/tarcisiogdf",
      instagram: "https://instagram.com/tarcisiogdf",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c13",
    slug: "fernando-haddad",
    nome: "Fernando Haddad",
    nomeUrna: "Haddad",
    cargo: "Governador de São Paulo",
    partido: "Partido dos Trabalhadores",
    siglaPartido: "PT",
    posicionamento: "Esquerda",
    resumo:
      "Atual Ministro da Fazenda, citado como pré-candidato em São Paulo. Plataforma associada a reindustrialização, segurança pública e oposição a privatizações.",
    historico: [
      "Ministro da Fazenda (a partir de 2023)",
      "Prefeito de São Paulo (2013–2016)",
      "Ministro da Educação (2005–2012)",
    ],
    propostas: [
      {
        categoria: "Economia",
        tema: "Reindustrialização",
        proposta: "Política industrial e crédito para a indústria paulista.",
      },
      {
        categoria: "Economia",
        tema: "Serviços públicos",
        proposta: "Oposição à privatização de empresas públicas estaduais.",
      },
      {
        categoria: "Segurança",
        tema: "Segurança pública",
        proposta: "Integração de inteligência policial e prevenção.",
      },
    ],
    redesSociais: {
      x: "https://x.com/Haddad_Fernando",
      instagram: "https://instagram.com/fernandohaddadoficial",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Nome citado publicamente. Candidatura não confirmada.",
  },
  {
    id: "c14",
    slug: "carlos-machado",
    nome: "Carlos Machado",
    nomeUrna: "Carlos Machado",
    cargo: "Governador de São Paulo",
    partido: "Partido Comunista Brasileiro",
    siglaPartido: "PCB",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com defesa de estatizações e de um modelo de orçamento participativo popular.",
    historico: ["Atuação partidária e em movimentos sociais"],
    propostas: [
      {
        categoria: "Economia",
        tema: "Estatização",
        proposta: "Reversão de privatizações estaduais.",
      },
      {
        categoria: "Outros",
        tema: "Participação popular",
        proposta: "Orçamento participativo estadual.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c15",
    slug: "vivian-mendes",
    nome: "Vivian Mendes",
    nomeUrna: "Vivian Mendes",
    cargo: "Governador de São Paulo",
    partido: "Unidade Popular",
    siglaPartido: "UP",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com foco em moradia nas periferias e em direitos das mulheres.",
    historico: ["Atuação em movimentos de moradia"],
    propostas: [
      {
        categoria: "Assistência social",
        tema: "Moradia",
        proposta: "Programa estadual de moradia popular nas periferias.",
      },
      {
        categoria: "Direitos civis",
        tema: "Direitos das mulheres",
        proposta: "Rede de proteção e políticas para mulheres.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c16",
    slug: "izadora-dias",
    nome: "Izadora Dias",
    nomeUrna: "Izadora Dias",
    cargo: "Governador de São Paulo",
    partido: "Partido da Causa Operária",
    siglaPartido: "PCO",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com defesa de direitos trabalhistas e de estatização de setores da economia.",
    historico: ["Atuação partidária"],
    propostas: [
      {
        categoria: "Trabalho",
        tema: "Direitos trabalhistas",
        proposta: "Defesa ampla de direitos trabalhistas.",
      },
      {
        categoria: "Economia",
        tema: "Estatização",
        proposta: "Estatização de setores estratégicos.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c17",
    slug: "vera-lucia",
    nome: "Vera Lúcia",
    nomeUrna: "Vera",
    cargo: "Governador de São Paulo",
    partido: "Partido Socialista dos Trabalhadores Unificado",
    siglaPartido: "PSTU",
    posicionamento: "Esquerda",
    resumo:
      "Candidatura apresentada com defesa de direitos trabalhistas e de estatização de setores da economia.",
    historico: ["Dirigente sindical"],
    propostas: [
      {
        categoria: "Trabalho",
        tema: "Direitos trabalhistas",
        proposta: "Defesa ampla de direitos trabalhistas.",
      },
      {
        categoria: "Economia",
        tema: "Estatização",
        proposta: "Estatização de setores estratégicos.",
      },
    ],
    redesSociais: {},
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c18",
    slug: "marina-silva",
    nome: "Marina Silva",
    nomeUrna: "Marina Silva",
    cargo: "Senador de São Paulo",
    partido: "Rede Sustentabilidade",
    siglaPartido: "REDE",
    posicionamento: "Centro-esquerda",
    resumo:
      "Candidatura apresentada com foco em sustentabilidade e transição ecológica da economia.",
    historico: [
      "Ministra do Meio Ambiente (2003–2008 e a partir de 2023)",
      "Senadora da República pelo Acre (1995–2011)",
    ],
    propostas: [
      {
        categoria: "Meio ambiente",
        tema: "Transição ecológica",
        proposta: "Economia de baixo carbono e combate ao desmatamento.",
      },
      {
        categoria: "Economia",
        tema: "Economia verde",
        proposta: "Incentivos a setores sustentáveis.",
      },
    ],
    redesSociais: {
      x: "https://x.com/MarinaSilva",
      instagram: "https://instagram.com/silva_marina",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Nome citado publicamente. Candidatura não confirmada.",
  },
  {
    id: "c19",
    slug: "simone-tebet",
    nome: "Simone Tebet",
    nomeUrna: "Simone Tebet",
    cargo: "Senador de São Paulo",
    partido: "Partido Socialista Brasileiro",
    siglaPartido: "PSB",
    posicionamento: "Centro",
    resumo:
      "Candidatura apresentada com foco em equilíbrio entre responsabilidade fiscal e investimento em projetos sociais.",
    historico: [
      "Ministra do Planejamento e Orçamento (a partir de 2023)",
      "Senadora da República por Mato Grosso do Sul (2015–2023)",
    ],
    propostas: [
      {
        categoria: "Economia",
        tema: "Responsabilidade fiscal",
        proposta: "Controle de gastos com preservação de investimentos sociais.",
      },
      {
        categoria: "Assistência social",
        tema: "Projetos sociais",
        proposta: "Investimento em programas sociais focalizados.",
      },
    ],
    redesSociais: {
      x: "https://x.com/simonetebetbr",
      instagram: "https://instagram.com/simonetebet",
    },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Nome citado publicamente. Candidatura não confirmada.",
  },
  {
    id: "c20",
    slug: "guilherme-derrite",
    nome: "Guilherme Derrite",
    nomeUrna: "Derrite",
    cargo: "Senador de São Paulo",
    partido: "Progressistas",
    siglaPartido: "PP",
    posicionamento: "Direita",
    resumo:
      "Candidatura apresentada com foco em endurecimento penal, fim das chamadas saidinhas de presos e apoio às polícias.",
    historico: [
      "Secretário de Segurança Pública de São Paulo",
      "Deputado federal por São Paulo",
      "Policial militar de carreira",
    ],
    propostas: [
      {
        categoria: "Segurança",
        tema: "Endurecimento penal",
        proposta: "Aumento de penas e restrição de benefícios prisionais.",
      },
      {
        categoria: "Segurança",
        tema: "Apoio policial",
        proposta: "Ampliação de estrutura e proteção jurídica às polícias.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/guilhermederrite" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c21",
    slug: "ricardo-salles",
    nome: "Ricardo Salles",
    nomeUrna: "Ricardo Salles",
    cargo: "Senador de São Paulo",
    partido: "Novo",
    siglaPartido: "NOVO",
    posicionamento: "Direita",
    resumo:
      "Candidatura apresentada com foco em privatizações, corte de gastos públicos e pautas conservadoras.",
    historico: [
      "Ministro do Meio Ambiente (2019–2021)",
      "Deputado federal por São Paulo",
      "Secretário estadual do Meio Ambiente de São Paulo",
    ],
    propostas: [
      {
        categoria: "Economia",
        tema: "Privatizações",
        proposta: "Privatização de empresas públicas federais.",
      },
      {
        categoria: "Economia",
        tema: "Gasto público",
        proposta: "Corte de despesas e revisão de programas federais.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/ricardossalles" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
  {
    id: "c22",
    slug: "andre-do-prado",
    nome: "André do Prado",
    nomeUrna: "André do Prado",
    cargo: "Senador de São Paulo",
    partido: "Partido Liberal",
    siglaPartido: "PL",
    posicionamento: "Centro-direita",
    resumo:
      "Candidatura apresentada com foco no envio de verbas federais diretamente para os municípios e no agronegócio paulista.",
    historico: [
      "Presidente da Assembleia Legislativa de São Paulo",
      "Deputado estadual por São Paulo",
    ],
    propostas: [
      {
        categoria: "Economia",
        tema: "Municípios",
        proposta: "Transferência direta de verbas federais aos municípios.",
      },
      {
        categoria: "Economia",
        tema: "Agronegócio",
        proposta: "Apoio ao agronegócio paulista.",
      },
    ],
    redesSociais: { instagram: "https://instagram.com/andredopradooficial" },
    fontes: FONTE_PADRAO,
    dataAtualizacao: "12/08/2026",
    situacaoCandidatura: "Pré-candidatura anunciada",
  },
];

export const CARGOS: Cargo[] = [
  "Presidente",
  "Governador de São Paulo",
  "Senador de São Paulo",
];

export const partidos = Array.from(
  new Set(candidatos.map((c) => c.siglaPartido)),
).sort();

export const getCandidato = (slug: string) =>
  candidatos.find((c) => c.slug === slug);

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const buscarCandidatos = (termo: string): Candidato[] => {
  const t = normalize(termo.trim());
  if (!t) return [];
  return candidatos.filter((c) =>
    [c.nome, c.nomeUrna, c.partido, c.siglaPartido, c.cargo, c.numero ?? ""]
      .map(normalize)
      .some((campo) => campo.includes(t)),
  );
};

export const DATA_ATUALIZACAO_GERAL = "12/08/2026";
