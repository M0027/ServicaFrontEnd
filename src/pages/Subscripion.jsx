import React from "react";
// import { CheckCircle, Users } from "aw";
import { FaUser, FaCheckCircle } from "react-icons/fa";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-6">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#6B0F1A]">Junte-se ao ServiçaJá</h1>
        <p className="mt-2 text-lg text-gray-600">
          Descubra como se inscrever na plataforma e escolha o plano que melhor combina com você.
        </p>
      </div>

      {/* Passos para se inscrever */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#6B0F1A] mb-6">Como se inscrever</h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-700">
          <li>
            Clique em <span className="font-medium text-[#6B0F1A]">“Criar Conta”</span> na página inicial.
          </li>
          <li>
            Preencha seus dados pessoais e confirme o e-mail ou número de telefone.
          </li>
          <li>
            Escolha o seu plano de pagamento preferido.
          </li>
          <li>
            Complete o cadastro e comece a usar a plataforma!
          </li>
        </ol>
      </section>

      {/* Planos de pagamento */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#6B0F1A] mb-6 text-center">
          Nossos Planos
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Plano Semanal */}
          <div className="border border-gray-200 rounded-xl shadow hover:shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-[#6B0F1A]">Semanal</h3>
            <p className="mt-2 text-gray-600">Ideal para quem deseja testar a plataforma.</p>
            <p className="mt-4 text-3xl font-bold text-[#6B0F1A]">200 MT</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-green-600" /> Acesso completo
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-green-600" /> Renovação automática
              </li>
            </ul>
          </div>

          {/* Plano Mensal */}
          <div className="border-2 border-[#6B0F1A] rounded-xl shadow-lg p-6 text-center bg-[#6B0F1A] text-white">
            <h3 className="text-xl font-semibold">Mensal</h3>
            <p className="mt-2 text-gray-200">Nosso plano mais popular e flexível.</p>
            <p className="mt-4 text-3xl font-bold">600 MT</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-white" /> Acesso completo
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-white" /> Destaque nos resultados
              </li>
            </ul>
          </div>

          {/* Plano Anual */}
          <div className="border border-gray-200 rounded-xl shadow hover:shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-[#6B0F1A]">Anual</h3>
            <p className="mt-2 text-gray-600">Economize e tenha tranquilidade o ano todo.</p>
            <p className="mt-4 text-3xl font-bold text-[#6B0F1A]">5.500 MT</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-green-600" /> Acesso completo
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-green-600" /> Economia de até 25%
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tornar-se parceiro */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#6B0F1A] mb-6">
          Torne-se um Parceiro
        </h2>
        <p className="text-gray-700 mb-6">
          É profissional de eventos, serviços ou fornecimentos? Cadastre-se como parceiro e receba
          pedidos diretamente na plataforma.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6B0F1A] text-white font-medium hover:bg-[#580c15] transition-colors">
          <FaUser className="w-5 h-5" />
          Criar conta de parceiro
        </button>
      </section>
    </div>
  );
}
