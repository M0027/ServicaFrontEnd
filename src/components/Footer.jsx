import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {

   const profissioma = true;


  return (
    <footer className="bg-vinho text-white py-8">
      <div className="container mx-auto px-4">
        {/* Seção Superior (Redes + Botão) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Redes Sociais */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-gold transition-colors">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>

          {/* Botão "Tornar-se Profissional" */}

          {
            !profissioma?
            <button className="bg-gold text-vinho font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors">
            Tornar-se Profissional
          </button> : null
          }
        </div>

        {/* Divisor */}
        <hr className="border-gray-600 mb-6" />

        {/* Copyright */}
        <div className="text-center">
          <p>
            &copy; 2025 <span className="font-bold">Sevica ja</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}