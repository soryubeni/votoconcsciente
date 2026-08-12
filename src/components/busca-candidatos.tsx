import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { buscarCandidatos, type Candidato } from "@/data/candidatos";
import { cn } from "@/lib/utils";

interface Props {
  tamanho?: "grande" | "normal";
  placeholder?: string;
  className?: string;
  id?: string;
}

export function BuscaCandidatos({
  tamanho = "normal",
  placeholder = "Pesquise por candidato, partido ou cargo...",
  className,
  id = "busca",
}: Props) {
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState(false);
  const [indice, setIndice] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sugestoes: Candidato[] = termo.trim() ? buscarCandidatos(termo).slice(0, 6) : [];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const irPara = (c: Candidato) => {
    setAberto(false);
    setTermo("");
    navigate({ to: "/candidato/$slug", params: { slug: c.slug } });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndice((i) => Math.min(i + 1, sugestoes.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndice((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (indice >= 0 && sugestoes[indice]) irPara(sugestoes[indice]);
      else if (termo.trim()) {
        setAberto(false);
        navigate({ to: "/candidatos", search: { q: termo.trim() } });
      }
    } else if (e.key === "Escape") {
      setAberto(false);
    }
  };

  const grande = tamanho === "grande";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Pesquisar candidatos
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
            grande ? "size-5" : "size-4",
          )}
        />
        <input
          id={id}
          type="search"
          role="combobox"
          aria-expanded={aberto && sugestoes.length > 0}
          aria-controls={`${id}-sugestoes`}
          aria-autocomplete="list"
          autoComplete="off"
          value={termo}
          placeholder={placeholder}
          onChange={(e) => {
            setTermo(e.target.value);
            setAberto(true);
            setIndice(-1);
          }}
          onFocus={() => setAberto(true)}
          onKeyDown={onKeyDown}
          className={cn(
            "w-full rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground shadow-card transition-colors focus:border-ring",
            grande ? "h-16 pl-12 pr-4 text-base sm:text-lg" : "h-11 pl-10 pr-3 text-sm",
          )}
        />
      </div>

      {aberto && termo.trim() !== "" && (
        <ul
          id={`${id}-sugestoes`}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-card"
        >
          {sugestoes.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              Nenhum candidato encontrado.
            </li>
          )}
          {sugestoes.map((c, i) => (
            <li key={c.id} role="option" aria-selected={i === indice}>
              <button
                type="button"
                onMouseEnter={() => setIndice(i)}
                onClick={() => irPara(c)}
                className={cn(
                  "flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left transition-colors",
                  i === indice ? "bg-secondary" : "bg-transparent",
                )}
              >
                <span className="text-sm font-semibold">{c.nome}</span>
                <span className="text-xs text-muted-foreground">
                  {c.cargo} — {c.siglaPartido}
                </span>
              </button>
            </li>
          ))}
          {sugestoes.length > 0 && (
            <li>
              <Link
                to="/candidatos"
                search={{ q: termo.trim() }}
                onClick={() => setAberto(false)}
                className="block border-t border-border px-4 py-2.5 text-xs font-semibold text-primary"
              >
                Ver todos os resultados para "{termo.trim()}"
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
