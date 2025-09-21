import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaTools,
  FaStar,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ProfessionalProfile, UserData, Comment } from "../types/interfaces";
import AuthContext from "../context/AuthContext";
import VerPedidosButton from "../components/Button/ButtonVerPerfil";

/**
 * Página de Perfil do Profissional
 * - Busca dados do profissional e comentários
 * - Permite adicionar avaliação (se não for o dono)
 */
export default function ProfessionalProfiles() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {}; // ID do profissional

  // Usuário logado
  const userData: UserData | null = JSON.parse(localStorage.getItem("userData") || "null");

  // Estados principais
  const [professional, setProfessional] = useState<ProfessionalProfile | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  /**
   * Busca os comentários do profissional
   */
  const fetchComments = useCallback(async () => {
    try {
      const response = await api.get<Comment[]>(`/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoadingComments(false);
    }
  }, [id, token]);

  /**
   * Busca o perfil profissional
   */
  const fetchProfessionalProfile = useCallback(async () => {
    try {
      if (!id) {
        console.error("ID do profissional não encontrado.");
        return;
      }
      const response = await api.get<ProfessionalProfile>(`/professional/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profile = response.data;
      setProfessional(profile);

      // Verifica se o usuário logado é dono do perfil
      setIsOwner(userData?.id === profile.user_id);
    } catch (error) {
      console.error("Erro ao buscar perfil profissional:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, [id, token, userData]);

  /**
   * Envia novo comentário
   */
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      await api.post(
        `/comments/${id}`,
        { comment: commentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCommentInput("");
      fetchComments(); // atualiza comentários
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  /**
   * Efeito inicial
   */
  useEffect(() => {
    if (id) {
      fetchProfessionalProfile();
      fetchComments();
      //fetchProfessionalProfile
    }
  }, [id, fetchComments]);

  /**
   * Carregando dados
   */
  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
        Carregando perfil...
      </div>
    );
  }

  /**
   * Profissional não encontrado
   */
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
      {/* Banner com foto */}
      <div className="relative h-48 bg-vinho-light">
        <div className="absolute -bottom-16 left-1/2 transform justify-center items-center flex -translate-x-1/2 w-40 h-40 rounded-full bg-white border-4 border-white shadow-lg">
          <img
            src={professional.image_url}
            alt="Foto de perfil"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 px-4 pb-8">
        {/* Cabeçalho */}
        <ProfileHeader professional={professional} />

        {/* Sobre */}
        <Section title="Sobre">
          <p className="text-gray-700 leading-relaxed">{professional.description}</p>
        </Section>

        {/* Informações adicionais */}
        <Section title="Informações Adicionais">
          <InfoRow label="Formado na área" value={professional.certificacoes} />
          <InfoRow label="Clientes Atendidos" value={professional.clientes_atendidos} />
          <InfoRow label="Cobra deslocamento" value={professional.deslocamento} />
          <InfoRow label=" Anos de experiência" value={professional.experiencia} />
          <InfoRow label="Formas de Pagamento" value={professional.formas_pagamento} />
        </Section>

        {/* Avaliações */}
        <Section title="Avaliações">
          {!isOwner && (
            <form
              onSubmit={handleSubmitComment}
              className="flex flex-col md:flex-row items-start md:items-end gap-2 mb-6"
            >
              <input
                type="text"
                placeholder="Deixe um comentário..."
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:border-vinho focus:ring-1 focus:ring-vinho-light"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-vinho text-white px-4 py-2 rounded-lg hover:bg-[#6a001a] transition-colors font-medium flex items-center gap-2"
              >
                <FaCheckCircle /> Enviar
              </button>
            </form>
          )}

          {loadingComments ? (
            <p className="text-gray-500">Carregando comentários...</p>
          ) : comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <p className="font-semibold text-gray-800">{c.name}</p>
                </div>
                <p className="text-gray-700 mb-2">{c.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma avaliação disponível ainda.</p>
          )}
        </Section>
      </div>
    </div>
  );
}

/* ------------------- COMPONENTES REUTILIZÁVEIS ------------------- */

/**
 * Cabeçalho do Perfil
 */
function ProfileHeader({ professional }: { professional: ProfessionalProfile }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{professional.name || "N/A"}</h1>

      <div className="flex items-center justify-center text-gray-600 mb-2">
        <FaTools className="mr-2 text-vinho" />
        <span>{professional.service_name || "N/A"}</span>
      </div>

      <div className="flex items-center justify-center text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-2 text-vinho" />
        <span>{professional.address || "N/A"}</span>
      </div>

      <div className="flex items-center justify-center text-gray-600 mb-2">
        <FaPhone className="mr-2 text-vinho" />
        <span>{professional.phone || "N/A"}</span>
      </div>

      <div className="flex items-center justify-center text-gray-600 mb-4">
        <FaWhatsapp className="mr-2 text-green-500" />
        <span>{professional.whatsapp || "N/A"}</span>
      </div>

      {/* Avaliação fixa mockada (pode vir da API) */}
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${i < Math.floor(4) ? "text-yellow-400" : "text-gray-300"} mr-1 text-lg`}
          />
        ))}
        <span className="ml-2 text-gray-600">({professional.status})</span>
      </div>

      <VerPedidosButton/>
    </div>
  );
}

/**
 * Bloco genérico de seção
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

/**
 * Linha de informação chave/valor
 */
function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex md:flex-row flex-col md:justify-between py-1">
      
      <p className="text-gray-900 font-semibold text-lg">{label}</p>
      <p className="text-gray-600 font-medium ">{value || "N/A"}</p>
    </div>
  );
}
