import React, { useState, useEffect , useContext} from 'react';
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaTrash, FaCheck, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Proposta, UserData } from '../types/interfaces';
import AuthContext from '../context/AuthContext';

// Array fictício de propostas (para o profissional ID 1)
// const mockProposals = [
// ... existing code ...
// ];

export default function MyProposals() {

  const {isAuthenticated, token}= useContext(AuthContext)
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');
  const user = userData;

  const handleViewClientProfile = (clientId: string) => {
    navigate('/prof_perfil', { state: { id: clientId } });
    console.log(clientId)
  };

  useEffect(() => {
   

    const buscarPropostas = async () => {
      // const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');
      try {
        setLoading(true);

        if (user?.role !=='profissional') {
           const response = await api.get(`/propostas/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPropostas(response.data);
        console.log('Propostas fetched:', response.data);
        } else {

            const response = await api.get(`/propostas/byProf/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          
        setPropostas(response.data);
        console.log('Propostas fetched:', response.data);
        }
       



      } catch (error) {
        console.error('Erro ao buscar propostas:', error);
        // Optionally handle specific error messages or redirects
      } finally {
        setLoading(false);
      }
    };

    buscarPropostas();
  }, [navigate]);

  const handleDelete = async (proposalId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta proposta?")) {
      const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      setLoading(true)
      try {
        // TODO: Implement actual API call to delete proposal
        await api.delete(`/propostas/${proposalId}`, { headers: { Authorization: `Bearer ${token}` } });
        setPropostas(prev => prev.filter(p => p.id !== proposalId));
      } catch (error) {
        console.error('Erro ao excluir proposta:', error);
      }finally{
        setLoading(false)
      }
    }
  };

  const handleStatusUpdate = async (proposalId: string, status: 'aceite' | 'regeitado', professional_id: string) => {
   
    if (!isAuthenticated){
      navigate('/login');
      return;
    }

    const dados = {
      'status': status,
      'profissional_id': professional_id
    }


    setLoading(true)

    try {
      await api.put(`/propostas/${proposalId}`, { dados }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPropostas(prev => prev.map(p => p.id === proposalId ? { ...p, status } : p));
      console.log(`Proposta ${proposalId} updated to ${status}`);
    } catch (error) {
      console.error(`Erro ao atualizar status da proposta ${proposalId}:`, error);
    }finally{
      setLoading(false)
    }
  };

  // Animação simples sem biblioteca
  const fadeInStyle = {
    animation: 'fadeIn 0.5s ease-in'
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-vinho mb-8">Minhas Propostas Enviadas</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Carregando propostas...</div>
        ) : propostas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Você ainda não enviou nenhuma proposta.</p>
            <Link 
              to="/orders" 
              className="inline-block mt-4 text-vinho hover:underline"
            >
              Ver pedidos disponíveis
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {propostas.map((proposal, index) => (
              <div 
                key={proposal.id}
                style={{ ...fadeInStyle, animationDelay: `${index * 0.1}s` }}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-xl text-vinho">Pedido #{proposal.order_id}</h2>

                  {user?.role === "cliente" && 
                  <span 
                    onClick={() => handleViewClientProfile(proposal.professional_id)}
                    className="text-gray-500 hover:text-vinho transition-colors flex items-center cursor-pointer"
                  >
                    <FaUser className="mr-2" />
                    <span className="font-medium">{proposal.professional_name}</span>
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </span>
}
                </div>

                <p className="text-gray-700 mb-3">{proposal.message}</p>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMoneyBillWave className="mr-2 text-vinho" />
                  <span>Valor: <strong>{proposal.price} MZN</strong></span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaCalendarAlt className="mr-2 text-vinho" />
                  <span>Criado em: {new Date(proposal.created_at).toLocaleDateString()}</span>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-gray-800 mb-2">
                      <FaUser className="mr-2" />
                      <span className="font-medium">Cliente: {proposal.client_name}</span>
                    </div>

                    {
                       userData?.user?.role !== 'cliente' ?
                       <h3 className ="text-green-500 bold text-xl">{proposal.client_phone}</h3> 
                       :
                      <button 
                      onClick={() => handleViewClientProfile(proposal.professional_id)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                      Ver Perfil do Cliente <FaExternalLinkAlt className="ml-2 text-xs" />
                    </button>
                    }
                </div>

                <div className="flex items-center justify-between text-sm font-medium">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${
                    proposal.status === 'aceite' 
                      ? 'bg-green-100 text-green-800' 
                      : proposal.status === 'regeitado' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {proposal.status === 'aceite' && <FaCheck className="mr-1" />}
                    {proposal.status === 'aceite' 
                      ? 'Aceite' 
                      : proposal.status === 'regeitado' 
                        ? 'Rejeitado' 
                        : 'Pendente'}
                    {proposal.status === 'regeitado' && <FaTimes className="ml-1" />}
                  </div>

                  {(proposal.status === 'pendente' && user?.role == 'cliente') && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(proposal.id, 'aceite', proposal.professional_id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                      >
                        <FaCheck className="mr-1" /> Aceitar
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(proposal.id, 'regeitado', proposal.professional_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                      >
                        <FaTimes className="mr-1" /> Rejeitar
                      </button>
                    </div>
                  )}

                  {(proposal.status !== 'pendente' && user?.role !== 'cliente') && (
                    <button 
                      onClick={() => handleDelete(proposal.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <FaTrash /> Excluir
                    </button>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}