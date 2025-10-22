import {steps} from '../../data/SupportTypes'
import './HowItWorks.css'
const HowItWorks = () => {
  return (
    <section className="how-it-works">
        <div className="how-container">
            <h2>Como Funciona?</h2>

            <div className="steps">
                {steps.map((step) => (
                    <div key={step.number} className="step">
                        <div className="step-number">{step.number}</div>
                        <div className="set-content">
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default HowItWorks
