import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListarProdutos from "./pages/produtos/ListarProdutos";
import FormProduto from "./pages/produtos/FormProduto";
import DeletarProduto from "./pages/produtos/DeletarProduto";
import ListarCategorias from "./pages/categorias/ListarCategorias";
import FormCategoria from "./pages/categorias/FormCategoria";
import DeletarCategoria from "./pages/categorias/DeletarCategorias";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/"                         element={<Home />} />
            <Route path="/produtos"                 element={<ListarProdutos />} />
            <Route path="/cadastrarProduto"         element={<FormProduto />} />
            <Route path="/editarProduto/:id"        element={<FormProduto />} />
            <Route path="/deletarProduto/:id"       element={<DeletarProduto />} />
            <Route path="/categorias"               element={<ListarCategorias />} />
            <Route path="/cadastrarCategoria"       element={<FormCategoria />} />
            <Route path="/editarCategoria/:id"      element={<FormCategoria />} />
            <Route path="/deletarCategoria/:id"     element={<DeletarCategoria />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}