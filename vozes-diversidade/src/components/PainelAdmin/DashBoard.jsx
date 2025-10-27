import { useState } from "react"
import { dashboarData } from "../../data/dadosDenuncia"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import './DashBoard.css'
const DashBoard = () => {

        const [selectedYear, setSelectedYear] = useState('2025')
        const [selectedMonth, setSelectedMonth] = useState('all')
        const [selectedType, setSelectedType] = useState('all')
   

    const handelDownloadReport = () =>{
        alert('Funcionalidade ainda não implementada')
    }

    const getMaxValue = (data) =>{
        return Math.max(...data.map(item => item.reports || item.count))
    }

  return (
      <div className="dashboard-container">
        <div className="dashboard-header">
            <div>
                <h1>Painel de Administrativo</h1>
            </div>
            <button className="btn-download" onClick={handelDownloadReport}>
                <Download size={20} />
                Baixar Relatório
            </button>
        </div>

        <div className="dashboard-filtros">
            <div className="filtro-item">
                <Filter size={20} />
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
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
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="all">Todos os tipos</option>
                    <option value="physical">Violência Física</option>
                    <option value="psychological">Violência Psicológica</option>
                    <option value="discrimination">Discriminação</option>
                    <option value="harassment">Assédio</option>
                    <option value="threat">Ameaça</option>
                </select>
            </div>
        </div>


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
                    <p>Casos Criticos</p>
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



        {/* Graficos principais */}

        <div className="charts-grid">
            {/* denuncias por tipo */}
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

            {/* evolução mensal */}

            <div className="chart-card">
                <div className="chart-header">
                    <h3>Evolução Mensal</h3>
                    <BarChart3 size={20}/>
                </div>
                <div className="chart-content">
                    <div className="line-chart">
                        {dashboarData.reportsPorMes.map((item, index) => {
                            const maxValue = getMaxValue(dashboarData.reportsPorMes)
                            const heightPercentage  = (item.reports / maxValue) * 100

                            return(
                                <div key={index} className="line-chart-bar">
                                    <div className="bar-column" style={{height:`${heightPercentage}%`}} title={`${item.reports} denúncias`}>
                                        <span className="bar-value">{item.reports}</span>
                                    </div>
                                    <span className="bar-label">{item.month}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

        {/* segunda linha de graficos */}

        <div className="charts-grid">
            {/* por cidade */}
            <div className="chart-card">
                <div className="chart-header">
                    <h3>Denúncias por Municipio</h3>
                    <MapPin size={20} />
                </div>
                <div className="chart-content">
                    <div className="city-list">
                        {dashboarData.reportsPorCidade.map((city, index) => (
                            <div key={index} className="city-item">
                                <div className="city-info">
                                    <span className="city-rank">#{index + 1}</span>
                                    <div>
                                        <strong>{city.city}</strong>
                                        <p>{city.reports} denúncias</p>
                                    </div>
                                </div>
                                {city.critical > 0 && (
                                    <span className="critical-badge">
                                        {city.critical} criticas
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Insights e Recomendações */}
            <div className="insights-section">
                <h2>Insights e recomendações para politicas públicas</h2>
                <div className="insights-grid">
                    <div className="insight-card priority-high">
                        <AlertTriangle size={20} />
                        <div>
                            <h4>Prioridade Alta</h4>
                            <p>
                                <strong>Violência Psicológica</strong> representa 31.9% dos casos. 
                                Recomenda-se campanhas educativas sobre formas sutis de violência e 
                                ampliação de atendimento psicológico especializado.
                                </p>
                        </div>
                    </div>


                    <div className="insight-card priority-medium">
                        <TrendingUp size={24} />
                        <div>
                            <h4>Tendência Crescente</h4>
                            <p>
                                Aumento de <strong>12.5% nas denúncias</strong> pode indicar maior 
                                confiança na plataforma. Importante manter e expandir os canais de apoio.
                            </p>
                        </div>
                     </div>


                     <div className="insight-card priority-medium">
                        <MapPin size={24} />
                        <div>
                            <h4>Concentração Geográfica</h4>
                            <p>
                                <strong>Belém e Ananindeua</strong> concentram 57% dos casos. 
                                Sugere-se criação de centros de referência nessas localidades.
                            </p>
                        </div>
                    </div>

                    <div className="insight-card priority-high">
                        <Users size={24}/>
                        <div>
                            <h4>Público Jovem</h4>
                            <p>
                                <strong>75.4% das vítimas têm entre 18-34 anos</strong>. 
                                Políticas devem focar em ambientes universitários e de trabalho.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default DashBoard
