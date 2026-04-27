import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import type Categoria from "../../models/Categoria";
import {
  buscarCategoriaPorId,
  cadastrarCategoria,
  atualizarCategoria,
} from "../../services/Service";

export default function FormCategoria(){
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = Boolean(id);
  const [categoria, setCategoria] = useState<Partial<Categoria>>({ nome: "" });
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(isEdicao);
  const [feedback, setFeedback] = useState<{
    tipo: "ok" | "erro";
    msg: string;
  } | null>(null);
  useEffect(()=>{
    if (isEdicao && id){
      buscarCategoriaPorId(Number(id), (data: Categoria)=>{
        setCategoria(data);
        setCarregando(false);
      }).catch(()=>setCarregando(false));
    }
  }, [id, isEdicao]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setCategoria((prev)=>({ ...prev, nome: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent)=>{
    e.preventDefault();
    if (!categoria.nome?.trim()) {
      setFeedback({ tipo: "erro", msg: "O nome é obrigatório." });
      return;
    }
    try {
      setLoading(true);
      setFeedback(null);
      if (isEdicao) {
        await atualizarCategoria(categoria, () => {});
      } else {
        await cadastrarCategoria(categoria, () => {});
      }
      setFeedback({
        tipo: "ok",
        msg: isEdicao ? "Categoria atualizada!" : "Categoria cadastrada!",
      });
      setTimeout(() => navigate("/categorias"), 1200);
    } catch {
      setFeedback({ tipo: "erro", msg: "Erro ao salvar. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }
  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
      </div>
    )
  }
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
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {isEdicao ? "Editar Categoria" : "Nova Categoria"}
              </h1>
              <p className="text-teal-100 text-sm">
                {isEdicao ? "Atualize o nome." : "Crie uma nova categoria."}
              </p>
            </div>
          </div>
          <div className="p-6">
            {feedback && (
              <div
                className={`flex items-center gap-3 p-4 rounded-xl mb-5 text-base font-medium animate-fade-in ${
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-base font-semibold text-slate-700"
                  htmlFor="nome"
                >
                  Nome da categoria <span className="text-rose-500">*</span>
                </label>
                <input
                  id="nome"
                  type="text"
                  value={categoria.nome || ""}
                  onChange={handleChange}
                  placeholder="Ex: Analgésicos, Vitaminas..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex gap-3 pt-1">
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
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
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
      </div>
    </main>
  )}
