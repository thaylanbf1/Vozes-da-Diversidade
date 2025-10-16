import { useState, useEffect } from 'react'
import './Infos.css'
import { infosDiversity, infosEvitarDiscriminacao, infosLgbtqia, infosDireitos } from '../../data/SupportTypes'

const Infos = () => {
    
    const [currentTimeDiversity, setCurrentTimeDiversity] = useState(0);
    const [currentTimeDiscriminacao, setCurrentTimeDiscriminacao] = useState(0);
    const [currentTimeLgbtqia, setCurrentTimeLgbtqia] = useState(0);
    const [currentTimeDireitos, setCurrentTimeDireitos] = useState(0);

    useEffect(() => {
        const timerDiversity = setInterval(() => {
            setCurrentTimeDiversity((prevTime) => (prevTime +1) % infosDiversity.length)
        }, 6000);

        const timerDiscriminacao =setInterval(() => {
            setCurrentTimeDiscriminacao((prevTime) => (prevTime + 1) % infosDireitos.length)
        }, 6000);

        const timerLgbt = setInterval(() => {
            setCurrentTimeLgbtqia((prevTime) => (prevTime + 1) % infosLgbtqia.length)
        }, 6000);

        const timerDireitos = setInterval(() => {
            setCurrentTimeDireitos((prevTime) => (prevTime + 1) % infosDireitos.length)
        }, 6000)
        return() => {
            clearInterval(timerDiversity)
            clearInterval(timerDiscriminacao)
            clearInterval(timerLgbt)
            clearInterval(timerDireitos)
        }
    }, [])

    
  return (
    <section className='section-diversity'>
        {/* Seção LGBTQIA+ */}
            <div className="info-container">
                <h2>Informações sobre a Comunidade LGBTQIA+</h2>
                
                <div className="info-cards">
                    <div className="info-card">
                        <h3>{infosLgbtqia[currentTimeLgbtqia].title}</h3>
                        <p>{infosLgbtqia[currentTimeLgbtqia].content}</p>
                    </div>

                    <div className="info-buttons">
                        {infosLgbtqia.map((_, index) => (
                            <button
                                key={index}
                                className={`infor-btn ${index === currentTimeLgbtqia ? 'info-btn-active' : ''}`} 
                                onClick={() => setCurrentTimeLgbtqia(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

        {/* Secão Diversidade */}
            <div className="info-container">
                <h2>Informações sobre Diversidade e Inclusão</h2>
            
                <div className="info-cards">
                    <div className="info-card">
                        <h3>{infosDiversity[currentTimeDiversity].title}</h3>
                        <p>{infosDiversity[currentTimeDiversity].content}</p>
                    </div>

                    <div className="info-buttons">
                        {infosDiversity.map((_, index) => (
                            <button
                                key={index}
                                className={`infor-btn ${index === currentTimeDiversity ? 'info-btn-active' : ''}`} onClick={() => setCurrentTimeDiversity(index)}/>
                        ))}
                    </div>
                </div>
            </div>
        {/* Secão Evitar descriminação */}
        <div className="info-container">
            <h2>Como Evitar Descriminação</h2>

            <div className="info-cards">
                <div className="info-card">
                    <h3>{infosEvitarDiscriminacao[currentTimeDiscriminacao].title}</h3>
                    <p>{infosEvitarDiscriminacao[currentTimeDiscriminacao].content}</p>
                </div>

                <div className="info-buttons">
                        {infosEvitarDiscriminacao.map((_, index) => (
                            <button
                                key={index}
                                className={`infor-btn ${index === currentTimeDiscriminacao ? 'info-btn-active' : ''}`} onClick={() => setCurrentTimeDiscriminacao(index)}/>
                        ))}
                    </div>
            </div>
        </div>

    {/* Secão direitos */}
        <div className="info-container">
            <h2>Seus Direitos</h2>

            <div className="info-cards">
                <div className="info-card">
                    <h3>{infosDireitos[currentTimeDireitos].title}</h3>
                    <p>{infosDireitos[currentTimeDireitos].content}</p>
                </div>

                <div className="info-buttons">
                        {infosDireitos.map((_, index) => (
                            <button
                                key={index}
                                className={`infor-btn ${index === currentTimeDireitos ? 'info-btn-active' : ''}`} onClick={() => setCurrentTimeDireitos(index)}/>
                        ))}
                    </div>
            </div>
        </div>
    </section>

    
  )
}

export default Infos
