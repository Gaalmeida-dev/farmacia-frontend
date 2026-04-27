import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Pencil, Trash2, Tag, X } from "lucide-react";
import type Categoria from "../../models/Categoria";
import { buscarTodasCategorias } from "../../services/Service";
import { SkeletonGrid } from "../../components/Loading";

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  const carregar = async () => {
    try {
      setLoading(true);
      await buscarTodasCategorias(setCategorias);
    } catch {
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const COLORS = [
    "bg-teal-50 text-teal-600 border-teal-100",
    "bg-sky-50 text-sky-600 border-sky-100",
    "bg-violet-50 text-violet-600 border-violet-100",
    "bg-amber-50 text-amber-600 border-amber-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100",
    "bg-rose-50 text-rose-600 border-rose-100",
  ];

  const categoriasFiltradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Categorias
              </h1>
              <p className="text-slate-500 mt-1 text-base">
                {loading
                  ? "Carregando..."
                  : `${categoriasFiltradas.length} categoria${categoriasFiltradas.length !== 1 ? "s" : ""} encontrada${categoriasFiltradas.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <Link
              to="/cadastrarCategoria"
              className="flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 text-base"
            >
              <Plus className="w-5 h-5" /> Nova categoria
            </Link>
          </div>
          <div className="mt-5 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar categoria por nome..."
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <SkeletonGrid count={6} />
        ) : categoriasFiltradas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center">
              <Tag className="w-8 h-8 text-teal-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-slate-500 max-w-xs">
              {busca
                ? `Sem resultados para "${busca}".`
                : "Crie sua primeira categoria para organizar os produtos."}
            </p>
            {!busca && (
              <Link
                to="/cadastrarCategoria"
                className="mt-2 px-5 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                + Nova categoria
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoriasFiltradas.map((cat, i) => {
              const colorClass = COLORS[i % COLORS.length];
              return (
                <div
                  key={cat.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorClass}`}
                    >
                      <Tag className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-800 text-xl mb-6">
                    {cat.nome}
                  </h3>
                  <div className="flex gap-2">
                    <Link
                      to={`/editarCategoria/${cat.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Pencil className="w-4 h-4" /> Editar
                    </Link>
                    <Link
                      to={`/deletarCategoria/${cat.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-semibold text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
