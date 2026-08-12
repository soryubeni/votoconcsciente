import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Scale, GitCompare } from "lucide-react";
import { BuscaCandidatos } from "./busca-candidatos";
import { useComparar } from "@/context/comparar";
import { DATA_ATUALIZACAO_GERAL } from "@/data/candidatos";

const NAV = [
  { to: "/candidatos", label: "Candidatos" },
  { to: "/comparar", label: "Comparar" },
  { to: "/pesquisas", label: "Pesquisas eleitorais" },
  { to: "/entenda", label: "Entenda a política" },
  { to: "/metodologia", label: "Metodologia" },
] as const;

function ControleFonte() {
  const [tamanho, setTamanho] = useState<"padrao" | "grande" | "maior">("padrao");

  useEffect(() => {
    document.documentElement.setAttribute("data-fontsize", tamanho);
  }, [tamanho]);

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Tamanho do texto">
      {(
        [
          ["padrao", "A", "Texto padrão"],
          ["grande", "A+", "Texto grande"],
          ["maior", "A++", "Texto muito grande"],
        ] as const
      ).map(([valor, rotulo, titulo]) => (
        <button
          key={valor}
          type="button"
          title={titulo}
          aria-pressed={tamanho === valor}
          onClick={() => setTamanho(valor)}
          className={`min-h-9 min-w-9 rounded-md border px-2 text-xs font-semibold transition-colors ${
            tamanho === valor
              ? "border-primary bg-accent text-accent-foreground"
              : "border-input bg-card text-muted-foreground hover:bg-secondary"
          }`}
        >
          {rotulo}
        </button>
      ))}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { selecionados } = useComparar();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <Scale aria-hidden="true" className="size-5 text-primary" />
            <span className="font-display text-lg font-semibold tracking-tight">
              Voto Consciente
            </span>
          </Link>

          <div className="ml-auto hidden max-w-xs flex-1 lg:block">
            <BuscaCandidatos id="busca-header" placeholder="Pesquisar candidato..." />
          </div>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:block">
            <ControleFonte />
          </div>

          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-md border border-input lg:hidden"
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
            {menuAberto ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {menuAberto && (
          <div id="menu-mobile" className="border-t border-border bg-background lg:hidden">
            <div className="container-page space-y-3 py-4">
              <BuscaCandidatos id="busca-mobile" />
              <nav aria-label="Principal (celular)" className="grid gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuAberto(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <ControleFonte />
            </div>
          </div>
        )}
      </header>

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      {selecionados.length > 0 && (
        <div className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
          <div className="container-page flex items-center justify-between gap-3 py-3">
            <p className="text-sm text-muted-foreground">
              {selecionados.length} de 3 candidatos selecionados
            </p>
            <Link
              to="/comparar"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              <GitCompare aria-hidden="true" className="size-4" />
              Comparar
            </Link>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-surface">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-base font-semibold">Voto Consciente</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Informar, não influenciar. Plataforma independente de organização de informações
              sobre as Eleições de 2026.
            </p>
          </div>
          <nav aria-label="Rodapé — navegação" className="grid gap-2 text-sm">
            <span className="label-caps">Navegar</span>
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-sm">
            <span className="label-caps">Transparência</span>
            <p className="mt-2 text-muted-foreground">
              Última atualização dos dados: {DATA_ATUALIZACAO_GERAL}
            </p>
            <Link to="/metodologia" className="mt-2 inline-block text-primary underline">
              Como os dados são coletados
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="label-caps">Aviso</span>
            <p className="mt-2">
              Este site não pertence a partido, campanha ou candidato. Não recomendamos voto em
              nenhum candidato.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
