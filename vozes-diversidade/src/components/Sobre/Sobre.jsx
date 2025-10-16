import React from 'react'
import './Sobre.css'
import {Shield, Heart, FileText} from 'lucide-react'

const Sobre = () => {
  return (
    <section className="about">
        <div className="about-container">
            <p className="about-intro">"<span>Vozes da Diversidade</span>" surgiu do projeto de extensão da Universidade do Estado do Pará - UEPA, que visa combater a violência e a descriminação contra a comunidade LGBTQIA+ em Ananindeua e regiões proximas, oferecendo um ambiente seguro, confidencial e acolhedor.</p>

            <div className="pillars">
                <div className="pillar-card">
                    <div className="pillar-icon">
                        <Shield size={48} />
                    </div>
                    <h3>Denúncia Segura</h3>
                    <p>
                    Registre denúncias de forma totalmente anônima, com protocolo de proteção de dados rigoroso e criptografia de ponta a ponta. Sua identidade nunca será revelada.
                    </p>
                </div>

                <div className="pillar-card">
                    <div className="pillar-icon">
                        <Heart size={48} />
                    </div>
                    <h3>Rede de Apoio</h3>
                    <p>
                        Conecte-se com profissionais qualificados para suporte psicológico, orientação jurídica e acolhimento social. Você não está sozinhe nessa jornada.
                    </p>
                </div>

                <div className="pillar-card">
                    <div className="pillar-icon">
                        <FileText size={48} />
                    </div>
                    <h3>Recursos Educativos</h3>
                    <p>
                        Acesse recursos educativos, guias de direitos e informações sobre prevenção da violência. Empodere-se com conhecimento para proteger a si mesme e à sua comunidade.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Sobre
