import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTools, FaUserEdit, FaMapMarkedAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import Spinner from '../components/Spinner'

// Array de tipos de serviço (exemplo)
const serviceTypes = [
  "Encanador",
  "Eletricista",
  "Pedreiro",
  "Pintor",
  "Jardineiro",
  "Técnico de Informática",
];

export default function ProfessionalProfile() {

  // const location = useLocation()
  const navigate = useNavigate()

   const {  nome } = location.state || "";

  // useEffect(() => {
  //   const userData = JSON.parse(
  //     localStorage.getItem("userData") || "null"
  //   );

  //   if (!userData || !userData.token) {
  //     navigate("/login");
  //     return;
  //   }
  // },[])
  // const userData = JSON.parse(localStorage.getItem('userData')) || null;
  // const token = userData?.token;


  const [messageSucess, setMensagemSucess] = useState('');
  const [messageError, setMensagemError] = useState('');
  const [loading, setLoading] = useState(false);

  // protecao da tela

  // if (!token) {

  //   navigate('/login'); return;
  // }


  const {
    register, reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {


    const userData = JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    const user_id = userData?.user?.id;
    const image_url = 'img.jpg'
    const Dados = { ...data, image_url, user_id }
    setLoading(true)
    try {

      const enviar = await api.post('/professional/profile', Dados);

      if (enviar.status == 200) {
        setMensagemSucess(`${userData?.user?.name}, ${enviar?.data?.message}`)
        setMensagemError(''); // limpar mensagem de erro

        console.log("Perfil profissional:", enviar);
        setTimeout(() => {
          reset() // limpar os campos do formulario
          setMensagemSucess('');
          setMensagemError(''); // limpar mensagem de erro

          // redirecionamento em funcao dos tipo de usuario
          //navigate('/prof_perfil', { state: { user_id: id } }); return;      // redirecionar para login
          navigate('/')
        }, 3000)

      }



    } catch (error) {

      console.error('erro ao cadastra:', error)
      if (error.status == 500) {
        setMensagemError('Erro do servido internto, contacte o suporte');
      }
      if (error.status == 400) {
        setMensagemError('Todos os campos são obrigatórios.');
      }

    } finally {
      setLoading(false)
    }



    // Lógica de cadastro aqui
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-vinho mb-8 text-center">
          Perfil Profissional
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo: Tipo de Serviço */}
          <div>
            <label className="block text-gray-700 mb-2">Tipo de Serviço</label>
            <div className="relative">
              <FaTools className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                {...register("service_id", { required: "Selecione um serviço" })}
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none appearance-none bg-white"
              >
                <option value="">Selecione seu serviço</option>
                {serviceTypes.map((service, index) => (
                  <option key={index} value={index}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            {errors.service_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.serviceType.message}
              </p>
            )}
          </div>

          {/* Campo: Sobre Mim */}
          <div>
            <label className="block text-gray-700 mb-2">Sobre Mim</label>
            <div className="relative">
              <FaUserEdit className="absolute left-3 top-4 text-gray-400" />
              <textarea
                {...register("description", { required: "Campo obrigatório" })}
                placeholder="Descreva suas habilidades e experiência"
                rows="4"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none resize-none"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Campo: Endereço (Província/Bairro) */}
          <div>
            <label className="block text-gray-700 mb-2">Endereço</label>
            <div className="relative">
              <FaMapMarkedAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...register("address", { required: "Campo obrigatório" })}
                type="text"
                placeholder="Ex: Maputo, Bairro Central"
                className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Botão de Submissão */}
          <button
            type="submit"
            className="w-full bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors"
          >
            {loading ? <Spinner /> :
              <p>Salvar Perfil</p>
            }
          </button>


          {messageSucess && <p className="text-xl text-green-600 text-center transition-all ease-out duration-75">{messageSucess}</p>}
          {messageError && <p className="text-xl text-red-600 text-center transition-all ease-out duration-75">{messageSucess}</p>}

          {/* Link para voltar */}
          <div className="text-center mt-4">
            <Link
              to="/login" // Altere para a rota desejada
              className="text-vinho font-bold hover:underline"
            >
              ← Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}