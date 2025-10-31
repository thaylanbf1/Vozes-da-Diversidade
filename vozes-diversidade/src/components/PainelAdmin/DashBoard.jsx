import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { dashboarData } from "../../data/dadosDenuncia";
import './DashBoard.css';

const DashBoard = ({ onLogout }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const handelDownloadReport = () =>{
    alert('Funcionalidade ainda não implementada');
  };

  const getMaxValue = (data) =>{
    return Math.max(...data.map(item => item.reports || item.count));
  };

  return (
    <div className="dashboard-container">
      {/* Header com download + logout */}
      <div className="dashboard-header">
        <div>
          <h1>Painel de Administrativo</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-download" onClick={handelDownloadReport}>
            <Download size={20} />
            Baixar Relatório
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="dashboard-filtros">
        <div className="filtro-item">
          <BarChart3 size={20} />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">Todos os tipos</option>
            <option value="physical">Violência Física</option>
            <option value="psychological">Violência Psicológica</option>
            <option value="discrimination">Discriminação</option>
            <option value="harassment">Assédio</option>
            <option value="threat">Ameaça</option>
          </select>
        </div>
        <div className="filtro-item">
          <Calendar size={20} />
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="all">Todos os meses</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>
        <div className="filtro-item">
          <BarChart3 size={20} />
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon" style={{background: '#667eea'}}>
            <Activity size={20} />
          </div>
          <div className="card-content">
            <h3>{dashboarData.totalReports}</h3>
            <p>Total de Denúncias</p>
            <span className="trend positive">
              <TrendingUp size={16} />
              +{dashboarData.crescMensal}% este mês
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon" style={{background: '#ef4444'}}>
            <AlertTriangle size={20} />
          </div>
          <div className="card-content">
            <h3>{dashboarData.casosCriticos}</h3>
            <p>Casos Críticos</p>
            <span className="trend negative">
              <TrendingDown size={16} />
              Requerem Atenção Imediata
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon" style={{background: '#10b981'}}>
            <Users size={20} />
          </div>
          <div className="card-content">
            <h3>{dashboarData.casosResolvidos}</h3>
            <p>Casos Resolvidos</p>
            <span className="trend positive">
              <TrendingUp size={16} />
              68.7% do total
            </span>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon" style={{background: '#8b5cf6'}}>
            <Calendar size={28} />
          </div>
          <div className="card-content">
            <h3>{dashboarData.avaregeResponseTime}</h3>
            <p>Tempo Médio de Resposta</p>
            <span className="trend positive">
              <TrendingUp size={16} />
              -12h vs mês anterior
            </span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Denúncias por tipo</h3>
            <PieChart size={20} />
          </div>
          <div className="chart-content">
            {dashboarData.reportsPorTipo.map((item, index) => (
              <div key={index} className="type-bar-container">
                <div className="type-bar-label">
                  <span>{item.type}</span>
                  <strong>{item.count}</strong>
                </div>
                <div className="type-bar-wrapper">
                  <div className="type-bar" style={{width: `${item.percentage}%`, background:item.color}}>
                    <span className="type-percentage">{item.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
