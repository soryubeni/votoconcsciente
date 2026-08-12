import { createFileRoute } from "@tanstack/react-router";
import { artigos } from "@/data/educativo";

export const Route = createFileRoute("/entenda")({
  head: () => ({
    meta: [
      { title: "Entenda a política em linguagem simples | Voto Consciente" },
      {
        name: "description",
        content:
          "O que é esquerda, direita e centro, o que faz um presidente, governador ou senador, o que é uma PEC e como funciona o segundo turno. Explicações curtas e neutras.",
      },
      { property: "og:title", content: "Entenda a política — Voto Consciente" },
      {
        property: "og:description",
        content: "Conceitos políticos explicados de forma curta, clara e sem jargão.",
      },
    ],
  }),
  component: Entenda,
});

function Entenda() {
  return (
    <div className="container-page py-10">
      <header>
        <h1 className="text-3xl font-semibold">Entenda a política</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Explicações curtas, em linguagem simples, sobre conceitos que aparecem no debate
          eleitoral. Os textos são descritivos e não defendem nenhuma posição.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {artigos.map((a) => (
          <article
            key={a.slug}
            id={a.slug}
            className="rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <h2 className="text-lg font-semibold">{a.titulo}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{a.resumo}</p>
            <div className="mt-3 space-y-2">
              {a.conteudo.map((p) => (
                <p key={p} className="text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
