import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

export default function App() {
  return (

    
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfessionalProfiles />} />
        <Route path="/order" element={<Pedidos />} />
        <Route path="/orderResponse" element={<ResponderPedidos />} />
        <Route path="/orders" element={<ListOrder />} />
        <Route path="/propos" element={<PropostasUser/>} />
        <Route path="/prof_perfil/" element={<Perfil_Prof/>} />
        <Route path="/prof_respostas" element={<Perfil_Respostas/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}