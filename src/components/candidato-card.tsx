import { Link } from "@tanstack/react-router";
import { Users, GitCompare } from "lucide-react";
import { type Candidato } from "@/data/candidatos";
import { useComparar } from "@/context/comparar";
import { cn } from "@/lib/utils";

export function CandidatoCard({ candidato }: { candidato: Candidato }) {
  const { selecionados, alternar, cheio } = useComparar();
  const selecionado = selecionados.includes(candidato.slug);
  const bloqueado = !selecionado && cheio;

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-semibold text-secondary-foreground"
        >
          <Users className="size-6 opacity-70" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-semibold text-foreground">
            {candidato.nome}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Nome de urna: {candidato.nomeUrna}
          </p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="label-caps">Cargo</dt>
          <dd className="mt-0.5">{candidato.cargo}</dd>
        </div>
        <div>
          <dt className="label-caps">Partido</dt>
          <dd className="mt-0.5">{candidato.siglaPartido}</dd>
        </div>
        <div className="col-span-2">
          <dt className="label-caps">Posicionamento</dt>
          <dd className="mt-0.5">{candidato.posicionamento}</dd>
        </div>
      </dl>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {candidato.resumo}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/candidato/$slug"
          params={{ slug: candidato.slug }}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver candidato
        </Link>
        <button
          type="button"
          onClick={() => alternar(candidato.slug)}
          disabled={bloqueado}
          aria-pressed={selecionado}
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-colors",
            selecionado
              ? "border-primary bg-accent text-accent-foreground"
              : "border-input bg-card text-foreground hover:bg-secondary",
            bloqueado && "cursor-not-allowed opacity-50",
          )}
        >
          <GitCompare aria-hidden="true" className="size-4" />
          {selecionado ? "Selecionado" : "Comparar"}
        </button>
      </div>
    </article>
  );
}
