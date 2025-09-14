import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTools, FaArrowRight } from 'react-icons/fa';
import { data, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Para animações
import api from '../services/api';
import { configs } from 'eslint-plugin-react-refresh';

// Array fictício de pedidos (5 refrigeristas em Namaacha + outros)
const mockRequests = [
  {
    id: 1,
    title: "Reparo de Geladeira",
    description: "Geladeira não está gelando. Precisa de reparo urgente.",
    location: "Namaacha",
    deliveryDate: "2023-12-15",
    serviceType: "Refrigerista"
  },
  {
    id: 2,
    title: "Manutenção de Ar Condicionado",
    description: "Ar-condicionado fazendo barulho estranho.",
    location: "Namaacha",
    deliveryDate: "2023-12-18",
    serviceType: "Refrigerista"
  },
  {
    id: 3,
    title: "Instalação de Freezer",
    description: "Preciso instalar um freezer em meu mercado.",
    location: "Namaacha",
    deliveryDate: "2023-12-20",
    serviceType: "Refrigerista"
  },
  {
    id: 4,
    title: "Recarga de Gás",
    description: "Geladeira precisa de recarga de gás.",
    location: "Namaacha",
    deliveryDate: "2023-12-22",
    serviceType: "Refrigerista"
  },
  {
    id: 5,
    title: "Reparo de Câmara Frigorífica",
    description: "Câmara frigorífica não mantém temperatura.",
    location: "Namaacha",
    deliveryDate: "2023-12-25",
    serviceType: "Refrigerista"
  },
  // Outros pedidos (não compatíveis)
  {
    id: 6,
    title: "Pintura Residencial",
    description: "Preciso pintar minha casa de 3 quartos.",
    location: "Maputo",
    deliveryDate: "2023-12-10",
    serviceType: "Pintor"
  },
  {
    id: 7,
    title: "Reparo Elétrico",
    description: "Quadro de luz está desligando sozinho.",
    location: "Matola",
    deliveryDate: "2023-12-12",
    serviceType: "Eletricista"
  },
  {
    id: 8,
    title: "Montagem de Móveis",
    description: "Preciso montar 2 guarda-roupas.",
    location: "Boane",
    deliveryDate: "2023-12-14",
    serviceType: "Montador"
  },
  {
    id: 9,
    title: "Jardim Residencial",
    description: "Cortar grama e podar árvores.",
    location: "Namaacha",
    deliveryDate: "2023-12-16",
    serviceType: "Jardineiro"
  },
  {
    id: 10,
    title: "Reparo de Porta",
    description: "Porta de madeira está rangendo.",
    location: "Namaacha",
    deliveryDate: "2023-12-17",
    serviceType: "Carpinteiro"
  }
];

export default function ProfessionalRequests() {

  const navigata = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [filteredRequests, setFilteredRequests] = useState([]);
  const professionalLocation = "Namaacha";
  const professionalService = "Refrigerista";

  // Filtra pedidos compatíveis
  useEffect(() => {

    const token = userData.token;

    if (!token) {
      navigata('/login')
    }

    const buscarPedidos = async () => {

      try {

        console.log(token)
        const enviar = await api.get('/pedidos', {
          body: {
            'service_id': 1,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const pedidos = enviar.data

        console.log(pedidos)

      } catch (error) {
        console.error('erro ao buscar pedidos', error)
      }

    }


    buscarPedidos()



    const filtered = mockRequests.filter(
      request =>
        request.location === professionalLocation &&
        request.serviceType === professionalService
    );
    setFilteredRequests(filtered);
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-vinho mb-8">
          Pedidos em <span className="underline">{professionalLocation}</span> para <span className="underline">{professionalService}</span>
        </h1>

        {/* Lista de Pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{request.title}</h2>
                <p className="text-gray-600 mb-4">{request.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-2 text-vinho" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-vinho" />
                    <span>Entrega até: {new Date(request.deliveryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaTools className="mr-2 text-vinho" />
                    <span>{request.serviceType}</span>
                  </div>
                </div>

                <Link
                  to={`/orderResponse?requestId=${request.id}`}
                  className="mt-6 inline-flex items-center justify-center w-full bg-vinho text-white py-2 px-4 rounded-lg hover:bg-[#6a001a] transition-colors"
                >
                  Responder Pedido <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem se não houver pedidos */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Nenhum pedido compatível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}