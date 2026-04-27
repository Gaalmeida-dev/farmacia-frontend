import { Link } from "react-router-dom";
import { Pill} from "lucide-react";

export default function Footer(){
    return(
        <footer className="bg-slate-800 text-slate-300 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex flex-col gap-2">
                     <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-white" />
                      </div>
                     <span className="text-lg font-bold text-white">
                      Farma<span className="text-teal-400">Tech</span>
                      </span>
                      </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              Um mundo moderno exige uma saúde moderna.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link to="/" className="hover:text-teal-400 transition-colors py-1">Início</Link>
            <Link to="/produtos" className="hover:text-teal-400 transition-colors py-1">Produtos</Link>
            <Link to="/categorias" className="hover:text-teal-400 transition-colors py-1">Categorias</Link>
            <Link to="/cadastrarProduto" className="hover:text-teal-400 transition-colors py-1">Novo Produto</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>© 2026 FarmaTech</p>
          <p className="flex items-center gap-1.5">
            Feito por Gabriela Almeida
          </p>
        </div>
      </div>
    </footer>
  )
}