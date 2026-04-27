import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, ArrowLeft, Tag, AlertTriangle } from "lucide-react";
import type Categoria from "../../models/Categoria";
import { buscarCategoriaPorId, deletarCategoria } from "../../services/Service";
import { Spinner } from "../../components/Loading";

export default function DeletarCategoria(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletando, setDeletando] = useState(false);
  useEffect(()=>{
    if (id) {
      buscarCategoriaPorId(Number(id), (data: Categoria)=>{
        setCategoria(data);
        setLoading(false);
      }).catch(() => {
        navigate("/categorias");
        setLoading(false);
      });
    }
  }, [id, navigate]);

  const confirmar =async ()=>{
    if (!id) return;
    try {
      setDeletando(true);
      await deletarCategoria(Number(id));
      navigate("/categorias");
    } catch {
      setDeletando(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <button
          onClick={()=> navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Excluir Categoria
              </h2>
              <p className="text-rose-100 text-sm">
                Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>

          <div className="p-6">
            {categoria && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                  <Tag className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xl">
                    {categoria.nome}
                  </p>
                </div>
              </div>
            )}

            <p className="text-slate-600 text-base mb-6">
              Tem certeza que deseja excluir esta categoria? Os produtos
              vinculados podem ser afetados.
            </p>

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
  )}
