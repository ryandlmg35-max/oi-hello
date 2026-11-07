import { createFileRoute } from "@tanstack/react-router";
import { carregarCatalogo } from "@/data/mercado/servidor";
import { CartaoVendedor } from "@/components/mercado/cartao-vendedor";
import { SliderBlackFriday } from "@/components/mercado/slider-black-friday";
import { PromoEscrow } from "@/components/mercado/promo-escrow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Black Market 2026 | Mercado com Escrow" },
      {
        name: "description",
        content:
          "Mirror da secao Medical / Drugs: vendedores verificados, escrow MultiSig e 10 dias de proteção ao comprador.",
      },
    ],
  }),
  loader: async () => {
    const catalogo = await carregarCatalogo();
    return { catalogo };
  },
  component: Home,
});

function Home() {
  const { catalogo } = Route.useLoaderData();
  const emDestaque = catalogo.vendedores.filter((v) => v.destaque);
  const topo = (emDestaque.length ? emDestaque : catalogo.vendedores).slice(0, 4);
  const grade = catalogo.vendedores;

  return (
    <div className="maincontainer">
      <div className="card-container top-vendors">
        {topo.map((vendedor) => (
          <CartaoVendedor key={vendedor.id} vendedor={vendedor} destaque />
        ))}
      </div>

      <SliderBlackFriday />

      <div className="card-container">
        {grade.map((vendedor) => (
          <CartaoVendedor key={vendedor.id} vendedor={vendedor} />
        ))}
      </div>

      <PromoEscrow />
    </div>
  );
}
