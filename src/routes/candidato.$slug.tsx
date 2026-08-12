import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, GitCompare, Share2 } from "lucide-react";
import { useState } from "react";
import { CATEGORIAS, getCandidato } from "@/data/candidatos";
import { useComparar } from "@/context/comparar";

export const Route = createFileRoute("/candidato/$slug")({
  loader: ({ params }) => {
    const candidato = getCandidato(params.slug);
    if (!candidato) throw notFound();
    return candidato;
  },
  head: ({ loaderData }) => {
    const c = loaderData;
    const titulo = c
      ? `${c.nome} (${c.siglaPartido}) — ${c.cargo} | Voto Consciente`
      : "Candidato | Voto Consciente";
    const descricao = c
      ? `${c.nome}, candidato a ${c.cargo} pelo ${c.partido}. Histórico, propostas por tema e fontes das informações.`
      : "Perfil de candidato das Eleições de 2026.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
      ],
    };
  },
  component: PaginaCandidato,
});

function PaginaCandidato() {
  const c = Route.useLoaderData();
  const { selecionados, alternar, cheio } = useComparar();
  const [copiado, setCopiado] = useState(false);
  const selecionado = selecionados.includes(c.slug);

  const compartilhar = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: c.nome, url });
        return;
      } catch {
        /* usuário cancelou */
      }
    }
    await navigator.clipboard?.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const propostasPorCategoria = CATEGORIAS.map((cat) => ({
    categoria: cat,
    itens: c.propostas.filter((p) => p.categoria === cat),
  })).filter((g) => g.itens.length > 0);

  const redes = [
    { nome: "X", url: c.redesSociais.x },
    { nome: "Instagram", url: c.redesSociais.instagram },
    { nome: "LinkedIn", url: c.redesSociais.linkedin },
  ].filter((r) => r.url);

  return (
    <article className="container-page py-8">
      <Link
        to="/candidatos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" /> Voltar para candidatos
      </Link>

      <header className="mt-5 rounded-xl border border-border bg-card p-6 shadow-card">
        <h1 className="text-3xl font-semibold">{c.nome}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Nome de urna: {c.nomeUrna}</p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="label-caps">Cargo</dt>
            <dd className="mt-0.5 text-sm">{c.cargo}</dd>
          </div>
          <div>
            <dt className="label-caps">Partido</dt>
            <dd className="mt-0.5 text-sm">
              {c.partido} ({c.siglaPartido})
            </dd>
          </div>
          <div>
            <dt className="label-caps">Número</dt>
            <dd className="mt-0.5 text-sm">{c.numero ?? "Ainda não informado."}</dd>
          </div>
          <div>
            <dt className="label-caps">Posicionamento</dt>
            <dd className="mt-0.5 text-sm">{c.posicionamento}</dd>
          </div>
        </dl>

        <p className="mt-5 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
          Situação da candidatura: {c.situacaoCandidatura}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => alternar(c.slug)}
            disabled={!selecionado && cheio}
            aria-pressed={selecionado}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-4 text-sm font-semibold hover:bg-secondary disabled:opacity-50"
          >
            <GitCompare aria-hidden="true" className="size-4" />
            {selecionado ? "Remover da comparação" : "Adicionar à comparação"}
          </button>
          <button
            type="button"
            onClick={compartilhar}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-4 text-sm font-semibold hover:bg-secondary"
          >
            <Share2 aria-hidden="true" className="size-4" />
            {copiado ? "Link copiado" : "Compartilhar"}
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold">Resumo</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.resumo}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Histórico</h2>
            {c.historico.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Informação não disponível.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {c.historico.map((h) => (
                  <li
                    key={h}
                    className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold">Propostas</h2>
            {propostasPorCategoria.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Informação não disponível.</p>
            ) : (
              <div className="mt-3 space-y-5">
                {propostasPorCategoria.map((g) => (
                  <div key={g.categoria}>
                    <h3 className="label-caps">{g.categoria}</h3>
                    <ul className="mt-2 space-y-2">
                      {g.itens.map((p) => (
                        <li
                          key={p.tema + p.proposta}
                          className="rounded-lg border border-border bg-card p-4"
                        >
                          <p className="text-sm font-semibold">{p.tema}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{p.proposta}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Fonte: {p.fonte ?? "Ainda não informado."}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Redes sociais</h2>
            {redes.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Informação não disponível.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {redes.map((r) => (
                  <li key={r.nome}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-primary underline"
                    >
                      {r.nome}
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">De onde vêm essas informações?</h2>
            {c.fontes.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Ainda não informado.</p>
            ) : (
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
                {c.fontes.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
            <Link to="/metodologia" className="mt-3 inline-block text-sm text-primary underline">
              Ver metodologia completa
            </Link>
          </section>

          <p className="text-xs text-muted-foreground">
            Última atualização deste perfil: {c.dataAtualizacao}
          </p>
        </aside>
      </div>
    </article>
  );
}
