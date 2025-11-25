import React from 'react'
import './Hero.css' 
import {Shield, Heart, Lock} from 'lucide-react'

const Hero = ({onNavigate}) => {
  return (
    <section className="hero">
        <div className="hero-content">
            <h1>Um espaço seguro para sua voz</h1>
            <p>Plataforma de denúncia anônima e apoio inetegral a Comunidade LGBTQIAPN+ em Ananindeua e regiões no Pará</p>
        </div>
        <div className="hero-buttons">
            <button className='btn btn-primary' onClick={() => onNavigate('report')}>
                <Shield size={20} /> 
                Fazer Denúncia Anônima
            </button>
            <button className='btn btn-secondary' onClick={() => onNavigate('support')}>
                <Heart size={20} />
                Buscar Apoio
            </button>
            <div className="security-badge">
                <Lock size={20} />
                <span>Sua privacidade é nossa prioridade. Denúncias 100% anônimas e dados protegidos pela LGPD.</span>
            </div>
        </div>
    </section>
  )
}

export default Hero
