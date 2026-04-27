import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Tag,
  Plus,
  Shield,
  Truck,
  Clock,
  ArrowRight,
} from "lucide-react";
import type Produto from "../models/Produto";
import type Categoria from "../models/Categoria";
import {
  buscarTodosProdutos,
  buscarTodasCategorias,
} from "../services/Service";

function FallbackImg({
  src,
  alt,
  className,
}: {
  src: string | undefined;
  alt: string | undefined;
  className: string;
}) {
  const [err, setErr] = useState(false);

  if (err || !src) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center`}
      >
        <ShoppingBag className="w-12 h-12 text-teal-400" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}
export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselItems = produtos.slice(0, 6);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || carouselItems.length === 0) return;
      setIsAnimating(true);
      setCarouselIndex((index + carouselItems.length) % carouselItems.length);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, carouselItems.length],
  );

  useEffect(() => {
    buscarTodosProdutos(setProdutos).catch(console.error);
    buscarTodasCategorias(setCategorias).catch(console.error);
  }, []);

  useEffect(() => {
    if (carouselItems.length === 0) return;
    const t = setInterval(() => goTo(carouselIndex + 1), 4500);
    return () => clearInterval(t);
  }, [carouselIndex, carouselItems.length, goTo]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-teal-800/40 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              Sistema online
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Sua farmácia,
              <br />
              <span className="text-teal-100">mais organizada</span>
            </h1>
            <p className="text-teal-100 text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0">
              Gerencie produtos e categorias de qualquer lugar.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                to="/produtos"
                className="px-6 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base"
              >
                Ver Produtos
              </Link>
              <Link
                to="/cadastrarProduto"
                className="px-6 py-3 bg-teal-800/60 hover:bg-teal-800/80 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 active:scale-95 text-base"
              >
                + Adicionar
              </Link>
            </div>
          </div>
          <div className="flex md:flex-col gap-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 text-center text-white">
              <p className="text-3xl font-bold">{produtos.length}</p>
              <p className="text-sm text-teal-100">Produtos</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 text-center text-white">
              <p className="text-3xl font-bold">{categorias.length}</p>
              <p className="text-sm text-teal-100">Categorias</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: "Confiável",
              desc: "Dados sempre seguros e atualizados em tempo real.",
            },
            {
              icon: Clock,
              title: "Rápido",
              desc: "Interface ágil pensada para o dia a dia da farmácia.",
            },
            {
              icon: Truck,
              title: "Completo",
              desc: "Cadastre, edite e remova produtos e categorias facilmente.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-4 items-start"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {carouselItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Produtos em destaque
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Navegue pelo catálogo completo
              </p>
            </div>
            <Link
              to="/produtos"
              className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch min-h-[320px]">
              <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
                <FallbackImg
                  src={carouselItems[carouselIndex]?.foto}
                  alt={carouselItems[carouselIndex]?.nome}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  {carouselItems[carouselIndex]?.categoria && (
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-3">
                      {carouselItems[carouselIndex].categoria?.nome}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 leading-tight">
                    {carouselItems[carouselIndex]?.nome}
                  </h3>
                  <p className="text-3xl font-bold text-teal-600">
                    R${" "}
                    {Number(carouselItems[carouselIndex]?.preco ?? 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/editarProduto/${carouselItems[carouselIndex]?.id}`}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-sm"
                  >
                    Editar
                  </Link>
                  <Link
                    to="/produtos"
                    className="px-5 py-2.5 border border-slate-200 hover:border-teal-300 hover:bg-teal-50 text-slate-700 rounded-xl font-semibold text-sm transition-all"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-3 flex">
              <button
                onClick={() => goTo(carouselIndex - 1)}
                className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-3">
              <button
                onClick={() => goTo(carouselIndex + 1)}
                className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === carouselIndex
                      ? "w-6 h-2 bg-teal-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-teal-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {categorias.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Categorias
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Explore por tipo de produto
              </p>
            </div>
            <Link
              to="/categorias"
              className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categorias.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                to="/categorias"
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
                  <Tag className="w-5 h-5 text-teal-600" />
                </div>
                <p className="font-semibold text-slate-800 text-base leading-tight">
                  {cat.nome}
                </p>
                {cat.produto && (
                  <p className="text-sm text-slate-400 mt-1">
                    {cat.produto.length} produto
                    {cat.produto.length !== 1 ? "s" : ""}
                  </p>
                )}
              </Link>
            ))}
            <Link
              to="/cadastrarCategoria"
              className="bg-teal-50 border-2 border-dashed border-teal-200 hover:border-teal-400 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <Plus className="w-5 h-5 text-teal-600" />
              </div>
              <p className="font-semibold text-teal-600 text-sm text-center">
                Nova categoria
              </p>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
