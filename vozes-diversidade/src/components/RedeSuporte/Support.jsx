import './Support.css'
import { supportTypes } from '../../data/SupportTypes' 

const Support = () => {
    const handleClick = (type) => {
       alert(`Funcionalidade "${type}" será implementada em breve.`);
    }
  return (
    <section className='support-network'>
      <div className="support-container">
        <h2>Rede de Apoio Multidisciplinar</h2>

        <div className="support-cards">
           {supportTypes.map((support, index) => {
                const IconComponent = support.Icon;
                return (
                    <div className="support-card" key={index}>
                        <div className="support-icon">
                            <IconComponent size={36} />
                        </div>
                        <h3>{support.title}</h3>
                        <p>{support.description}</p>
                        <button onClick={() => handleClick(support.title)}>{support.buttonText}</button>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  )
}

export default Support
