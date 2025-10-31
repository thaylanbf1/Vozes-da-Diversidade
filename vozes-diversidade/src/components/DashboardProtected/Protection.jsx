import { useEffect, useState } from "react";
import api from "../../../backend/src/services/api"; 
import DashBoard from "../../components/PainelAdmin/DashBoard";

const Protection = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
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

  if (!authorized) return <p>Não autorizado. Faça login novamente.</p>;

  return <DashBoard onLogout={onLogout} />;
};

export default Protection;
