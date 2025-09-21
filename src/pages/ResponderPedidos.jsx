import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from 'react';
import { FaCommentDollar, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from '../services/api';
import Spinner from"../components/Spinner"
import AuthContext from "../context/AuthContext";

export default function ProfessionalResponse() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {token}= useContext(AuthContext)
  const [user, setUser]= useState({})
  const [errorMessage, setErrorMessage]= useState('')
  const [message, setMessage]= useState('')
  const [loading, setLoading]= useState(false)

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, user_id } = state || {}; // Get professional ID from location state

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');
    setUser(userData)
  },[]);


  const onSubmit = async (data) => {

    setLoading(true)


    const Dados = {...data, "order_id": id, "user_id": user_id}
    console.log(Dados)

    try {
      const response = await api.post(`/propostas`, Dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      
      setErrorMessage('')
      reset()
      
      
      console.log('aqui:', response.data.message)
      setMessage(response?.data?.message)
      
    } catch (error) {
      if (error.status !== 400) {
          setErrorMessage(error?.response?.data.error)
      }
      if (error.status !== 400) {
          setErrorMessage(error?.response?.data.error)
      }
      if (error.status == 403) {
          setErrorMessage(error?.response?.data.errors)
          navigate('/subiscription')
      }
      console.error('erro ao responde pedido:', error)
    }finally{
      setLoading(false)
    }

    // console.log("Resposta do profissional:", Dados);



    
    // Lógica de envio aqui
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-vinho mb-8 text-center">Responder ao Pedido</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Mensagem/Detalhes */}
          <div>
            <label className="block text-gray-700 mb-2">Detalhes da Proposta</label>
            <div className="relative">
              <FaCommentDollar className="absolute left-3 top-4 text-gray-400" />
              <textarea
                {...register("message", { required: "Descreva sua proposta" })}
                placeholder="Ex: Faremos o reparo com materiais premium. Tempo estimado: 2 dias."
                rows="4"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none resize-none"
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Campo: Preço (MZN) */}
          <div>
            <label className="block text-gray-700 mb-2">Preço (MZN)</label>
            <div className="relative">
              <FaMoneyBillWave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("price", { 
                  required: "Insira o valor", 
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Apenas números (ex: 2500)"
                  }
                })}
                type="number"
                placeholder="Ex: 2500"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Campo: Data de Término */}
          {/* <div>
            <label className="block text-gray-700 mb-2">Data de Conclusão</label>
            <div className="relative">
              <FaCalendarCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("event_date", { required: "Defina a data" })}
                type="date"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
            </div>
            {errors.event_date && (
              <p className="text-red-500 text-sm mt-1">{errors.event_date.message}</p>
            )}
          </div> */}

          {/* Botões */}
          <div className="flex gap-4">
            <Link
              to="/orders" // Altere para a rota desejada (ex: pedidos pendentes)
              className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors text-center"
            > 
              Cancelar
            </Link>
            <button
              type="submit"
              className="flex-1 bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors"
            > 
            {
              loading? <Spinner/> : 
              <span>Enviar Resposta</span> 
              }
              

            </button>

          </div>
        </form>
            {!loading?<p className="text-red-500 text-center mt-5">{errorMessage}</p> : ""}
            {!loading?<p className="text-green-500 text-center mt-5 text-2xl">{message}</p> : ""}
      </div>
    </div>
  );
}