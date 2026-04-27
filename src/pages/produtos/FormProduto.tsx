import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  ImageIcon,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import {
  buscarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  buscarTodasCategorias,
} from "../../services/Service";

export default function FormProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = Boolean(id);

  const [produto, setProduto] = useState<Partial<Produto>>({
    nome: "",
    preco: 0,
    foto: "",
    categoria: undefined,
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(isEdicao);
  const [imgError, setImgError] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "ok" | "erro";
    msg: string;
  } | null>(null);

  useEffect(() => {
    buscarTodasCategorias(setCategorias).catch(console.error);
    if (isEdicao && id) {
      buscarProdutoPorId(id as any, (data: Produto) => {
        setProduto(data);
        setCarregando(false);
      }).catch(() => setCarregando(false));
    }
  }, [id, isEdicao]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "categoriaId") {
      const cat = categorias.find((c) => c.id === Number(value));
      setProduto((prev) => ({ ...prev, categoria: cat }));
    } else if (name === "preco") {
      setProduto((prev) => ({ ...prev, preco: parseFloat(value) || 0 }));
    } else {
      setProduto((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "foto") setImgError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!produto.nome?.trim()) {
      setFeedback({ tipo: "erro", msg: "O nome é obrigatório." });
      return;
    }
    if (!produto.categoria?.id) {
      setFeedback({ tipo: "erro", msg: "Selecione uma categoria." });
      return;
    }

    try {
      setLoading(true);
      setFeedback(null);
      if (isEdicao) {
        await atualizarProduto(produto, () => {});
      } else {
        await cadastrarProduto(produto, () => {});
      }
      setFeedback({
        tipo: "ok",
        msg: isEdicao ? "Produto atualizado!" : "Produto cadastrado!",
      });
      setTimeout(() => navigate("/produtos"), 1200);
    } catch {
      setFeedback({ tipo: "erro", msg: "Erro ao salvar. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {isEdicao ? "Editar Produto" : "Novo Produto"}
          </h1>
          <p className="text-slate-500 mt-1">
            {isEdicao
              ? "Atualize as informações do produto."
              : "Preencha os dados para cadastrar."}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {feedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl mb-6 text-base font-medium animate-fade-in ${
              feedback.tipo === "ok"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {feedback.tipo === "ok" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            {feedback.msg}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-52 overflow-hidden bg-slate-50 relative">
            {produto.foto && !imgError ? (
              <img
                src={produto.foto}
                alt="preview"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-300">
                <ShoppingBag className="w-14 h-14" />
                <p className="text-sm">Pré-visualização da imagem</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-base font-semibold text-slate-700"
                htmlFor="nome"
              >
                Nome do produto <span className="text-rose-500">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={produto.nome || ""}
                onChange={handleChange}
                placeholder="Ex: Dipirona 500mg"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-base font-semibold text-slate-700"
                htmlFor="preco"
              >
                Preço (R$) <span className="text-rose-500">*</span>
              </label>
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={produto.preco || ""}
                onChange={handleChange}
                placeholder="0,00"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-base font-semibold text-slate-700"
                htmlFor="foto"
              >
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> URL da imagem
                </span>
              </label>
              <input
                id="foto"
                name="foto"
                type="url"
                value={produto.foto || ""}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-base font-semibold text-slate-700"
                htmlFor="categoriaId"
              >
                Categoria <span className="text-rose-500">*</span>
              </label>
              <select
                id="categoriaId"
                name="categoriaId"
                value={produto.categoria?.id || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
              >
                <option value="">Selecione uma categoria...</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-base transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-xl font-semibold text-base transition-all active:scale-95 shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />{" "}
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />{" "}
                    {isEdicao ? "Atualizar" : "Cadastrar"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
