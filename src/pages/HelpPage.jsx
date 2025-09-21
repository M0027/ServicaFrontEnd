import React from "react";
import { FaPhone, FaMailchimp, FaHandsHelping } from "react-icons/fa";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold text-[#6B0F1A] mb-6">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg">Como criar uma conta no ServiçaJá?</h3>
            <p className="mt-1 text-gray-700">
              Clique em “Cadastrar”, preencha seus dados e siga os passos indicados para ativar sua conta.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg">Como faço para solicitar um serviço?</h3>
            <p className="mt-1 text-gray-700">
              Navegue até a seção de busca de profissionais, selecione o serviço desejado e envie seu pedido.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg">Posso cancelar um pedido?</h3>
            <p className="mt-1 text-gray-700">
              Sim, vá até “Meus pedidos” e clique em cancelar no pedido que deseja interromper.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white text-gray py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Entre em Contato</h2>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-around gap-6">
          <div className="flex items-center gap-4">
            <FaPhone className="w-6 h-6" />
            <a href="https://wa.me/258833072296" className="hover:underline">
              WhatsApp: +258 833072296
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaMailchimp className="w-6 h-6" />
            <a href="mailto:suporte@servicaja.com" className="hover:underline">
              suporte@servicaja.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="text-center py-6 text-gray-500 text-sm">
        &copy; 2025 ServiçaJá. Todos os direitos reservados.
      </footer> */}
    </div>
  );
}
