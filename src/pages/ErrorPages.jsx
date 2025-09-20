import React, { useState } from 'react';

/*
  Error pages collection (JSX + Tailwind)
  - Cores principais: vinho (#6B0F1A) e branco
  - Contém 4 componentes: NotFound404, Unauthorized401, Forbidden403, NetworkError500
  - Export default: DemoPages (para pré-visualizar separadamente)

  Uso: copie o componente desejado para sua rota (React Router, Next.js, etc.)
*/

// ---------- Shared small components ----------
const Icon = ({ children }) => (
  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl">
    {children}
  </div>
);

const ActionButton = ({ children, onClick, outline }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-md font-semibold shadow-sm transition-shadow focus:outline-none ${outline ? 'border border-white/30 bg-transparent text-white' : 'bg-white text-[#6B0F1A]'} hover:shadow-lg`}
  >
    {children}
  </button>
);

// ---------- 404 Not Found ----------
export const NotFound404 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#6B0F1A] text-white px-6">
      <section className="max-w-3xl w-full bg-white/5 backdrop-blur-sm rounded-2xl p-10 md:p-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M11.25 2.5a.75.75 0 011.5 0V13a.75.75 0 01-1.5 0V2.5z" />
              <path d="M12 18.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
          </Icon>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold">Página não encontrada</h2>
          <p className="text-white/80 max-w-xl">
            A página que você tentou acessar não existe ou foi movida. Verifique o endereço ou volte para a página inicial.
          </p>

          <div className="flex gap-3 mt-4">
            <ActionButton onClick={() => window.history.back()}>Voltar</ActionButton>
            <ActionButton outline onClick={() => (window.location.href = '/')}>Ir para Início</ActionButton>
          </div>
        </div>
      </section>
    </main>
  );
};

// ---------- 401 Unauthorized ----------
export const Unauthorized401 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#6B0F1A] via-[#4C0A13] to-black text-white px-6">
      <section className="max-w-2xl w-full bg-white/6 rounded-xl p-10 md:p-14 text-center">
        <div className="flex flex-col items-center gap-5">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zM9 7a3 3 0 116 0v3H9V7z" clipRule="evenodd" />
            </svg>
          </Icon>

          <h1 className="text-5xl font-bold">401</h1>
          <h2 className="text-xl font-medium">Não autorizado</h2>
          <p className="text-white/80 max-w-lg">
            Você precisa entrar na sua conta para acessar este conteúdo. Faça login e tente novamente.
          </p>

          <div className="flex gap-3 mt-4">
            <ActionButton onClick={() => (window.location.href = '/login')}>Entrar</ActionButton>
            <ActionButton outline onClick={() => (window.location.href = '/signup')}>Criar conta</ActionButton>
          </div>
        </div>
      </section>
    </main>
  );
};

// ---------- 403 Forbidden ----------
export const Forbidden403 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#6B0F1A] text-white px-6">
      <section className="max-w-3xl w-full bg-white/4 rounded-2xl p-10 md:p-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-full bg-white/8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-white">
                <path d="M12 2a7 7 0 00-7 7v3H4a1 1 0 00-1 1v6a1 1 0 001 1h16a1 1 0 001-1v-6a1 1 0 00-1-1h-1V9a7 7 0 00-7-7zm-3 9V9a3 3 0 116 0v2H9z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold">403</h1>
            <h2 className="text-2xl font-semibold mt-2">Acesso negado</h2>
            <p className="text-white/80 mt-3">
              Você não tem permissão para acessar este recurso. Se acha que isso é um erro, entre em contato com o administrador.
            </p>

            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              <ActionButton onClick={() => (window.location.href = '/')}>Voltar ao site</ActionButton>
              <ActionButton outline onClick={() => (window.location.href = '/contact')}>Contato</ActionButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ---------- 500 Network Error ----------
export const NetworkError500 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#6B0F1A] to-[#3a0b10] text-white px-6">
      <section className="max-w-3xl w-full bg-white/5 rounded-2xl p-10 md:p-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M11.47 2.43a1.5 1.5 0 012.06 0l7.07 7.07a1.5 1.5 0 010 2.12l-7.07 7.07a1.5 1.5 0 01-2.12 0L4.4 11.62a1.5 1.5 0 010-2.12l7.07-7.07z" />
            </svg>
          </Icon>

          <h1 className="text-5xl md:text-6xl font-bold">500</h1>
          <h2 className="text-2xl font-semibold">Erro de rede</h2>
          <p className="text-white/80 max-w-lg">
            Ocorreu um erro no servidor ou na comunicação. Tente recarregar a página. Se o problema persistir, fale com suporte.
          </p>

          <div className="flex gap-3 mt-4">
            <ActionButton onClick={() => window.location.reload()}>Recarregar</ActionButton>
            <ActionButton outline onClick={() => (window.location.href = '/status')}>Ver status</ActionButton>
          </div>
        </div>
      </section>
    </main>
  );
};

// ---------- DemoPages (default export) ----------
export default function DemoPages() {
  const [page, setPage] = useState('404');

  const pages = {
    '404': <NotFound404 />,
    '401': <Unauthorized401 />,
    '403': <Forbidden403 />,
    '500': <NetworkError500 />,
  };

  return (
    <div className="min-h-screen bg-[#6B0F1A] text-white">
      <header className="p-4 flex items-center justify-between max-w-6xl mx-auto">
        <h3 className="font-bold text-lg">Erros — Pré‑visualização</h3>
        <nav className="flex gap-2">
          {Object.keys(pages).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-md ${page === p ? 'bg-white text-[#6B0F1A]' : 'bg-white/10 text-white/90'}`}
            >
              {p}
            </button>
          ))}
        </nav>
      </header>

      <main className="mt-6">{pages[page]}</main>
    </div>
  );
}
