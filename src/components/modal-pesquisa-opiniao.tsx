import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { perguntasPesquisa } from "@/data/pesquisa-opiniao";

const CHAVE_SESSAO = "vc_pesquisa_opiniao_exibida";
const TEMPO_MS = 3 * 60 * 1000;

export function ModalPesquisaOpiniao() {
  const [aberto, setAberto] = useState(false);
  const [respondendo, setRespondendo] = useState(false);
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(CHAVE_SESSAO)) return;

    let ativoMs = 0;
    let ultimo = Date.now();
    let visivel = !document.hidden;

    const tick = window.setInterval(() => {
      const agora = Date.now();
      if (visivel) ativoMs += agora - ultimo;
      ultimo = agora;
      if (ativoMs >= TEMPO_MS) {
        window.clearInterval(tick);
        setAberto(true);
      }
    }, 1000);

    const onVis = () => {
      visivel = !document.hidden;
      ultimo = Date.now();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const fechar = () => {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
    setAberto(false);
  };

  if (!aberto) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="titulo-pesquisa-opiniao"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-border bg-card p-5 shadow-card sm:left-auto sm:right-6"
    >
      <button
        type="button"
        onClick={fechar}
        className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary"
      >
        <span className="sr-only">Fechar</span>
        <X aria-hidden="true" className="size-4" />
      </button>

      {enviado ? (
        <div>
          <h2 id="titulo-pesquisa-opiniao" className="pr-8 text-base font-semibold">
            Obrigado por participar.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua resposta ajuda a melhorar o Voto Consciente.
          </p>
          <button
            type="button"
            onClick={fechar}
            className="mt-4 min-h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Fechar
          </button>
        </div>
      ) : respondendo ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem(CHAVE_SESSAO, "1");
            setEnviado(true);
          }}
        >
          <h2 id="titulo-pesquisa-opiniao" className="pr-8 text-base font-semibold">
            Pesquisa rápida
          </h2>
          <div className="mt-4 max-h-80 space-y-4 overflow-y-auto pr-1">
            {perguntasPesquisa.map((p) => (
              <fieldset key={p.id}>
                <legend className="text-sm font-medium">{p.enunciado}</legend>
                {p.tipo === "texto" ? (
                  <textarea
                    rows={3}
                    value={respostas[p.id] ?? ""}
                    onChange={(e) => setRespostas((r) => ({ ...r, [p.id]: e.target.value }))}
                    className="mt-2 w-full rounded-lg border border-input bg-background p-2 text-sm"
                  />
                ) : (
                  <div className="mt-2 grid gap-1.5">
                    {p.opcoes?.map((o) => (
                      <label key={o} className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={p.id}
                          value={o}
                          checked={respostas[p.id] === o}
                          onChange={() => setRespostas((r) => ({ ...r, [p.id]: o }))}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                )}
              </fieldset>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="min-h-11 flex-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={fechar}
              className="min-h-11 rounded-lg border border-input px-4 text-sm font-semibold"
            >
              Agora não
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 id="titulo-pesquisa-opiniao" className="pr-8 text-base font-semibold">
            Sua opinião também ajuda a melhorar o Voto Consciente.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Quer responder uma pesquisa rápida?
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setRespondendo(true)}
              className="min-h-11 flex-1 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Responder agora
            </button>
            <button
              type="button"
              onClick={fechar}
              className="min-h-11 rounded-lg border border-input px-4 text-sm font-semibold"
            >
              Agora não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
