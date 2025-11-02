import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Download,
} from "lucide-react";
import "./DashBoard.css";
import html2canvas from "html2canvas";

const DashBoard = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const FIXED_COLORS = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#4facfe",
    "#43e97b",
    "#fa709a",
    "#fee140",
    "#30cfd0",
    "#a8edea",
    "#ff6b6b",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/denuncia")
      .then((res) => {
        console.log("Denúncias recebidas:", res.data);
        setDenuncias(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getFilteredDenuncias = () => {
    return denuncias.filter((d) => {
      let denunciaYear, denunciaMonth;
      
      if (d.date.includes('-')) {
        const [year, month] = d.date.split('-');
        denunciaYear = year;
        denunciaMonth = month;
      } else if (d.date.includes('/')) {
        const parts = d.date.split('/');
        denunciaYear = parts[2];
        denunciaMonth = parts[1];
      } else {
        const date = new Date(d.date);
        denunciaYear = date.getFullYear().toString();
        denunciaMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      }
      
      console.log(`Denúncia: ${d.date} - Ano: ${denunciaYear}, Mês: ${denunciaMonth}`);
      console.log(`Filtros: Ano: ${selectedYear}, Mês: ${selectedMonth}`);
      
      const yearMatch = denunciaYear === selectedYear;
      const monthMatch = selectedMonth === "all" || denunciaMonth === selectedMonth.padStart(2, '0');
      const typeMatch = selectedType === "all" || d.occurenceType.includes(selectedType);
      
      console.log(`Matches - Ano: ${yearMatch}, Mês: ${monthMatch}, Tipo: ${typeMatch}`);
      
      return yearMatch && monthMatch && typeMatch;
    });
  };

  const filteredDenuncias = getFilteredDenuncias();

  console.log(`Total de denúncias filtradas: ${filteredDenuncias.length}`);

  const totalReports = filteredDenuncias.length;

  const reportsPorMes = Array.from({ length: 12 }, (_, i) => {
    const monthStr = (i + 1).toString().padStart(2, '0');
    const count = filteredDenuncias.filter((d) => {
      let denunciaMonth;
      
      if (d.date.includes('-')) {
        denunciaMonth = d.date.split('-')[1];
      } else if (d.date.includes('/')) {
        denunciaMonth = d.date.split('/')[1];
      } else {
        const date = new Date(d.date);
        denunciaMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      }
      
      return denunciaMonth === monthStr;
    }).length;
    return { month: i + 1, reports: count };
  });

  const reportsPorTipo = Object.values(
    filteredDenuncias.reduce((acc, d) => {
      d.occurenceType.forEach((t) => {
        if (!acc[t]) acc[t] = { type: t, count: 0 };
        acc[t].count++;
      });
      return acc;
    }, {})
  ).map((t, index) => ({
    ...t,
    percentage: totalReports > 0 ? ((t.count / totalReports) * 100).toFixed(1) : 0,
    color: FIXED_COLORS[index % FIXED_COLORS.length],
  }));

  const getMaxValue = (data) => {
    const max = Math.max(...data.map((item) => item.reports));
    return max > 0 ? max : 1;
  };

  const ultimasDenuncias = [...filteredDenuncias]
    .sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-') || a.date);
      const dateB = new Date(b.date.split('/').reverse().join('-') || b.date);
      return dateB - dateA;
    })
    .slice(0, 5);

  const downloadImage = async () => {
    const element = document.querySelector('.dashboard-container');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#f5f5f5',
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `dashboard_${selectedYear}_${selectedMonth}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Erro ao gerar imagem do dashboard');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Painel Administrativo</h1>
        </div>
        <div>
          <button onClick={downloadImage} className="btn-download">
            <Download size={20} />
            Imagem
          </button>
        </div>
      </div>

      <div className="dashboard-filtros">
        <div className="filtro-item">
          <Filter size={20} />
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {[2025, 2024, 2023].map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-item">
          <Calendar size={20} />
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="all">Todos os meses</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>

        <div className="filtro-item">
          <BarChart3 size={20} />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">Todos os tipos</option>
            {Array.from(
              new Set(denuncias.flatMap((d) => d.occurenceType))
            ).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon" style={{ background: "#667eea" }}>
            <Activity size={20} />
          </div>
          <div className="card-content">
            <h3>{totalReports}</h3>
            <p>Total de Denúncias</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Denúncias por tipo</h3>
            <PieChart size={20} />
          </div>
          <div className="chart-content">
            {reportsPorTipo.length > 0 ? (
              reportsPorTipo.map((item, index) => (
                <div key={index} className="type-bar-container">
                  <div className="type-bar-label">
                    <span>{item.type}</span>
                    <strong>{item.count}</strong>
                  </div>
                  <div className="type-bar-wrapper">
                    <div
                      className="type-bar"
                      style={{ width: `${item.percentage}%`, background: item.color }}
                    >
                      <span className="type-percentage">{item.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum dado disponível</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Evolução Mensal</h3>
            <BarChart3 size={20} />
          </div>
          <div className="chart-content">
            <div className="line-chart">
              {reportsPorMes.map((item, index) => {
                const maxValue = getMaxValue(reportsPorMes);
                const heightPercentage = (item.reports / maxValue) * 100;
                return (
                  <div key={index} className="line-chart-bar">
                    <div
                      className="bar-column"
                      style={{ height: `${heightPercentage}%` }}
                      title={`${item.reports} denúncias`}
                    >
                      <span className="bar-value">{item.reports}</span>
                    </div>
                    <span className="bar-label">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>
              {selectedMonth === "all" && selectedType === "all"
                ? "Últimas denúncias"
                : "Denúncias filtradas"}
            </h3>
          </div>
          <div className="chart-content">
            {ultimasDenuncias.length > 0 ? (
              ultimasDenuncias.map((d, idx) => (
                <div key={idx} className="denuncia-item" style={{ marginBottom: "1.5rem" }}>
                  <p>
                    <strong>Data:</strong> {d.date} | <strong>Local:</strong> {d.location}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {d.occurenceType.join(", ")} |{" "}
                    <strong>Descrição:</strong> {d.description}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhuma denúncia encontrada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;