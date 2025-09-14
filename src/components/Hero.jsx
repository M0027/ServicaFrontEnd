import { input } from "framer-motion/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'

export default function Hero() {

  const navigate = useNavigate()
  const [suggestionsList, setSuggestionsList] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState([]);
  // Array de sugestões (profissões)
  // const suggestionsList = [
  //   "Encanador",
  //   "Eletricista",
  //   "Designer de Interiores",
  //   "Pedreiro",
  //   "Jardineiro",
  //   "Técnico de Informática",
  //   "Refregerista",
  //   "Pintor",
  //   "Mecânico",
  //   "Cozinheiro Profissional",
  // ];

  const BuscarProfissoes = async () => {

    try {

      const busca = await api.get('/services')
      const servicos = busca.data;

      console.log(servicos)
      setSuggestionsList(servicos);

    } catch (error) {
      console.error('erro ao carregar servicos:', error)

    } finally {
      setLoading(false)
    }

  }

  // useEffect para buscar servicos

  useEffect(() => {
    BuscarProfissoes()
  }, [])


  // Filtra sugestões conforme o input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = suggestionsList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Seleciona uma sugestão
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
    navigate('/order', { state: { termos_De_pesquisa: suggestion.name } })


  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Texto Chamativo + Espaço para Anúncios */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Encontre os <span className="font-bold text-vinho">melhores serviços</span> que precisas perto de ti
            </h1>
          </div>
          <div className="md:w-1/2 bg-transparent  rounded-lg flex items-center justify-center">
            {/* <p className="text-gray-500">Espaço reservado para anúncios</p> */}
            <img className="object-cover max-h-80 rounded-lg min-w-80" src="./hero2.jpg" alt="pintor" />
          </div>
        </div>

        {/* Input de Busca com Sugestões */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="O que você precisa?"
            className="w-full p-4 text-lg border-0 shadow-md rounded-full focus:ring-2 focus:ring-gold focus:outline-none"
          />

          {/* Lista de Sugestões */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-50 w-full mt-2 bg-white shadow-lg rounded-lg py-2 max-h-60 overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}