export default function Testimonials() {
  // Array de depoimentos
  const testimonials = [
    {
      name: "Miguel Santos",
      message: "Precisava de um eletricista urgente e resolveram meu problema no mesmo dia.",
      city: "Boane"
    },
    {
      name: "Sofia Costa",
      message: "Profissionais muito bem avaliados e preços justos. Voltarei a usar!",
      city: "Matola"
    },
    {
      name: "Rui Fernandes",
      message: "Montador de móveis extremamente cuidadoso. Meu guarda-roupa ficou perfeito.",
      city: "Katembe"
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Depoimentos de Clientes Satisfeitos
        </h2>

        {/* Grid de depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 italic mb-4">"{testimonial.message}"</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-vinho">{testimonial.name}</span>
                <span className="text-gray-500 text-sm">{testimonial.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}