import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPhone, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api'
import Spinner from "../components/Spinner";

// Esquema de validação com Zod
const schema = z.object({
  phone: z
    .string()
    .min(9, "Número deve ter 9 dígitos")
    .regex(/^[0-9]+$/, "Apenas números são permitidos"),
  password: z
    .string()
    .min(8, "Senha deve ter 8+ caracteres")
    .regex(/[0-9]/, "Senha precisa de pelo menos 1 número")
    .regex(/[^A-Za-z0-9]/, "Senha precisa de pelo menos 1 símbolo"),
});

export default function Login() {

  const navigate = useNavigate()
  const [Mensagem, setMensagem] = useState('')
  const [mensagemSucess, setMensagemSucess] = useState('');
  const [loading, setLoading] = useState(false);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    // console.log("Dados do login:", data);
    setLoading(true)
    try {

      const enviar = await api.post('/users/login', data)

      // console.log(enviar)
      setMensagemSucess('Login realizado com sucesso')
      setMensagem(''); // limpar mensagem de erro

      // persistir dados do usuario e token

      localStorage.setItem('userData', JSON.stringify(enviar.data))

      setTimeout(() => {
        reset() // limpar os campos do formulario

        if (enviar.data.user.role == 'profissional') {

          navigate('/'); return;     // redirecionar para login
        }

        navigate('/order'); return;

      }, 2000)





    } catch (error) {

      console.error('erro ao cadastra:', error.status)
      if (error.status == 401) {
        setMensagem(' Numero ou palavra-pass incorecta')
      }
      if (error.status == 500) {
        setMensagem('Erro do servido internto, contacte o suporte');
      }

    } finally {
      setLoading(false)
    }
    // Lógica de autenticação aqui
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-vinho mb-8 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Número de Celular */}
          <div>
            <label className="block text-gray-700 mb-2">Número de Celular</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("phone")}
                type="tel"
                placeholder="84 1234567"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Campo: Senha */}
          <div>
            <label className="block text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-vinho"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors flex items-center justify-center"
          >
            {
              loading? <Spinner/> :
           <>Entrar <FaArrowRight className="ml-2" /></>
            }
          </button>

          {Mensagem && (<p className="text-red-500 text-center text-xl mt-1">{Mensagem}</p>)}
          {mensagemSucess && (<p className="text-green-500 text-center text-xl mt-1">{mensagemSucess}</p>)}


          {/* Link para Cadastro */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Ainda não tens conta?{" "}
              <Link
                to="/signup"
                className="text-vinho font-bold hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}