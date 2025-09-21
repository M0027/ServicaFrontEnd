import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import AuthContext from './context/AuthContext';
import { setupAxiosInterceptors } from './services/api';

// pagenas
import Home  from './pages/Home';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Pedidos from './pages/Pedidos'
import ResponderPedidos from './pages/ResponderPedidos'
import ListaPedidos from './pages/ListarPedidos'
import PropostasUser from './pages/Propostas'
import Perfil_Respostas from './pages/Prof_Respostas'
import Perfil_Prof from './pages/Prof_perfil'
import ProfessionalProfiles from './pages/ProfessionalProfile'
import ListOrder from "./pages/Orders"
import HelpPage from'./pages/HelpPage'
import SubScriptionHelpPage from'./pages/Subscripion'
import { NotFound404, Unauthorized401, Forbidden403, NetworkError500 } from "./pages/ErrorPages";


// componentes
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setupAxiosInterceptors(logout, navigate);
  }, [logout, navigate]);

  return (

    
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfessionalProfiles />} />
        {/* Protected Routes */}
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="/orderResponse"
          element={
            <PrivateRoute>
              <ResponderPedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <ListOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="/propos"
          element={
            <PrivateRoute>
              <PropostasUser/>
            </PrivateRoute>
          }
        />
        <Route
          path="/prof_perfil/"
          element={
            <PrivateRoute>
              <Perfil_Prof/>
            </PrivateRoute> 
          }
        />
        <Route
          path="/prof_respostas"
          element={
            <PrivateRoute>
              <Perfil_Respostas/>
            </PrivateRoute>
          }
        />
        <Route
          path="/subiscription"
          element={
            <PrivateRoute>
              <SubScriptionHelpPage/>
            </PrivateRoute>
          }
        />
         {/* rotas específicas de erro */}
         <Route path="/401" element={<Unauthorized401 />} />
        <Route path="/403" element={<Forbidden403 />} />
        <Route path="/500" element={<NetworkError500 />} />
        <Route path="/help" element={<HelpPage />} />

        {/* rota coringa para 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      <Footer/>
    </div>
  );
}