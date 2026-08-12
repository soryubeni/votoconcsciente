/**
 * Perguntas da pesquisa de opinião.
 * Editar este arquivo altera a pesquisa sem mexer no restante da aplicação.
 * Futuramente pode ser carregado de uma API/banco de dados.
 */
export interface PerguntaPesquisa {
  id: string;
  enunciado: string;
  tipo: "opcao" | "texto";
  opcoes?: string[];
}

export const perguntasPesquisa: PerguntaPesquisa[] = [
  {
    id: "facilidade",
    enunciado: "Foi fácil encontrar as informações que você procurava?",
    tipo: "opcao",
    opcoes: ["Sim, muito fácil", "Mais ou menos", "Não, tive dificuldade"],
  },
  {
    id: "clareza",
    enunciado: "A linguagem do site é clara para você?",
    tipo: "opcao",
    opcoes: ["Sim", "Em parte", "Não"],
  },
  {
    id: "sugestao",
    enunciado: "O que você gostaria de encontrar aqui e ainda não encontrou?",
    tipo: "texto",
  },
];
