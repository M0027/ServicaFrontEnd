import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [NOTIFICATIONS, setNOTIFICATION] = useState([]);

    useEffect(() => {
        // Check for token in local storage on initial load
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
            Notificacoes()
        }
    }, [navigate]);


    const Notificacoes = async () => {

        if (!isAuthenticated) return;

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('userData') || 'null');
        try {
            // setLoading(true);

            if (user?.role !== 'profissional') {
                const response = await api.get(`/propostas/${user?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Propostas fetched bo context: ', response.data);
                setNOTIFICATION(response.data);
            } else {

                const response = await api.get(`/propostas/byProf/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Propostas fetched no conrexte:', response.data);
                setNOTIFICATION(response.data);
            }




        } catch (error) {
            console.error('Erro ao buscar propostas:', error);
            // Optionally handle specific error messages or redirects
        } finally {
            // setLoading(false);
        }
    };

    useEffect(()=>{

        Notificacoes()
    }, [])


    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setIsAuthenticated(true);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, NOTIFICATIONS }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
