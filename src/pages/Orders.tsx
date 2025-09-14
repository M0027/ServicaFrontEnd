import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { Order, UserData, ProfessionalProfile } from '../types/interfaces';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaInfoCircle, FaClock, FaArrowRight } from 'react-icons/fa';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {}; // Assuming service_id is passed via state

  useEffect(() => {
    const userData: UserData | null = JSON.parse(localStorage.getItem('userData') || 'null');

    if (!userData || !userData.token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        // You might need to get the service_id from userData.user or other means if not passed via state
        const requestBody = serviceId ? { service_id: serviceId } : {};

        const response = await api.get<Order[]>(`/pedidos/${1}`,{
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        setOrders(response.data);
        console.log('Orders fetched:', response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        setErrorMessage('Erro ao carregar pedidos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, serviceId]);

  const handleRespondToOrder = (orderId: string) => {
    navigate('/orderResponse', { state: { id: orderId } });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-vinho mb-8 text-center">Pedidos Disponíveis</h1>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Carregando pedidos...</div>
        ) : errorMessage ? (
          <div className="text-center py-12 text-red-500">{errorMessage}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">Nenhum pedido disponível para o seu serviço no momento.</p>
            {/* Optional: Add a link to browse other services or go back */}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <FaInfoCircle className="mr-2 text-vinho" />{order.title}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{order.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 text-sm mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-vinho" />
                    <span>Data do Evento: {new Date(order.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-vinho" />
                    <span>Local: {order.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaTag className="mr-2 text-vinho" />
                    <span>Service ID: {order.service_id}</span>{/* This might be service name in actual implementation */}
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-vinho" />
                    <span>Criado em: {new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => handleRespondToOrder(order.id)}
                    className="bg-vinho text-white py-2 px-6 rounded-lg hover:bg-[#6a001a] transition-colors font-medium flex items-center justify-center ml-auto"
                  >
                    Responder ao Pedido <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
