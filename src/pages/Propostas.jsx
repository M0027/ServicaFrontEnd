import { useState } from 'react';
import { FaUser, FaWhatsapp, FaCheck, FaTimes, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Array fictício de profissionais (5)
const mockProfessionals = [
  { id: 1, name: "Carlos Refrigerista", phone: "+258841234567", rating: 4.8 },
  { id: 2, name: "Maria Técnica", phone: "+258821234567", rating: 4.5 },
  { id: 3, name: "João Especialista", phone: "+258851234567", rating: 4.9 },
  { id: 4, name: "Ana Reparadora", phone: "+258871234567", rating: 4.7 },
  { id: 5, name: "Lúcia Cool", phone: "+258891234567", rating: 4.6 }
];

// Array fictício de respostas (6)
const mockResponses = [
  {
    id: 1,
    requestId: 101,
    professionalId: 1,
    price: 2500,
    message: "Faço o reparo em 24h com peças originais. Garantia de 3 meses.",
    completionDate: "2023-12-20"
  },
  {
    id: 2,
    requestId: 101,
    professionalId: 2,
    price: 1800,
    message: "Posso começar amanhã. Uso materiais de qualidade.",
    completionDate: "2023-12-18"
  },
  {
    id: 3,
    requestId: 101,
    professionalId: 3,
    price: 3000,
    message: "Especialista em geladeiras industriais. Tempo estimado: 2 dias.",
    completionDate: "2023-12-22"
  },
  {
    id: 4,
    requestId: 101,
    professionalId: 4,
    price: 2000,
    message: "Atendo urgências. Valor inclui peças básicas.",
    completionDate: "2023-12-19"
  },
  {
    id: 5,
    requestId: 101,
    professionalId: 5,
    price: 2200,
    message: "10 anos de experiência. Orçamento sem compromisso.",
    completionDate: "2023-12-21"
  },
  {
    id: 6,
    requestId: 101,
    professionalId: 2, // Maria novamente (para demonstrar repetição)
    price: 1900,
    message: "Segunda opção com desconto para pagamento à vista.",
    completionDate: "2023-12-17"
  }
];

export default function RequestResponses() {
  const [responses, setResponses] = useState(mockResponses.slice(0, 5)); // Limita a 5 respostas

  // Animação simples sem biblioteca
  const fadeIn = {
    opacity: 1,
    transition: 'opacity 0.5s ease-in'
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-vinho mb-8">Respostas ao Pedido #101</h1>

        <div className="space-y-6">
          {responses.map((response, index) => {
            const professional = mockProfessionals.find(p => p.id === response.professionalId);
            
            return (
              <div 
                key={response.id}
                style={{ opacity: 0, ...fadeIn }}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Link 
                      to={`/professional-profile/${professional.id}`}
                      className="text-vinho hover:text-[#6a001a] transition-colors"
                    >
                      <FaUser className="text-3xl mr-4" />
                    </Link>
                    <div>
                      <h3 className="font-bold text-lg">{professional.name}</h3>
                      <p className="text-gray-500">Avaliação: {professional.rating}/5</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl text-vinho">{response.price} MZN</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 mb-4">{response.message}</p>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaCalendarAlt className="mr-2 text-vinho" />
                    <span>Conclusão: {new Date(response.completionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMoneyBillWave className="mr-2 text-vinho" />
                    <span>Forma de pagamento: 50% adiantado</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center">
                    <FaTimes className="mr-2" /> Rejeitar
                  </button>
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center">
                    <FaCheck className="mr-2" /> Aprovar
                  </button>
                  {/* <a 
                    href={`https://wa.me/${professional.phone}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
                  >
                    <FaWhatsapp className="mr-2 text-xl" /> WhatsApp
                  </a> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}