import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Share2, X } from "lucide-react";
import { candidatos, CATEGORIAS, getCandidato, type Candidato } from "@/data/candidatos";
import { useComparar } from "@/context/comparar";

export const Route = createFileRoute("/comparar")({
  head: () => ({
    meta: [
      { title: "Comparar candidatos das Eleições 2026 | Voto Consciente" },
      {
        name: "description",
        content:
          "Compare até 3 candidatos lado a lado: cargo, partido, posicionamento, histórico e propostas por tema. Sem ranking e sem recomendação de voto.",
      },
      { property: "og:title", content: "Comparar candidatos — Eleições 2026" },
      {
        property: "og:description",
        content: "Veja até 3 candidatos lado a lado, apenas com os dados organizados.",
      },
    ],
  }),
  component: Comparar,
});

const semDado = "Informação não disponível.";

function textoCategoria(c: Candidato, categoria: string) {
  const itens = c.propostas.filter((p) => p.categoria === categoria);
  if (itens.length === 0) return semDado;
  return itens.map((p) => `${p.tema}: ${p.proposta}`).join(" ");
}

function Comparar() {
  const { selecionados, alternar, remover, limpar, cheio, max } = useComparar();
  const [somenteDiferencas, setSomenteDiferencas] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const escolhidos = selecionados
    .map((s) => getCandidato(s))
    .filter((c): c is Candidato => Boolean(c));

  const linhas: { rotulo: string; valores: string[] }[] = [
    { rotulo: "Nome", valores: escolhidos.map((c) => c.nome) },
    { rotulo: "Cargo", valores: escolhidos.map((c) => c.cargo) },
    { rotulo: "Partido", valores: escolhidos.map((c) => `${c.partido} (${c.siglaPartido})`) },
    { rotulo: "Posicionamento", valores: escolhidos.map((c) => c.posicionamento) },
    {
      rotulo: "Histórico",
      valores: escolhidos.map((c) => (c.historico.length ? c.historico.join(" · ") : semDado)),
    },
    ...CATEGORIAS.map((cat) => ({
      rotulo: cat,
      valores: escolhidos.map((c) => textoCategoria(c, cat)),
    })),
    { rotulo: "Última atualização", valores: escolhidos.map((c) => c.dataAtualizacao) },
  ];

  const linhasVisiveis = linhas.filter((l) => {
    if (l.rotulo === "Nome") return true;
    const todasVazias = l.valores.every((v) => v === semDado);
    if (todasVazias && l.valores.length > 0) return false;
    if (!somenteDiferencas) return true;
    return new Set(l.valores).size > 1;
  });

  const compartilhar = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    await navigator.clipboard?.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="container-page py-10">
      <header>
        <h1 className="text-3xl font-semibold">Comparar candidatos</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Selecione até {max} candidatos. A ferramenta apenas organiza as informações lado a lado:
          não há nota, ranking ou indicação de vencedor.
        </p>
      </header>

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold">Selecionados ({escolhidos.length}/{max})</h2>
        {escolhidos.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nenhum candidato selecionado.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {escolhidos.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => remover(c.slug)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-input bg-secondary px-3 text-sm"
                >
                  {c.nome}
                  <X aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">Remover da comparação</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <label htmlFor="seletor" className="label-caps">
            Adicionar candidato
          </label>
          <select
            id="seletor"
            value=""
            disabled={cheio}
            onChange={(e) => e.target.value && alternar(e.target.value)}
            className="mt-2 h-12 w-full max-w-md rounded-lg border border-input bg-background px-3 text-sm disabled:opacity-50"
          >
            <option value="">
              {cheio ? `Limite de ${max} candidatos atingido` : "Escolha um candidato..."}
            </option>
            {candidatos
              .filter((c) => !selecionados.includes(c.slug))
              .map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.nome} — {c.cargo} ({c.siglaPartido})
                </option>
              ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-[var(--primary)]"
              checked={somenteDiferencas}
              onChange={(e) => setSomenteDiferencas(e.target.checked)}
            />
            Mostrar apenas diferenças
          </label>
          {escolhidos.length > 0 && (
            <>
              <button
                type="button"
                onClick={limpar}
                className="inline-flex min-h-11 items-center rounded-lg border border-input px-4 text-sm font-semibold"
              >
                Limpar seleção
              </button>
              <button
                type="button"
                onClick={compartilhar}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-input px-4 text-sm font-semibold"
              >
                <Share2 aria-hidden="true" className="size-4" />
                {copiado ? "Link copiado" : "Compartilhar"}
              </button>
            </>
          )}
        </div>
      </section>

      {escolhidos.length < 2 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Selecione pelo menos 2 candidatos para ver a comparação.{" "}
          <Link to="/candidatos" className="text-primary underline">
            Ver lista de candidatos
          </Link>
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[42rem] border-collapse bg-card text-left text-sm">
            <caption className="sr-only">
              Comparação de informações entre os candidatos selecionados
            </caption>
            <thead>
              <tr className="border-b border-border bg-surface">
                <th scope="col" className="w-44 p-3 font-semibold">
                  Informação
                </th>
                {escolhidos.map((c) => (
                  <th key={c.id} scope="col" className="p-3 font-semibold">
                    <Link
                      to="/candidato/$slug"
                      params={{ slug: c.slug }}
                      className="text-primary underline"
                    >
                      {c.nome}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhasVisiveis.map((l) => (
                <tr key={l.rotulo} className="border-b border-border last:border-0">
                  <th scope="row" className="align-top p-3 font-medium text-muted-foreground">
                    {l.rotulo}
                  </th>
                  {l.valores.map((v, i) => (
                    <td key={i} className="align-top p-3">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
