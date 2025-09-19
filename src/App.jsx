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
      </Routes>
      <Footer/>
    </div>
  );
}