import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag, AlertTriangle } from "lucide-react";
import type Produto from "../../models/Produto";
import { buscarProdutoPorId, deletarProduto } from "../../services/Service";
import { Spinner } from "../../components/Loading";
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
      <div className="w-full h-48 bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center">
        <ShoppingBag className="w-12 h-12 text-rose-200" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setErr(true)}
    />
  );}
export default function DeletarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletando, setDeletando] = useState(false);

  useEffect(() => {
    if (id) {
      buscarProdutoPorId(id as any, (data: Produto) => {
        setProduto(data);
        setLoading(false);
      }).catch(() => {
        navigate("/produtos");
        setLoading(false);
      });
    }
  }, [id, navigate]);

  const confirmar = async () => {
    if (!id) return;
    try {
      setDeletando(true);
      await deletarProduto(Number(id));
      navigate("/produtos");
    } catch {
      setDeletando(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {produto && <FallbackImg src={produto.foto} alt={produto.nome} />}

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Excluir produto?
                </h2>
                <p className="text-sm text-slate-500">
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>
            {produto && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6">
                <p className="font-bold text-slate-800 text-lg">
                  {produto.nome}
                </p>
                <p className="text-teal-600 font-semibold text-base mt-1">
                  R${" "}
                  {Number(produto.preco ?? 0)
                    .toFixed(2)
                    .replace(".", ",")}
                </p>
                {produto.categoria && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-white border border-rose-100 text-slate-600 text-xs rounded-full">
                    {produto.categoria.nome}
                  </span>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-base transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmar}
                disabled={deletando}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white rounded-xl font-semibold text-base transition-all active:scale-95"
              >
                {deletando ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" /> Excluir
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
