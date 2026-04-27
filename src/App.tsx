import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ListarProdutos from "./pages/produtos/ListarProdutos";
import FormProduto from "./pages/produtos/FormProduto";
import DeletarProduto from "./pages/produtos/DeletarProduto";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<ListarProdutos />} />
          <Route path="/cadastrarProduto" element={<FormProduto />} />
          <Route path="/editarProduto/:id" element={<FormProduto />} />
          <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;