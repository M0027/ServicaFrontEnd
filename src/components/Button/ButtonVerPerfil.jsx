import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function VerPedidosButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/orders")}
      className="flex items-center gap-2 mt-5 px-5 py-2 bg-[#6B0F1A] text-white font-semibold rounded-lg shadow-md hover:bg-[#8B1E2B] transition-all duration-200 ease-in-out hover:shadow-lg"
    >
      Ver Pedidos
      <FaArrowRight className="w-5 h-5" />
    </button>
  );
}
