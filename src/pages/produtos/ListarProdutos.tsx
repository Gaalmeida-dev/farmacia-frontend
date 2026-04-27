import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Pencil, Trash2, ShoppingBag, X } from "lucide-react";
import type Produto from "../../models/Produto";
import {
  buscarTodosProdutos,
  buscarProdutoPorNome,
} from "../../services/Service";
import { SkeletonGrid } from "../../components/Loading";

function FallbackImg({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string | undefined;
}) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className="w-full h-44 bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
        <ShoppingBag className="w-10 h-10 text-teal-300" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}
export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [buscando, setBuscando] = useState(false);

  const carregar = async () => {
    try {
      setLoading(true);
      await buscarTodosProdutos(setProdutos);
    } catch {
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    carregar();
  }, []);

  const handleBusca = async (valor: string) => {
    setBusca(valor);
    if (!valor.trim()) {
      carregar();
      return;
    }
    try {
      setBuscando(true);
      await buscarProdutoPorNome(valor, setProdutos);
    } catch {
      setProdutos([]);
    } finally {
      setBuscando(false);
    }
  };

  const limparBusca = () => {
    setBusca("");
    carregar();
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Produtos
              </h1>
              <p className="text-slate-500 mt-1 text-base">
                {loading
                  ? "Carregando..."
                  : `${produtos.length} produto${produtos.length !== 1 ? "s" : ""} encontrado${produtos.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <Link
              to="/cadastrarProduto"
              className="flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-base"
            >
              <Plus className="w-5 h-5" /> Novo produto
            </Link>
          </div>

          <div className="mt-5 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => handleBusca(e.target.value)}
              placeholder="Buscar produto por nome..."
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            {busca && (
              <button
                onClick={limparBusca}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading || buscando ? (
          <SkeletonGrid count={6} />
        ) : produtos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-teal-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">
              Nenhum produto encontrado
            </h3>
            <p className="text-slate-500 max-w-xs">
              {busca
                ? `Sem resultados para "${busca}". Tente outro nome.`
                : "Comece adicionando seu primeiro produto."}
            </p>
            {!busca && (
              <Link
                to="/cadastrarProduto"
                className="mt-2 px-5 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                + Adicionar produto
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((p, i) => (
              <div
                key={p.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="overflow-hidden">
                  <FallbackImg src={p.foto} alt={p.nome} />
                </div>
                <div className="p-5">
                  {p.categoria && (
                    <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full mb-2">
                      {p.categoria.nome}
                    </span>
                  )}
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 line-clamp-2">
                    {p.nome}
                  </h3>
                  <p className="text-2xl font-bold text-teal-600 mb-4">
                    R${" "}
                    {Number(p.preco ?? 0)
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      to={`/editarProduto/${p.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Pencil className="w-4 h-4" /> Editar
                    </Link>
                    <Link
                      to={`/deletarProduto/${p.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
