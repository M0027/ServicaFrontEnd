import React, { useState, useEffect, useCallback } from "react";
import {
  FaUser,
  FaEdit,
  FaMapMarkerAlt,
  FaTools,
  FaStar,
  FaArrowRight,
  FaPhone,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ProfessionalProfile, UserData, Comment } from "../types/interfaces";

// Array fictício de avaliações
// const mockReviews = [
// ... existing code ...
// ];

export default function ProfessionalProfiles() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {}; // Get professional ID from location state

  const [professional, setProfessional] = useState<ProfessionalProfile | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfessionalProfile>>({});
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');

  const fetchComments = useCallback(async () => {
    const userData: UserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (!userData || !userData.token) {
      navigate("/login");
      return;
    }
    try {
      const response = await api.get<Comment[]>(`/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setComments(response.data);
      console.log("Comments fetched:", response.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  }, [id, navigate]);

  const handleComment = useCallback(async () => {
    const userData: UserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (!userData || !userData.token || !userData.user.id) {
      navigate("/login");
      return;
    }
    if (!commentInput.trim()) return;

    try {
      await api.post(
        `/comments`,
        {
          professional_id: id,
          user_id: userData.user.id,
          comment: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setCommentInput('');
      // Refetch comments to show the new one
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }, [commentInput, id, navigate, fetchComments]);

  useEffect(() => {
    const userData: UserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    if (!userData || !userData.token) {
      navigate("/login");
      return;
    }

    const fetchProfessionalProfile = async () => {
      try {
        console.log(id);
        setLoading(true);
        if (!id) {
          console.error("ID do profissional não encontrado no estado.");
          setLoading(false);
          // Optionally navigate away or show an error
          return;
        }
        const response = await api.get<ProfessionalProfile>(
          `/professional/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        const fetchedProfile = response.data;
        console.log(response.data);
        setProfessional(fetchedProfile);
        setFormData(fetchedProfile);

        if (userData.user.id === fetchedProfile.user_id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil profissional:", error);
        // Handle error (e.g., display error message, redirect if profile not found)
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfessionalProfile();
      fetchComments();
    }
  }, [id, navigate, fetchComments]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "service_id" || name === "phone" ? Number(value) : value, // Convert service_id and phone to number
    }));
  };

  const handleSave = async () => {
    const userData: UserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );
    if (!userData || !userData.token) {
      navigate("/login");
      return;
    }

    try {
      // Assuming the API expects specific fields for update
      await api.put(`/professional/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setProfessional(formData as ProfessionalProfile); // Update local state with saved data
      setIsEditing(false);
      // Optionally show a success message
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      // Optionally show an error message
    }
  };

  // Remove mockReviews and handleAddReview as per the plan

  if (loading) {
    return (
      <p className="text-xl text-center flex justify-center items-center min-h-dvh min-w-full bg-transparent z-10 text-black">
        A carregar perfil...
      </p>
    );
  }

  if (!professional) {
    navigate("/profile");
    return (
      <div className="p-6 text-center min-h-screen">
        Profissional não encontrado
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative h-48 bg-vinho-light">{/* Banner Section */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
          {isEditing ? (
            <input
              type="file"
              placeholder="Selecione uma foto .."
              name="image_url"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          ) : (
            <FaUser className="text-6xl text-gray-400" />
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Header with Name, Profession, Location, and Edit Button */}
          <div className="text-center mb-6">
            {isEditing ? (
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="text-3xl font-bold mb-2 border-b-2 border-vinho w-full text-center"
              />
            ) : (
              <div className="flex justify-center items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {professional.name || "N/A"}
                </h1>
                {isOwner && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-vinho hover:text-[#6a001a] text-sm flex items-center"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </button>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <FaTools className="mr-2 text-vinho" />
              {isEditing ? (
                <input
                  name="service_id"
                  value={formData.service_id || ""}
                  onChange={handleInputChange}
                  className="border-b-2 border-vinho w-auto text-center"
                />
              ) : (
                <span className="text-lg">
                  {professional.service_name || "N/A"}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-vinho" />
              {isEditing ? (
                <input
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="border-b-2 border-vinho w-auto text-center"
                />
              ) : (
                <span className="text-md">{professional.address}</span>
              )}
            </div>
            <div className="flex items-center justify-center text-gray-600 mb-4">
              <FaPhone className="mr-2 text-vinho" />
              {isEditing ? (
                <input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className="border-b-2 border-vinho w-auto text-center"
                />
              ) : (
                <span className="text-md">{professional.phone}</span>
              )}
            </div>

            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(4) ? "text-yellow-400" : "text-gray-300"
                  } mr-1 text-lg`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                ({professional.status})
              </span>
            </div>
          </div>

          {/* Buttons for owner (Save/Cancel or View Responses) */}
          {isOwner && (
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-vinho text-white py-2 px-6 rounded-lg hover:bg-[#6a001a] transition-colors font-medium"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    navigate("/prof_respostas", {
                      state: { serviceId: professional.service_id },
                    })
                  }
                  className="flex items-center bg-vinho text-white py-2 px-6 rounded-lg hover:bg-[#6a001a] transition-colors font-medium"
                >
                  Ver minhas respostas <FaArrowRight className="ml-2" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre</h2>
          {isEditing ? (
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-vinho focus:ring-1 focus:ring-vinho-light"
              rows={6}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {professional.description}
            </p>
          )}
        </div>

        {/* Avaliações (Reviews) Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Avaliações</h2>
          <>
            {!isOwner && (
              <div className="mb-6">
                <form
                  className="flex flex-col md:flex-row items-start md:items-end gap-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await handleComment();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Deixe um comentário..."
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-vinho focus:ring-1 focus:ring-vinho-light"
                    value={commentInput || ""}
                    onChange={(e) => setCommentInput(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-vinho text-white px-4 py-2 rounded-lg hover:bg-[#6a001a] transition-colors font-medium"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )}
          </>
          <div className="space-y-4 text-gray-700">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-gray-400 mr-2" />
                    <p className="font-semibold text-gray-800">{comment.name}</p>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.comment}</p>
                  <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma avaliação disponível ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
