import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login/Login";
import Admin from "../src/components/PainelAdmin/DashBoard";
import PrivateRoute from "../backend/src/routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />

        {/* Rotas protegidas: todas as rotas 'filhas' do PrivateRoute exigem autenticação */}
        <Route element={<PrivateRoute />}>
          <Route path="/DashBoard" element={<Admin />} />
          {/* aqui pode ser adicionado outras rotas protegidas */}
        </Route>

        {/* rota padrão -> redireciona para login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
