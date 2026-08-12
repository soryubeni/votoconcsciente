export interface Artigo {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string[];
}

export const artigos: Artigo[] = [
  {
    slug: "o-que-e-esquerda",
    titulo: "O que é esquerda?",
    resumo: "Como o termo costuma ser usado no debate político.",
    conteudo: [
      "No debate político, o termo 'esquerda' costuma se referir a posições que defendem maior participação do Estado na economia e políticas voltadas à redução de desigualdades.",
      "É comum que grupos de esquerda defendam programas sociais amplos, direitos trabalhistas e serviços públicos administrados pelo Estado.",
      "O termo é amplo: existem grupos de esquerda com propostas bem diferentes entre si.",
    ],
  },
  {
    slug: "o-que-e-direita",
    titulo: "O que é direita?",
    resumo: "Como o termo costuma ser usado no debate político.",
    conteudo: [
      "O termo 'direita' costuma se referir a posições que defendem menor intervenção do Estado na economia e maior espaço para a iniciativa privada.",
      "É comum que grupos de direita defendam redução de impostos, privatizações e políticas de segurança mais rígidas.",
      "Assim como a esquerda, o termo é amplo e reúne grupos com propostas diferentes entre si.",
    ],
  },
  {
    slug: "o-que-e-centro",
    titulo: "O que é centro?",
    resumo: "Posições intermediárias entre esquerda e direita.",
    conteudo: [
      "O 'centro' reúne posições intermediárias, que combinam elementos associados à esquerda e à direita.",
      "Grupos de centro costumam defender acordos entre diferentes forças políticas e mudanças graduais.",
    ],
  },
  {
    slug: "o-que-faz-um-presidente",
    titulo: "O que faz um presidente?",
    resumo: "As funções do chefe do Poder Executivo federal.",
    conteudo: [
      "O presidente da República chefia o Poder Executivo federal: comanda ministérios, define prioridades do governo e administra recursos federais.",
      "Também pode propor leis, sancionar ou vetar projetos aprovados pelo Congresso e representar o país no exterior.",
      "O mandato dura 4 anos, com direito a uma reeleição consecutiva.",
    ],
  },
  {
    slug: "o-que-faz-um-governador",
    titulo: "O que faz um governador?",
    resumo: "As funções do chefe do Executivo estadual.",
    conteudo: [
      "O governador chefia o Poder Executivo do estado. Responde por áreas como segurança pública estadual, escolas estaduais, hospitais estaduais e rodovias estaduais.",
      "Também pode propor leis à Assembleia Legislativa e administra o orçamento do estado.",
      "O mandato dura 4 anos, com direito a uma reeleição consecutiva.",
    ],
  },
  {
    slug: "o-que-faz-um-senador",
    titulo: "O que faz um senador?",
    resumo: "O papel do Senado Federal.",
    conteudo: [
      "O senador representa o seu estado no Senado Federal. Vota leis, aprova indicações para cargos como ministros do Supremo Tribunal Federal e fiscaliza o governo.",
      "Cada estado elege 3 senadores. O mandato dura 8 anos.",
    ],
  },
  {
    slug: "o-que-e-uma-pec",
    titulo: "O que é uma PEC?",
    resumo: "Proposta de Emenda à Constituição.",
    conteudo: [
      "PEC é a sigla de Proposta de Emenda à Constituição: um texto que propõe mudar a Constituição.",
      "Para ser aprovada, precisa de 3/5 dos votos na Câmara e no Senado, em dois turnos de votação em cada casa.",
    ],
  },
  {
    slug: "o-que-e-um-projeto-de-lei",
    titulo: "O que é um projeto de lei?",
    resumo: "Como uma lei comum é criada.",
    conteudo: [
      "Um projeto de lei é uma proposta de nova regra. Ele passa por comissões, é votado na Câmara e no Senado e depois vai à sanção do presidente.",
      "O presidente pode sancionar (aprovar) ou vetar. Um veto pode ser derrubado pelo Congresso.",
    ],
  },
  {
    slug: "como-funciona-uma-eleicao",
    titulo: "Como funciona uma eleição?",
    resumo: "O básico do processo eleitoral brasileiro.",
    conteudo: [
      "Nas eleições gerais, os eleitores votam para presidente, governador, senador, deputado federal e deputado estadual.",
      "O voto é obrigatório para maiores de 18 anos e facultativo entre 16 e 17 anos e a partir dos 70 anos.",
      "A votação é feita em urnas eletrônicas, e os resultados são apurados no mesmo dia.",
    ],
  },
  {
    slug: "como-funciona-o-segundo-turno",
    titulo: "Como funciona o segundo turno?",
    resumo: "Quando há uma nova votação.",
    conteudo: [
      "Para presidente, governador e prefeito de cidades com mais de 200 mil eleitores, é preciso mais de 50% dos votos válidos para vencer no primeiro turno.",
      "Se ninguém alcançar esse percentual, os dois mais votados disputam um segundo turno.",
      "Senadores e deputados não têm segundo turno.",
    ],
  },
  {
    slug: "o-que-e-um-partido-politico",
    titulo: "O que é um partido político?",
    resumo: "A organização por trás das candidaturas.",
    conteudo: [
      "Um partido político é uma organização registrada que reúne pessoas com ideias políticas próximas.",
      "No Brasil, é obrigatório estar filiado a um partido para se candidatar.",
      "Partidos recebem recursos públicos e devem prestar contas do uso desse dinheiro.",
    ],
  },
];

export const getArtigo = (slug: string) => artigos.find((a) => a.slug === slug);
