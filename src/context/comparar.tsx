import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const MAX = 3;

interface CompararContexto {
  selecionados: string[];
  alternar: (slug: string) => void;
  remover: (slug: string) => void;
  limpar: () => void;
  definir: (slugs: string[]) => void;
  cheio: boolean;
  max: number;
}

const Ctx = createContext<CompararContexto | null>(null);

export function CompararProvider({ children }: { children: ReactNode }) {
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const alternar = useCallback((slug: string) => {
    setSelecionados((atual) =>
      atual.includes(slug)
        ? atual.filter((s) => s !== slug)
        : atual.length >= MAX
          ? atual
          : [...atual, slug],
    );
  }, []);

  const remover = useCallback(
    (slug: string) => setSelecionados((a) => a.filter((s) => s !== slug)),
    [],
  );
  const limpar = useCallback(() => setSelecionados([]), []);
  const definir = useCallback((slugs: string[]) => setSelecionados(slugs.slice(0, MAX)), []);

  const valor = useMemo(
    () => ({
      selecionados,
      alternar,
      remover,
      limpar,
      definir,
      cheio: selecionados.length >= MAX,
      max: MAX,
    }),
    [selecionados, alternar, remover, limpar, definir],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useComparar() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useComparar precisa estar dentro de CompararProvider");
  return ctx;
}
