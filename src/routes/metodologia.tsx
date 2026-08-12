import { createFileRoute } from "@tanstack/react-router";
import { DATA_ATUALIZACAO_GERAL, POSICIONAMENTOS } from "@/data/candidatos";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia e fontes dos dados | Voto Consciente" },
      {
        name: "description",
        content:
          "Como o Voto Consciente coleta, verifica e classifica as informações sobre candidatos das Eleições de 2026, e como solicitar a correção de um erro.",
      },
      { property: "og:title", content: "Metodologia e fontes — Voto Consciente" },
      {
        property: "og:description",
        content: "Como os dados são coletados, verificados, classificados e corrigidos.",
      },
    ],
  }),
  component: Metodologia,
});

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-lg font-semibold">{titulo}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Metodologia() {
  return (
    <div className="container-page py-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Metodologia e fontes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização dos dados: {DATA_ATUALIZACAO_GERAL}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Você não precisa confiar no Voto Consciente. Você precisa conseguir usar as informações
          dele para formar sua própria opinião. Por isso, esta página descreve exatamente como os
          dados chegam até aqui.
        </p>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Secao titulo="Como os dados são coletados">
          <p>
            As informações partem de um conjunto inicial de candidatos, propostas resumidas e
            partidos. Cada registro é organizado em campos padronizados: nome, nome de urna, cargo,
            partido, número, posicionamento, resumo, histórico, propostas por categoria, redes
            sociais, fontes e data de atualização.
          </p>
          <p>
            Novos candidatos e novos campos podem ser incluídos sem alterar a estrutura das páginas.
          </p>
        </Secao>

        <Secao titulo="Quais fontes são utilizadas">
          <p>
            Priorizamos registros oficiais de candidatura, material de campanha divulgado pelos
            próprios candidatos e partidos, e cobertura de veículos de imprensa. Cada perfil lista
            as fontes usadas na seção "De onde vêm essas informações?".
          </p>
        </Secao>

        <Secao titulo="Como as informações são verificadas">
          <p>
            Antes de publicar, buscamos ao menos uma fonte identificável para cada informação
            relevante. Quando não há fonte confiável, o campo é exibido como "Informação não
            disponível." ou "Ainda não informado.".
          </p>
          <p>Nunca preenchemos lacunas com conteúdo criado por suposição.</p>
        </Secao>

        <Secao titulo="Como classificamos o posicionamento">
          <p>
            O posicionamento é um rótulo descritivo, não um julgamento. Ele é atribuído a partir de
            declarações públicas do próprio candidato, do programa registrado do partido e de
            posições consolidadas em votações e atos públicos.
          </p>
          <p>Categorias utilizadas:</p>
          <ul className="list-disc space-y-1 pl-5">
            {POSICIONAMENTOS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>
            Quando não há base suficiente, usamos "Outro / Não classificado". A classificação nunca
            indica qualidade, preferência ou recomendação.
          </p>
        </Secao>

        <Secao titulo="O que não fazemos">
          <p>
            Não criamos ranking de candidatos, nota, selo, medalha, percentual de compatibilidade
            nem recomendação de voto. Não usamos expressões como "melhor candidato" ou "candidato
            ideal". Na comparação, os dados aparecem lado a lado sem apontar vencedor.
          </p>
        </Secao>

        <Secao titulo="Como corrigir um erro">
          <p>
            Se você identificou uma informação incorreta ou desatualizada, envie a correção
            indicando o candidato, o campo e a fonte que comprova o dado correto. Correções com
            fonte verificável são analisadas e, quando confirmadas, publicadas com nova data de
            atualização no perfil.
          </p>
          <p>
            Contato para correções:{" "}
            <a className="text-primary underline" href="mailto:correcoes@votoconsciente.exemplo">
              correcoes@votoconsciente.exemplo
            </a>
          </p>
        </Secao>

        <Secao titulo="Sobre as pesquisas eleitorais">
          <p>
            Pesquisas de intenção de voto retratam um momento e possuem margem de erro. Exibimos
            sempre instituto, data de publicação, período de coleta, número de entrevistados,
            margem de erro, metodologia e fonte. Pesquisas de institutos ou metodologias diferentes
            não são diretamente comparáveis entre si.
          </p>
        </Secao>

        <Secao titulo="Independência">
          <p>
            O Voto Consciente não pertence a partido, campanha, candidato ou governo, e não veicula
            propaganda eleitoral.
          </p>
        </Secao>
      </div>
    </div>
  );
}
