import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatarData, institutos, pesquisas } from "@/data/pesquisas";

export const Route = createFileRoute("/pesquisas")({
  head: () => ({
    meta: [
      { title: "Pesquisas eleitorais 2026 | Voto Consciente" },
      {
        name: "description",
        content:
          "Gráficos de intenção de voto das Eleições de 2026 com instituto, data de coleta, número de entrevistados, margem de erro e fonte de cada pesquisa.",
      },
      { property: "og:title", content: "Pesquisas eleitorais — Eleições 2026" },
      {
        property: "og:description",
        content: "Intenção de voto e evolução no tempo, sempre com data, metodologia e fonte.",
      },
    ],
  }),
  component: Pesquisas,
});

const CORES = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

function Pesquisas() {
  const [cargo, setCargo] = useState<string>("Presidente");
  const [turno, setTurno] = useState<string>("1º turno");
  const [instituto, setInstituto] = useState<string>("todos");

  const filtradas = useMemo(
    () =>
      pesquisas
        .filter(
          (p) =>
            p.cargo === cargo &&
            p.turno === turno &&
            (instituto === "todos" || p.instituto === instituto),
        )
        .sort((a, b) => a.dataPublicacao.localeCompare(b.dataPublicacao)),
    [cargo, turno, instituto],
  );

  const candidatosSerie = useMemo(() => {
    const set = new Set<string>();
    filtradas.forEach((p) => p.resultados.forEach((r) => set.add(r.candidato)));
    return Array.from(set);
  }, [filtradas]);

  const serieTemporal = filtradas.map((p) => {
    const linha: Record<string, string | number> = { data: formatarData(p.dataPublicacao) };
    p.resultados.forEach((r) => (linha[r.candidato] = r.percentual));
    return linha;
  });

  const ultima = filtradas[filtradas.length - 1];

  return (
    <div className="container-page py-10">
      <header>
        <h1 className="text-3xl font-semibold">Pesquisas eleitorais</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Pesquisas de intenção de voto são uma fotografia de um momento, não uma previsão do
          resultado. Toda pesquisa aqui exibe instituto, período de coleta, número de entrevistados,
          margem de erro e fonte.
        </p>
      </header>

      <section
        aria-label="Filtros das pesquisas"
        className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3"
      >
        <div>
          <label htmlFor="f-cargo" className="label-caps">
            Cargo
          </label>
          <select
            id="f-cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option>Presidente</option>
            <option>Governador de São Paulo</option>
            <option>Senador de São Paulo</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-turno" className="label-caps">
            Turno
          </label>
          <select
            id="f-turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option>1º turno</option>
            <option>2º turno</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-inst" className="label-caps">
            Instituto
          </label>
          <select
            id="f-inst"
            value={instituto}
            onChange={(e) => setInstituto(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="todos">Todos</option>
            {institutos.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </section>

      {filtradas.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Informação não disponível para os filtros selecionados.
        </p>
      ) : (
        <>
          {ultima && (
            <section className="mt-8 rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold">
                Pesquisa mais recente — {ultima.instituto}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Publicada em {formatarData(ultima.dataPublicacao)} · Coleta: {ultima.periodoColeta}
              </p>
              <div className="mt-5 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ultima.resultados} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" unit="%" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis
                      type="category"
                      dataKey="candidato"
                      width={140}
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="percentual" name="Intenção de voto" fill="var(--chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="label-caps">Entrevistados</dt>
                  <dd>{ultima.entrevistados ?? "Informação não disponível."}</dd>
                </div>
                <div>
                  <dt className="label-caps">Margem de erro</dt>
                  <dd>{ultima.margemErro ?? "Informação não disponível."}</dd>
                </div>
                <div>
                  <dt className="label-caps">Metodologia</dt>
                  <dd>{ultima.metodologia ?? "Informação não disponível."}</dd>
                </div>
                <div>
                  <dt className="label-caps">Fonte</dt>
                  <dd>{ultima.fonte}</dd>
                </div>
              </dl>
            </section>
          )}

          {serieTemporal.length > 1 && (
            <section className="mt-8 rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold">Evolução ao longo do tempo</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cada ponto é uma pesquisa publicada. Pesquisas de institutos e metodologias
                diferentes não são diretamente comparáveis entre si.
              </p>
              <div className="mt-5 h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={serieTemporal}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="data" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis unit="%" stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend />
                    {candidatosSerie.map((c, i) => (
                      <Line
                        key={c}
                        type="monotone"
                        dataKey={c}
                        stroke={CORES[i % CORES.length]}
                        strokeWidth={2}
                        dot
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Pesquisas listadas</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[46rem] border-collapse bg-card text-left text-sm">
                <caption className="sr-only">Detalhes de cada pesquisa exibida</caption>
                <thead className="bg-surface">
                  <tr className="border-b border-border">
                    <th scope="col" className="p-3">Instituto</th>
                    <th scope="col" className="p-3">Publicação</th>
                    <th scope="col" className="p-3">Coleta</th>
                    <th scope="col" className="p-3">Entrevistados</th>
                    <th scope="col" className="p-3">Margem de erro</th>
                    <th scope="col" className="p-3">Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  {filtradas.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="p-3">{p.instituto}</td>
                      <td className="p-3">{formatarData(p.dataPublicacao)}</td>
                      <td className="p-3">{p.periodoColeta}</td>
                      <td className="p-3">{p.entrevistados ?? "—"}</td>
                      <td className="p-3">{p.margemErro ?? "—"}</td>
                      <td className="p-3">{p.fonte}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
