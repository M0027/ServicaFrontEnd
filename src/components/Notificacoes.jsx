import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotificationBell({ isLogged, isUser, notifications, texto }) {
  // Simula array de notificações (substitua pelo seu estado real)
  const notificationCount = notifications?.length || 0;
  
  // Só mostra se estiver logado e tiver notificações
  if (!isLogged) return null;

  return (
    <div className="relative">
      <Link 
        to={isUser ? "/orders" : "/prof_respostas"} 
        className="text-white hover:text-gray-200 transition-colors"
      >
        {/* <FaBell className="text-2xl" /> */}
        {texto}
        
        {/* Badge com contagem */}
        {notificationCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </Link>
    </div>
  );
}