import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import PaginaErro from "./pages/PaginaErro";

import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PaginaErro />} />
        </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  );
}

export default App;