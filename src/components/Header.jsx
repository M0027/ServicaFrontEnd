import { useState, useContext } from "react";
import { Bars3Icon, XMarkIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { FaUserCircle, FaUser } from 'react-icons/fa';
import AuthContext from "../context/AuthContext";

import Bell from './Notificacoes'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const { isAuthenticated, token, logout, NOTIFICATIONS } = useContext(AuthContext);
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usuarioComum, setUsuarioComum] = useState(true);
  const [texto, setTexto] = useState('');
  const [notificacoes, setNotificacoes] = useState([])
  const [navLinks, setNaveLinks] = useState([])
  const user = JSON.parse(localStorage.getItem('userData')) || null;




  // adicionar intes no meno caso nao seja logado

  const verperfil = () => {
    const user = JSON.parse(localStorage.getItem('userData')) || null;
    navigate('/prof_perfil', {state: {id:user.id}})
  }

  useEffect(() => {

    console.log(NOTIFICATIONS)
    setNotificacoes(() => NOTIFICATIONS)

    // logica para O BELL
    const BellFuncion = () => {

      if (isAuthenticated) {

        const user = JSON.parse(localStorage.getItem('userData')) || null;
        console.log(user)

        if (user && user.role === 'profissional') {
          setUsuarioComum(false);
          // setTexto('Propostas');
          // setNotificacoes(Prof_notificacoes)
          return
        }

        setTexto('Orcamentos')
        // setNotificacoes(User_notificacoes)
      } else {

      }


    }

    BellFuncion()


    const addMenu = () => {

      const menuLogado = [
        { name: "Home", href: "/" },
        { name: "Tornar-se Profissional", href: "/profile" },
        // { name: "Pedidos", href: "/orders" },
        { name: "Help", href: "/help" },
        { name: "Suporte", href: "https://wa.me/258833072296" },

      ];

      const user = JSON.parse(localStorage.getItem('userData')) || null;
      console.log(user)

      if (isAuthenticated) {
        let finalMenu = menuLogado;
        if (user && user.role === 'profissional') {
          finalMenu = menuLogado.filter(object => object.name !== 'Tornar-se Profissional');
        }
        setNaveLinks(finalMenu);
      } else {
        const menoIncompleto = [
          { name: "Entra", href: "/login" },
          { name: "Escrever-se", href: "/signup" }
        ];
        const menuCompleto = [...menuLogado, ...menoIncompleto];
        setNaveLinks(menuCompleto);
      }


    };

    addMenu();


  }, [isAuthenticated, token]);

  const handleLogout = () => {
    logout()
  };


  return (
    <header className="bg-[#800020] w-full text-white sticky top-0 z-20 shadow-md">
      <div className="container mx-auto px-4 py-3 flex  justify-between items-center">
        {/* Logo + Nome */}


        <div className="flex items-center space-x-2">
          {
            isAuthenticated ?
              <div onClick={()=> verperfil()} className="cursor-pointer flex gap-2">
                <FaUser className="text-2xl text-wight-400" />
                <span className="text-xl font-bold">{user?.name}</span>
              </div> :
              <>
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-start">
                <span className="text-[#800020] font-bold text-xl">SvJ</span> {/* Substitua por uma imagem */}
              </div>
              <span className="text-xl font-bold">Olá! Bem vindo ao ServiçaJá</span>
              </>
}
        </div>


        <Bell isLogged={isAuthenticated} isUser={usuarioComum} notifications={NOTIFICATIONS} texto={texto} />


        {/* Menu Desktop (telas grandes) */}
        <nav className="hidden md:flex  space-x-6 items-center">
          {isAuthenticated && user.role === 'profissional' && (
            <button
              onClick={() => navigate('/prof_perfil', { state: { id: user.id } })}
              className="text-white hover:text-[#FFD700] transition-colors focus:outline-none"
            >
              <FaUserCircle className="h-8 w-8" />
            </button>
          )}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#FFD700] transition-colors"
            >
              {link.name}
            </a>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-[#FFD700] transition-colors focus:outline-none"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <span>Sair</span>
            </button>
          )}
        </nav>

        {/* Menu Mobile (telas pequenas) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#800020] pb-4 px-4 shadow-md
        transition-all ease-in-out duration-300 transform origin-top scale-y-0 opacity-0"
          style={{ maxHeight: isMenuOpen ? '500px' : '0', opacity: isMenuOpen ? '1' : '0', transform: isMenuOpen ? 'scaleY(1)' : 'scaleY(0)' }}
        >
          {isAuthenticated && user.role === 'profissional' && (
            <button
              onClick={() => {
                navigate('/prof_perfil', { state: { id: user.id } });
                setIsMenuOpen(false); // Close menu after navigation
              }}
              className=" py-2 text-white hover:text-[#FFD700] transition-colors focus:outline-none flex items-center"
            >
              <FaUserCircle className="h-6 w-6 mr-2" />
              <span>{user?.name}</span>
            </button>
          )}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 hover:text-[#FFD700] transition-colors"
            >
              {link.name}
            </a>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 hover:text-[#FFD700] transition-colors focus:outline-none"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
              <span>Sair</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}