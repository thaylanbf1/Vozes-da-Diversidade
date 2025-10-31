import { useEffect, useState } from "react";
import { LogOut, User } from 'lucide-react';
import './Protetction.css'
import api from "../../../backend/src/services/api"; 
import Dashboard  from "../PainelAdmin/DashBoard";

const Protection = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [adminUser, setAdminUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    setAdminUser(user || 'Admin');

    const token = localStorage.getItem("token");
    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    api.get("/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setAuthorized(true))
      .catch(() => {
        localStorage.removeItem("token");
        setAuthorized(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (!authorized){
    return <p>Não autorizado. Faça login novamente.</p>;
  }


  return(
    <div className="protected-dashboard-wrapper">
      {/* Barra superior com info do admin */}
      <div className="admin-topbar">
        <div className="admin-info">
          <div className="admin-avatar">
            <User size={20} />
          </div>
          <div className="admin-details">
            <span className="admin-name">{adminUser}</span>
            <span className="admin-role">Administrador</span>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={18} />
          Sair
        </button>
      </div>
      {/* página dashboard */}
      < Dashboard />
    </div>
    
  );
   
};

export default Protection;
