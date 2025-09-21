import React from "react";

// Reutilizável em qualquer página
export default function Loading({
  text = "Carregando",
  width = "w-full",
  height = "h-full",
}) {
  return (
    <div
      className={`${width} ${height} flex flex-col items-center justify-center bg-gray-200`}
    >
      {/* Texto dinâmico */}
      <p className="text-lg font-semibold text-black flex items-center">
        {text}
        <span className="ml-1 flex space-x-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </span>
      </p>
    </div>
  );
}
