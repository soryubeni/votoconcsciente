import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";
import { z } from "zod";
import { CandidatoCard } from "@/components/candidato-card";
import { BuscaCandidatos } from "@/components/busca-candidatos";
import {
  candidatos,
  CARGOS,
  partidos,
  POSICIONAMENTOS,
  DATA_ATUALIZACAO_GERAL,
} from "@/data/candidatos";

const searchSchema = z.object({
  q: z.string().optional(),
  cargo: z.string().optional(),
});

export const Route = createFileRoute("/candidatos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Candidatos das Eleições 2026 | Voto Consciente" },
      {
        name: "description",
        content:
          "Lista de candidatos das Eleições de 2026 com filtros por cargo, partido e posicionamento político. Dados organizados com fontes.",
      },
      { property: "og:title", content: "Candidatos das Eleições 2026" },
      {
        property: "og:description",
        content: "Filtre candidatos por cargo, partido e posicionamento político.",
      },
    ],
  }),
  component: Candidatos,
});

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Candidatos() {
  const { q, cargo: cargoInicial } = Route.useSearch();
  const [busca, setBusca] = useState(q ?? "");
  const [cargos, setCargos] = useState<string[]>(cargoInicial ? [cargoInicial] : []);
  const [partidosSel, setPartidosSel] = useState<string[]>([]);
  const [posicoes, setPosicoes] = useState<string[]>([]);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const alternar = (
    valor: string,
    lista: string[],
    set: (v: string[]) => void,
  ) => set(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);

  const resultado = useMemo(() => {
    const t = normalize(busca.trim());
    return candidatos.filter((c) => {
      const casaBusca =
        !t ||
        [c.nome, c.nomeUrna, c.partido, c.siglaPartido, c.cargo, c.numero ?? ""]
          .map(normalize)
          .some((campo) => campo.includes(t));
      const casaCargo = cargos.length === 0 || cargos.includes(c.cargo);
      const casaPartido = partidosSel.length === 0 || partidosSel.includes(c.siglaPartido);
      const casaPosicao = posicoes.length === 0 || posicoes.includes(c.posicionamento);
      return casaBusca && casaCargo && casaPartido && casaPosicao;
    });
  }, [busca, cargos, partidosSel, posicoes]);

  const limparTudo = () => {
    setBusca("");
    setCargos([]);
    setPartidosSel([]);
    setPosicoes([]);
  };

  const totalFiltros = cargos.length + partidosSel.length + posicoes.length;

  const GrupoFiltro = ({
    titulo,
    opcoes,
    selecionados,
    onToggle,
  }: {
    titulo: string;
    opcoes: readonly string[];
    selecionados: string[];
    onToggle: (v: string) => void;
  }) => (
    <fieldset className="border-t border-border pt-4 first:border-t-0 first:pt-0">
      <legend className="label-caps mb-2">{titulo}</legend>
      <div className="space-y-2">
        {opcoes.map((o) => (
          <label key={o} className="flex min-h-9 items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-[var(--primary)]"
              checked={selecionados.includes(o)}
              onChange={() => onToggle(o)}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="container-page py-10">
      <header>
        <h1 className="text-3xl font-semibold">Candidatos</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Todos os candidatos da base, sem ordem de preferência. A ordenação é apenas a ordem de
          cadastro. Última atualização: {DATA_ATUALIZACAO_GERAL}.
        </p>
      </header>

      <div className="mt-6 max-w-xl">
        <label htmlFor="filtro-busca" className="sr-only">
          Filtrar lista
        </label>
        <input
          id="filtro-busca"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Filtrar por nome, partido, cargo ou número..."
          className="h-12 w-full rounded-xl border border-input bg-card px-4 text-sm"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <div>
          <button
            type="button"
            onClick={() => setFiltrosAbertos((v) => !v)}
            aria-expanded={filtrosAbertos}
            className="inline-flex min-h-11 w-full items-center justify-between rounded-lg border border-input px-4 text-sm font-semibold lg:hidden"
          >
            <span className="inline-flex items-center gap-2">
              <Filter aria-hidden="true" className="size-4" /> Filtros
              {totalFiltros > 0 && ` (${totalFiltros})`}
            </span>
          </button>

          <aside
            aria-label="Filtros"
            className={`${filtrosAbertos ? "block" : "hidden"} mt-4 space-y-4 rounded-xl border border-border bg-card p-5 lg:mt-0 lg:block`}
          >
            <GrupoFiltro
              titulo="Cargo"
              opcoes={CARGOS}
              selecionados={cargos}
              onToggle={(v) => alternar(v, cargos, setCargos)}
            />
            <GrupoFiltro
              titulo="Partido"
              opcoes={partidos}
              selecionados={partidosSel}
              onToggle={(v) => alternar(v, partidosSel, setPartidosSel)}
            />
            <GrupoFiltro
              titulo="Posicionamento"
              opcoes={POSICIONAMENTOS}
              selecionados={posicoes}
              onToggle={(v) => alternar(v, posicoes, setPosicoes)}
            />
            {totalFiltros > 0 && (
              <button
                type="button"
                onClick={limparTudo}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-input px-3 text-sm"
              >
                <X aria-hidden="true" className="size-4" /> Limpar filtros
              </button>
            )}
            <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              O posicionamento segue uma metodologia declarada. Veja como classificamos na página
              de metodologia.
            </p>
          </aside>
        </div>

        <section aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {resultado.length} candidato{resultado.length === 1 ? "" : "s"} encontrado
            {resultado.length === 1 ? "" : "s"}
          </p>
          {resultado.length === 0 ? (
            <div className="mt-6 rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum candidato corresponde aos filtros selecionados.
              </p>
              <div className="mx-auto mt-4 max-w-sm">
                <BuscaCandidatos id="busca-vazia" />
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {resultado.map((c) => (
                <CandidatoCard key={c.id} candidato={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
