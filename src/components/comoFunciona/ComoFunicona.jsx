export default function HowItWorks() {
  // Passos da plataforma
  const steps = [
    {
      title: "1. Pesquise",
      description: "Digite o serviço que precisa e encontre profissionais próximos a você.",
      image: "https://placehold.co/200x200/800020/FFFFFF/png?text=Pesquisar", // Substitua por imagem real
    },
    {
      title: "2. Compare",
      description: "Veja perfis, avaliações e preços. Escolha o melhor profissional para você.",
      image: "https://placehold.co/200x200/800020/FFFFFF/png?text=Comparar",
    },
    {
      title: "3. Contrate",
      description: "Agende o serviço diretamente pela plataforma. Simples e seguro!",
      image: "https://placehold.co/200x200/800020/FFFFFF/png?text=Contratar",
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
          Como funciona a plataforma
        </h2>

        {/* Grid de passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-40 h-40 mb-4 object-contain"
              />
              <h3 className="text-xl font-bold text-vinho mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}