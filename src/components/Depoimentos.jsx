import react, {useState, useEffect} from 'react'
import api from '../services/api'
import Loading from './Loading'



export default function Testimonials() {

  const [testimonials, setTestemones] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    setLoading(true)
    const userData= JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    try {
      const response = await api.get(`/allcommets`);

      setTestemones(response.data);
      console.log("Comments allll:", response.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchComments()
  },[])

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Depoimentos de Clientes Satisfeitos
        </h2>

        {/* Grid de depoimentos */}
        {
          loading? <Loading text='Depoimentos' height='w-40'/>:""
        }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-vinho">{testimonial.name}</span>
                <span className="text-gray-500 text-sm"> {new Date(testimonial.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}