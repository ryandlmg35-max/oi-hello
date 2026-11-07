import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  adicionarItem as adicionarItemReducer,
  CHAVE_STORAGE,
  definirQuantidade as definirQuantidadeReducer,
  normalizarItens,
  removerItem as removerItemReducer,
  subtotal as calcularSubtotal,
  totalItens as contarItens,
  type ItemCarrinho,
  type ProdutoParaCarrinho,
  type VarianteParaCarrinho,
} from "./carrinho-reducer";

type CarrinhoState = {
  itens: ItemCarrinho[];
  pronto: boolean;
  totalItens: number;
  subtotal: number;
  adicionar: (
    produto: ProdutoParaCarrinho,
    variante: VarianteParaCarrinho,
    quantidade?: number,
  ) => void;
  definirQuantidade: (varianteId: string, quantidade: number) => void;
  remover: (varianteId: string) => void;
  limpar: () => void;
};

const CarrinhoContext = createContext<CarrinhoState | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [pronto, setPronto] = useState(false);

  // O carrinho vive no localStorage: o servidor renderiza vazio e o cliente
  // preenche depois (evita divergencia de HTML no SSR).
  useEffect(() => {
    try {
      const bruto = window.localStorage.getItem(CHAVE_STORAGE);
      if (bruto) setItens(normalizarItens(JSON.parse(bruto)));
    } catch {
      // localStorage bloqueado: segue em memoria
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      window.localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
    } catch {
      // cota cheia: o carrinho segue em memoria
    }
  }, [itens, pronto]);

  const adicionar = useCallback(
    (produto: ProdutoParaCarrinho, variante: VarianteParaCarrinho, quantidade = 1) => {
      setItens((atuais) =>
        adicionarItemReducer(atuais, {
          varianteId: variante.id,
          produtoId: produto.id,
          nome: produto.titulo,
          variante: variante.variante,
          preco: variante.preco,
          precoTexto: variante.precoTexto,
          img: variante.img,
          vendor: produto.vendor,
          vendorSlug: produto.vendorSlug,
          quantidade,
        }),
      );
    },
    [],
  );

  const definirQuantidade = useCallback((varianteId: string, quantidade: number) => {
    setItens((atuais) => definirQuantidadeReducer(atuais, varianteId, quantidade));
  }, []);

  const remover = useCallback((varianteId: string) => {
    setItens((atuais) => removerItemReducer(atuais, varianteId));
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  const valor = useMemo<CarrinhoState>(
    () => ({
      itens,
      pronto,
      totalItens: contarItens(itens),
      subtotal: calcularSubtotal(itens),
      adicionar,
      definirQuantidade,
      remover,
      limpar,
    }),
    [itens, pronto, adicionar, definirQuantidade, remover, limpar],
  );

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}

export function useCarrinho(): CarrinhoState {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) throw new Error("useCarrinho precisa estar dentro de <CarrinhoProvider>");
  return contexto;
}
