// import { motion } from "framer-motion/client";
import { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { FaTools, FaHeading, FaAlignLeft, FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import Spinner from '../components/Spinner';

// Arrays fictícios

export default function BudgetRequest() {

    const locations = ["Maputo", "Matola", "Beira", "Nampula", "Inhambane"];

    const [serviceTypes_default, setServiceTypes_default] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate()

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({});



    const location = useLocation()
    const { termos_De_pesquisa } = location.state || {};
    const dados = JSON.parse(localStorage.getItem('userData')) || {};
    const token = dados?.token || null;
    const { register, handleSubmit, reset, formState: { errors }, trigger } = useForm();

    // const MotionP = motion.p;
    // enviar o pedido caso o pedidos existam do localstorage;

    useEffect(() => {

        const pedido = JSON.parse(localStorage.getItem('pedido')) || '';
        const dados = JSON.parse(localStorage.getItem('userData')) || {};
        const usuario = dados.user;


        if (pedido && token) {

            const client_id = usuario?.id;

            const pedidoCompleto = { ...pedido, client_id };
            onSubmitAbnormal(pedidoCompleto);


            return;
        }


        // buscar dados do backend
        const buscarServicos = async () => {


            try {

                const busca = await api.get('/services')
                const servicos = busca.data;

               // console.log(servicos)
                setServiceTypes_default(servicos);

            } catch (error) {
                console.error('erro ao carregar servicos:', error)

            } 




        }

        buscarServicos()

    }, [])


    const getSelectedServiceType = () => {



        if (termos_De_pesquisa && serviceTypes_default.length > 0) {

            const service = serviceTypes_default.find(item => item.name.toLowerCase() === termos_De_pesquisa.toLowerCase());
            setSelectedService(service);
            return;
        }


        // console.log('achado', servicoAchado)
    }

    useEffect(() => {
        getSelectedServiceType();
    }, [termos_De_pesquisa, serviceTypes_default]);




    const nextStep = async () => {
        let isValid = false;

        // Validação condicional por passo
        if (step === 1) isValid = await trigger("service_id");
        if (step === 2) isValid = await trigger("title");
        if (step === 3) isValid = await trigger("description");
        if (step === 4) isValid = await trigger("event_date");

        if (isValid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const onSubmit = async (formaData) => {


        setLoading(true)
        //  se nao estiver logado ele é direcionadao ao login
        // os dados prenchidos sao colocados no local storage
        // depois que forem ou nao usados sao deletados do localstorage

        if (!token) {

            localStorage.setItem('pedido', JSON.stringify(formaData))

            setErrorMessage('Faca o Login Primeiro para enviar o seu pedido')

            setTimeout(() => {
                setErrorMessage('')
                navigate('/login'); return;

            }, 1800);


        }



        const dados = JSON.parse(localStorage.getItem('userData')) || {};
        const usuario = dados.user;
        const client_id = usuario?.id || null;
        setData({ ...formaData, client_id });




        try {

            const enviar = await api.post('/pedidos/criar', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });


            if (enviar.status == 201) {

                setSuccessMessage('Feito com sucesso')
                setErrorMessage(''); // limpar mensagem de erro

                setTimeout(() => {
                    reset() // limpar os campos do formulario
                    setSuccessMessage('')
                    //Navigate('/login')      // redirecionar para login
                }, 2000)
            }


            // console.log('aqui', enviar)


        } catch (error) {

            console.error('erro ao cadastra:', error)
            if (error.status == 500) {

                setTimeout(() => {

                    setErrorMessage('Erro do servido internto, contacte o suporte');
                }, 1800);
            }


        }finally{
            setLoading(false)
        }
    }


    const onSubmitAbnormal = async (Data) => {
        // os dados prenchidos sao colocados no local storage
        // depois que forem ou nao usados sao deletados do localstorage

        // console.log('formadata', Data)

        try {

            const enviar = await api.post('/pedidos/criar', Data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });


            if (enviar.status === 201) {

                // console.log(enviar);
                setSuccessMessage('Feito com sucesso')
                setErrorMessage(''); // limpar mensagem de erro

                setTimeout(() => {

                    localStorage.removeItem('pedido')
                    setSuccessMessage('')
                    //Navigate('/login')      // redirecionar para login
                }, 3000)
            }


        } catch (error) {

            console.error('erro ao cadastra:', error)
            if (error.status == 500) {

                setTimeout(() => {

                    setErrorMessage('Erro do servido internto, contacte o suporte');
                }, 1800);
            }


        }

    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-vinho mb-8 text-center">Solicitar Orçamento</h1>

                {
                    termos_De_pesquisa ?
                        <h2 className="text-2xl font-bold text-gold mb-8 text-center">{termos_De_pesquisa}</h2>
                        : ""
                }

                {/* Barra de progresso */}
                <div className="flex mb-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 mx-1 rounded-full ${i <= step ? "bg-vinho" : "bg-gray-300"}`}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Passo 1: Tipo de Serviço */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <FaTools className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    {...register("service_id", { required: "Selecione um serviço" })}
                                    className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none appearance-none bg-white"
                                >

                                    {
                                        selectedService
                                            ? <option value={selectedService.id}>{selectedService.name}</option>
                                            : serviceTypes_default.map((service, i) => (
                                                <option key={i} value={service.id}>{service.name}</option>
                                            ))
                                    }
                                </select>
                                {errors.service_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.service_id.message}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="w-full bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors flex items-center justify-center"
                            >
                                Próximo <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    )}

                    {/* Passo 2: Título */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <FaHeading className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    {...register("title", { required: "Título obrigatório" })}
                                    type="text"
                                    placeholder="Ex: Reparo de vazamento"
                                    className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                                >
                                    <FaArrowLeft className="mr-2" /> Voltar
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors flex items-center justify-center"
                                >
                                    Próximo <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Passo 3: Descrição */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <FaAlignLeft className="absolute left-3 top-4 text-gray-400" />
                                <textarea
                                    {...register("description", {
                                        required: "Descreva o serviço",
                                        minLength: {
                                            value: 100,
                                            message: "A descrição nao deve ser muito curta. Detalhe bem o serviço, como voce quer que fique ou aconteca."
                                        }
                                    })}
                                    placeholder="Detalhe o que precisa..."
                                    rows="4"
                                    className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none resize-none"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                                >
                                    <FaArrowLeft className="mr-2" /> Voltar
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors flex items-center justify-center"
                                >
                                    Próximo <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Passo 4: Data */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    {...register("event_date", { required: "Defina uma data" })}
                                    type="date"
                                    className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none"
                                />
                                {errors.event_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.event_date.message}</p>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                                >
                                    <FaArrowLeft className="mr-2" /> Voltar
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-vinho text-white py-3 px-4 rounded-lg hover:bg-[#6a001a] transition-colors flex items-center justify-center"
                                >
                                    Próximo <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Passo 5: Local */}
                    {step === 5 && (
                        <div className="space-y-6">
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    {...register("location", { required: "Selecione um local" })}
                                    className="w-full pl-10 p-3 border-b-2 border-gray-300 focus:border-vinho focus:outline-none appearance-none bg-white"
                                >
                                    <option value="">Local do Serviço</option>
                                    {locations.map((loc, i) => (
                                        <option key={i} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                                >
                                    <FaArrowLeft className="mr-2" /> Voltar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gold text-vinho font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner /> : "Enviar Pedido"}
                                </button>
                            </div>

                            {errorMessage && <p initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }} className="font-bold text-xl text-red-600 text-center transition ease-out">{errorMessage}</p>}
                            {successMessage && <p initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }} className="font-bold text-xl text-green-600 text-center transition ease-out">{successMessage}</p>}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}