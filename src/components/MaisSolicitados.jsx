import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../services/api'

export default function PopularServices() {

  const navigate = useNavigate()
  const [services, setServices] = useState([]);

  const BuscarProfissoes = async () => {
    try {
      const busca = await api.get('/services');
      setServices(busca.data);
    } catch (error) {
      console.error('erro ao carregar servicos:', error);
    }
  };

  useEffect(() => {
    BuscarProfissoes();
  }, []);

  // Array de serviços simulados
  // const services = [
  //   "Encanador",
  //   "Eletricista",
  //   "Pedreiro",
  //   "Pintor",
  //   "Jardineiro",
  //   "Técnico de Ar Condicionado",
  //   "Marceneiro",
  //   "Chaveiro",
  //   "Mecânico Automotivo",
  //   "Montador de Móveis",
  // ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Os mais solicitados:
        </h2>

        {/* Container dos botões */}
        <div className="flex flex-wrap gap-3">
          {services.map((service, index) => (
            <button
            onClick={()=> navigate('/order', {state: {termos_De_pesquisa:service.name}})}
              key={index}
              className="bg-white text-vinho border-2 border-vinho hover:bg-vinho hover:text-white px-4 py-2 rounded-full transition-colors duration-300"
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}