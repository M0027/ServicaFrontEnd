import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaPhone, FaLock, FaUser, FaMapMarkerAlt, FaArrowRight, FaOptinMonster } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api'
import Spinner from "../components/Spinner"

// Esquema de validação com Zod
const schema = z.object({
  phone: z
    .string()
    .min(9, "Número deve ter 9 dígitos")
    .regex(/^[0-9]+$/, "Apenas números são permitidos"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  password: z
    .string()
    .min(8, "Senha deve ter 8+ caracteres")
    .regex(/[0-9]/, "Senha precisa de pelo menos 1 número")
    .regex(/[^A-Za-z0-9]/, "Senha precisa de pelo menos 1 símbolo"),
  role: z.string().min(1, "Selecione um distrito"),
});

// Array de distritos (exemplo)
const role = [
  "profissional",
  "cliente"
];

export default function Signup() {
  const Navigate = useNavigate()
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
       
    console.log('dados', data)
    setLoading(true)

    try {
      
      const enviar = await api.post('/users/register', data)

      console.log('req', enviar)

      if ( enviar.status == 201) {
        setMensagemSucess('Cadastro realizado com sucesso')
        setMensagem(''); // limpar mensagem de erro

        setTimeout(()=>{
          reset() // limpar os campos do formulario

          // redirecionamento em funcao dos tipo de usuario
          Navigate('/login') ; return;      // redirecionar para login

        }, 3000)

      }
      


    } catch (error) {

      console.error('erro ao cadastra:' ,error)
      if (error.status == 409) {
        setMensagem('O numero ja foi registado, tento outro')
      }
      if (error.status == 500) {
        setMensagem('Erro do servido internto, contacte o suporte');
      }
      if (error.status == 400) {
        setMensagem('Todos os campos são obrigatórios.')
      }
      
    }finally{
      setLoading(false)
    }
      
  

  
    // Lógica de cadastro aqui
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-vinho mb-8 text-center">Cadastro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Nome */}
          <div>
            <label className="block text-gray-700 mb-2">Nome Completo</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("name")}
                type="text"
                placeholder="Seu nome"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Campo: Telefone */}
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

          {/* Campo: Distrito (Dropdown) */}
          <div>
            <label className="block text-gray-700 mb-2">Clinte / Profissional</label>
            <div className="relative">
              <FaOptinMonster className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                {...register("role")}
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none appearance-none bg-white"
              >
                <option value="">Selecione um role</option>
                {role.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            className="w-full bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors align-middle flex items-center justify-center"
          >
            { loading? <Spinner/> :
           <p> Cadastrar <FaArrowRight className="ml-2" /> </p>
           }
          </button>


       
       {Mensagem && (<p className="text-red-500 text-xl text-center mt-1">{Mensagem}</p>)}
       {mensagemSucess && (<p className="text-green-500 text-center text-xl mt-1">{mensagemSucess}</p>)}
       


          {/* Link para Login */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Já tens conta?{" "}
              <Link
                to="/login"
                className="text-vinho font-bold hover:underline"
              >
                 Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}