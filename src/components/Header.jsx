import { useState } from "react";
import { Bars3Icon, XMarkIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { FaUserCircle } from 'react-icons/fa';

import Bell from './Notificacoes'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logado, setLogado] = useState(false);
  const [usuarioComum, setUsuarioComum] = useState(false);
  const [texto, setTexto] = useState('');
  const [notificacoes, setNotificacoes] = useState([])
  const [navLinks, setNaveLinks] = useState([])
  const [userData, setUserData] = useState({})
  
  
  
  useEffect(()=>{
    
    const data = JSON.parse(localStorage.getItem('userData')) || {};
    setUserData(data);

  },[logado])

  
  
  // adicionar intes no meno caso nao seja logado
  
  useEffect(() => {
    const Prof_notificacoes = [
      
    ]
    const User_notificacoes = [

    ]
    // logica para O BELL
    const BellFuncion = () => {

      if (userData.token) {
        setLogado(true);
        // console.log('logado', logado)

        if (userData.user.role =='profissional') {
          setUsuarioComum(false);
          setTexto('Respostas');
          setNotificacoes(Prof_notificacoes)
          return
        }

        setTexto('Orcamentos')
        setNotificacoes(User_notificacoes)
      } else {
        setLogado(false)
      }


    }

    BellFuncion()

  
    const addMenu = () => {

      const menuLogado = [
        { name: "Home", href: "/" },
        { name: "Tornar-se Profissional", href: "/profile" },
        { name: "Help", href: "#" },
        { name: "Suporte", href: "#" },

      ];

      if (logado) {
        let finalMenu = menuLogado;
        if (userData.user && userData.user.role === 'profissional') {
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


  }, [userData, logado]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setLogado(false);
    setUserData({});
    // Optionally redirect to home or login page
    navigate('/login'); 
  };


  return (
    <header className="bg-[#800020] text-white sticky top-0 z-20 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#800020] font-bold text-xl">SvJ</span> {/* Substitua por uma imagem */}
          </div>
          <span className="text-xl font-bold">SeVica ja</span>
        </div>


        <Bell isLogged={logado} isUser={usuarioComum} notifications={notificacoes} texto={texto} />


        {/* Menu Desktop (telas grandes) */}
        <nav className="hidden md:flex space-x-6 items-center">
          {logado && userData.user && userData.user.role === 'profissional' && (
            <button
              onClick={() => navigate('/prof_perfil', { state: { id: userData.user.id } })}
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
          {logado && (
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
          {logado && userData.user && userData.user.role === 'profissional' && (
            <button
              onClick={() => {
                navigate('/prof_perfil', { state: { id: userData.user.id } });
                setIsMenuOpen(false); // Close menu after navigation
              }}
              className=" py-2 text-white hover:text-[#FFD700] transition-colors focus:outline-none flex items-center"
            >
              <FaUserCircle className="h-6 w-6 mr-2" />
              <span>Meu Perfil</span>
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
          {logado && (
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