import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Pill,
  ShoppingBag,
  Tag,
  Home,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropProdutos, setDropProdutos] = useState(false);
  const [dropCategorias, setDropCategorias] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropProdutos(false);
    setDropCategorias(false);
  }, [pathname]);

  const isActive = (path: string) =>
    pathname === path
      ? "text-teal-600 font-semi-bold"
      : "text-slate-700 hover:text-teal-600";
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration 300 ${scrolled ? "bg-white/95 backdrop-blur-md" : "bg-white shadow-sm"}`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm group-hover:bg-teal-700 transition-colors">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">
            Farma <span className="text-teal-600">Tech</span>
          </span>
        </Link>
        <ul className="hidden md:flec items-center gap-1 text-[15px] font-medium">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${isActive("/")}`}
            >
              <Home className="w-4 h-4" /> Início
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => {
                setDropProdutos((p) => !p);
                setDropCategorias(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                pathname.includes("produto")
                  ? "text-teal-600 font-semibold"
                  : "text-slate-700 hover:text-teal-600"
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Produtos
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${dropProdutos ? "rotate-180" : ""}`}
              />
            </button>
            {dropProdutos && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                <Link
                  to="/produtos"
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  Ver todos os produtos
                </Link>
                <Link
                  to="/cadastrarProduto"
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  Adicionar produto
                </Link>
              </div>
            )}
          </li>
          <li className="relative">
            <button
              onClick={() => {
                setDropCategorias((p) => !p);
                setDropProdutos(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                pathname.includes("categoria")
                  ? "text-teal-600 font-semibold"
                  : "text-slate-700 hover:text-teal-600"
              }`}
            >
              <Tag className="w-4 h-4" /> Categorias
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${dropCategorias ? "rotate-180" : ""}`}
              />
            </button>
            {dropCategorias && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                <Link
                  to="/categorias"
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  Ver todas as categorias
                </Link>
                <Link
                  to="/cadastrarCategoria"
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  Adicionar categoria
                </Link>
              </div>
            )}
          </li>
        </ul>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/cadastrarProduto"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            + Novo Produto
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 animate-fade-in">
          <ul className="flex flex-col gap-1 pt-3 text-base font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <Home className="w-5 h-5" /> Início
              </Link>
            </li>
            <li className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Produtos
            </li>
            <li>
              <Link
                to="/produtos"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" /> Ver todos
              </Link>
            </li>
            <li>
              <Link
                to="/cadastrarProduto"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" /> Adicionar produto
              </Link>
            </li>
            <li className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categorias
            </li>
            <li>
              <Link
                to="/categorias"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <Tag className="w-5 h-5" /> Ver todas
              </Link>
            </li>
            <li>
              <Link
                to="/cadastrarCategoria"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                <Tag className="w-5 h-5" /> Adicionar categoria
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
