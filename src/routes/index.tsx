import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Users, GitCompare, BarChart3, BookOpen, ShieldCheck } from "lucide-react";
import { BuscaCandidatos } from "@/components/busca-candidatos";
import { candidatos, DATA_ATUALIZACAO_GERAL } from "@/data/candidatos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voto Consciente — Candidatos das Eleições de 2026" },
      {
        name: "description",
        content:
          "Pesquise, entenda e compare candidatos das Eleições de 2026 à Presidência e a cargos em São Paulo. Informação organizada, com fontes e sem recomendação de voto.",
      },
      { property: "og:title", content: "Voto Consciente — Eleições 2026" },
      {
        property: "og:description",
        content:
          "Informações sobre candidatos das Eleições de 2026 para você formar sua própria opinião.",
      },
    ],
  }),
  component: Home,
});

const ATALHOS = [
  { to: "/candidatos", search: { cargo: "Presidente" }, icone: Users, titulo: "Presidência", texto: "Candidatos à Presidência da República" },
  { to: "/candidatos", search: { cargo: "Governador de São Paulo" }, icone: Users, titulo: "Governo de São Paulo", texto: "Candidatos ao Governo do Estado" },
  { to: "/candidatos", search: { cargo: "Senador de São Paulo" }, icone: Users, titulo: "Senado", texto: "Candidatos ao Senado por São Paulo" },
  { to: "/comparar", search: {}, icone: GitCompare, titulo: "Comparar candidatos", texto: "Veja até 3 candidatos lado a lado" },
  { to: "/pesquisas", search: {}, icone: BarChart3, titulo: "Pesquisas eleitorais", texto: "Gráficos com instituto, data e margem de erro" },
  { to: "/entenda", search: {}, icone: BookOpen, titulo: "Entenda a política", texto: "Conceitos explicados em linguagem simples" },
] as const;

function Home() {
  const total = candidatos.length;

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-caps">Eleições 2026</p>
            <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
              Conheça antes de escolher.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Informações sobre candidatos das Eleições de 2026 para ajudar você a formar sua
              própria opinião.
            </p>
            <div className="mt-8">
              <BuscaCandidatos id="busca-hero" tamanho="grande" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {total} candidatos na base · Última atualização: {DATA_ATUALIZACAO_GERAL}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-xl font-semibold">Por onde começar</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ATALHOS.map((a) => (
            <Link
              key={a.titulo}
              to={a.to}
              search={a.search}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-ring"
            >
              <a.icone aria-hidden="true" className="size-5 text-primary" />
              <h3 className="mt-3 text-base font-semibold">{a.titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          <div>
            <Search aria-hidden="true" className="size-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">Pesquisar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Busque por nome, nome de urna, partido, cargo ou número.
            </p>
          </div>
          <div>
            <Users aria-hidden="true" className="size-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">Conhecer</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cada perfil traz histórico, propostas por tema e fontes.
            </p>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" className="size-5 text-primary" />
            <h2 className="mt-3 text-base font-semibold">Comparar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dados lado a lado, sem ranking, nota ou recomendação de voto.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold">Informar, não influenciar</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            O Voto Consciente não diz em quem votar. Organizamos informações públicas de forma
            transparente e apresentamos a origem dos dados sempre que possível. Você não precisa
            confiar no Voto Consciente — precisa conseguir usar as informações dele para formar
            sua própria opinião.
          </p>
          <Link
            to="/metodologia"
            className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-input px-4 text-sm font-semibold hover:bg-secondary"
          >
            Como os dados são coletados
          </Link>
        </div>
      </section>
    </>
  );
}
