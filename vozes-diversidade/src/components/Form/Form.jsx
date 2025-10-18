import { useState } from "react"
import './Form.css'
import { ChevronRight, Lock, AlertCircle } from "lucide-react"

const Form = () => {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        occurenceType: '',
        description: '',
        date: '',
        location: '',
        wantsSupport: false,
        contactMethod: '',
        contactEmail: '',
        contactPhone: '',
        contactPreferredTime: ''
    })

    const handleNext= () => {
        if (step < 4) {
            setStep(step + 1);
        };
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleSubmit = () => {
        const protocol = math.random().toString(36).substring(2, 10).toUpperCase();
        alert(`Denûncia enviado com sucesso! Seu protocolo é: ${protocol}`);
        // reset form

        if(formData.wantsSupport){
            message += `\n\nVocê solicitou contato via ${
                formData.contactMethod === 'email' ? 'Email' :
                formData.contactMethod === 'phone' ? 'Telefone/WhatsApp' :
                'Atendimento Presencial'
            }.\n\nNossa equipe entrará em contato em breve.`;
        }
        setFormData({
            occurenceType: [],
            description: '',
            date: '',
            location: '',
            wantsSupport: false,
            contactMethod: '',
            contactEmail: '',
            contactPhone: '',
            contactPreferredTime: ''
        });
        setStep(1);
    }

    const handleCheckBoxChange = (value) => {
        setFormData(prev =>  ({
            ...prev,
            occurenceType: prev.occurenceType.includes(value)
            ? prev.occurenceType.filter(item => item !== value)
            : [...prev.occurenceType, value]
        }))
    }
        

  return (
    <section  className="report-form-section">
        <div className="form-container">
            <div className="form-header">
                <h2>Fazer denúncia Anônima</h2>
                <p>Todas as informações são confidenciais e anônimas</p>
            </div>

            <div className="progress-bar">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
                <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
            </div>

            <div className="form-content">
                {/* step 1 */}
                {step === 1 && (
                    <div className="form-step active">
                        <div className="welcome-message">
                            <h3>Você não está sozinho</h3>
                            <p>Sua coragem em denunciar é importante. Este espaço é seguro e confidencial. Nenhuma informação que você colocar aqui será compartilhada sem seu consentimento</p>
                        </div>

                        <div className="security-notice">
                            <Lock size={20} style={{color: '#667eea', flexShrink: 0}} />
                            <p>Este formulário é seguro e todos os dados são criptografados e protegidos pela LGPD. Seu anonimato é garantido.</p>
                        </div>

                        <div className="form-group">
                            <label>Tipo de Ocorrência*</label>
                            <div className="checkbox-group">
                                {['Violência Fisica', 'Violência Psicologica', 'Assédio', 'Discriminação', 'Ameaça', 'Outro'].map((type) => (
                                    <label key={type} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            checked={formData.occurenceType.includes(type)}
                                            onChange={() => handleCheckBoxChange(type)}
                                        />
                                        <span>   {type}</span>
                                    </label>
                                ))}
                            </div>
                            <p className="help-text">
                                Selecione um ou mais tipos que melhor descrevem a ocorrência.
                            </p>
                        </div>
                    </div>
                )}

                {/* step 2 */}
                {step === 2 && (
                    <div className="form-step active">
                        <div className="form-group">
                            <label>Descrição da Ocorrência*</label>
                            <textarea placeholder="Conte-nos o que aconteceu, com o nível de detalhe que se sentir confortável."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                            <p className="help-text">
                                Compartilhe detalhes importantes, como o que foi dito ou feito, quem estava envolvido e qualquer outra informação relevante. Não há obrigaoriedade de fornecer detalhes que possam identificar você. Aqui você pode detalhar a se a violência sofrida foi presenciada sou sofrida por você.
                            </p>
                        </div>

                        <div className="form-group">
                            <label>Data da Ocorrência*</label>
                            <input  type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                            <p>
                                Se não souber a data exata, forneça uma estimativa aproximada. Isso já ajudará bastante.
                            </p>
                        </div>
                    </div>
                )} 
                {/* step 3 */}
                {step === 3 && (
                    <div className="form-step active">
                        <div className="form-group">
                            <label>Local da Ocorrência*</label>
                            <input type="text" placeholder="Onde a ocorrência aconteceu? (cidade, estado. bairro ou nome do local)"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                            <p className="help-text">
                                Quanto mais específico, melhor. Mas evite fornecer endereços exatos que possam identificar você.
                            </p>
                        </div>

                        <div className="security-notice">
                            <AlertCircle size={20} style={{ color: '#667eea', flexShrink: 0 }}/>
                            <p>Evite fornecer informações que possam identificar você, como seu nome, endereço ou detalhes pessoais. embre-se: você pode deixar qualquer campo em branco. O mais importante é sua segurança.</p>
                        </div>
                    </div>
                )}

                {/* step 4 */}
                {step === 4 && (
                    <div className="form-step active">
                        <div className="form-group">
                            <div className="checkbox-group">
                            <label htmlFor="" className="checkbox-label">
                                <input type="checkbox"
                                checked={formData.wantsSupport}
                                onChange={(e) => setFormData({...formData, wantsSupport: e.target.checked,
                                contactMethod: '',
                                contactEmail: '',
                                contactPhone: '',
                                contactPreferredTime: ''

                                })}
                                />
                                <span> Desejo ser contatado pela rede de apoio</span>
                            </label>
                            </div>
                            <p className="help-text">
                                Se desejar, podemos encaminhar sua denúncia para uma organização de apoio que poderá entrar em contato com você.
                            </p>
                        </div>
                        {formData.wantsSupport && (
                            <>
                                <div className="form-group">
                                    <label>Como prefere ser contatado? *</label>
                                    <select 
                                    value={formData.contactMethod}
                                    onChange={(e) => setFormData({
                                        ...formData, 
                                        contactMethod: e.target.value, 
                                        contactEmail: '', 
                                        contactPhone: ''
                                    })}
                                    required={formData.wantsSupport}
                                    >
                                    <option value="">Selecione uma opção</option>
                                    <option value="email">E-mail anônimo</option>
                                    <option value="phone">Telefone/WhatsApp</option>
                                    <option value="inperson">Presencial</option>
                                    </select>
                                </div>

                                {formData.contactMethod === 'email' && (
                                    <div className="form-group">
                                    <label>Seu E-mail *</label>
                                    <input 
                                        type="email"
                                        placeholder="seuemail@exemplo.com"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                                        required
                                    />
                                    <p className="helper-text">
                                        Seu e-mail será usado apenas para contato da equipe de apoio. Não será compartilhado.
                                    </p>
                                    </div>
                                )}

                                {formData.contactMethod === 'phone' && (
                                    <div className="form-group">
                                    <label>Seu Telefone/WhatsApp *</label>
                                    <input 
                                        type="tel"
                                        placeholder="(91) 98765-4321"
                                        value={formData.contactPhone}
                                        onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                                        required
                                    />
                                    <p className="helper-text">
                                        Inclua DDD. Entraremos em contato via ligação ou WhatsApp conforme sua preferência.
                                    </p>
                                    </div>
                                )}

                                {formData.contactMethod === 'inperson' && (
                                    <>
                                    <div className="security-notice">
                                        <AlertCircle size={20} />
                                        <p>
                                        Nossa equipe entrará em contato para agendar um horário de atendimento presencial em local seguro.
                                        Por favor, forneça um telefone ou e-mail para agendamento.
                                        </p>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>E-mail ou Telefone para agendamento *</label>
                                        <input 
                                        type="text"
                                        placeholder="E-mail ou telefone"
                                        value={formData.contactEmail}
                                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                                        required
                                        />
                                    </div>
                            </>
                        )}

                    {formData.contactMethod && (
                        <div className="form-group">
                        <label>Horário preferencial para contato (Opcional)</label>
                        <select 
                            value={formData.contactPreferredTime}
                            onChange={(e) => setFormData({...formData, contactPreferredTime: e.target.value})}
                        >
                            <option value="">Qualquer horário</option>
                            <option value="morning">Manhã (8h às 12h)</option>
                            <option value="afternoon">Tarde (12h às 18h)</option>
                            <option value="evening">Noite (18h às 21h)</option>
                        </select>
                        <p className="helper-text">
                            Ajuda-nos a escolher o melhor momento para entrar em contato
                        </p>
                        </div>
                    )}
                </>
              )}
                        <div className="welcome-message">
                        <h3>Quase lá!</h3>
                            <p>Revise suas respostas e, quando estiver pronto, envie sua denúncia. Lembre-se: você pode deixar qualquer campo em branco. O mais importante é sua segurança.</p>
                            <p> Ao enviar, você receberá um protocolo para acompanhamento. 
                            Guarde-o em local seguro.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="form-actions">
                {step > 1 && (
                    <button className="btn-back" onClick={handleBack}>
                    Voltar
                    </button>
                )}
                {step < 4 ? (
                    <button className="btn-next" onClick={handleNext}>
                    Próximo
                    <ChevronRight size={20} />
                    </button>
                ) : (
                    <button className="btn-submit" onClick={handleSubmit}>
                    Enviar Denúncia
                    </button>
                )}
            </div>
        </div>
    </section>
  )
}

export default Form
