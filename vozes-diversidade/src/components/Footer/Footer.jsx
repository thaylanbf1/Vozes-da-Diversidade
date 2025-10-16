import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logo">
                        <span>Vozes da Diversidade</span>
                    </div>
                    <p>Iniciativa do Projeto de extensão da Universidade do Estado do Pará, para apoio e proteção da comunidade LGBTQIA+ em Ananindeua e Regiões próximas</p>
                </div>
                <div className="emergency-contact">
                    <h4>Em emergência?</h4>
                    <p>Disque 190 (Polícia)</p>
                    <p>Disque 100 (Central de Direitos Humanos)</p>
                </div>
           

                <div className="footer-section">
                    <h3>Links úteis</h3>
                    <a href="#about">Sobre o Projeto</a>
                    <a href="#support">Rede de Suporte</a>
                    <a href="#Form">Denuncie</a>
                </div>

                <div className="footer-section">
                    <h3>Recursos</h3>
                        <a href="#faq">Perguntas Frequentes</a>
                        <a href="#materiais">Materiais Educativos</a>
                        <a href="#legislacao">Legislação</a>
                        <a href="#contato">Contato Institucional</a>
                </div>

                <div className="footer-section">
                    <h3>Universidade do Estado do Pará</h3>
                    <p>
                        Edital  - PROEx<br/>
                        Projeto de Extensão 
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Centro de Ciências Naturais e Tecnologia
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        UEPA - Campus XXII Ananindeua
                    </p>
                </div>
            </div>
            

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} Vozes da Diversidade.
                    desenvolvido por <strong>Thaylan Fonseca</strong>, <strong>Driele Carvalho</strong> e <strong>Filipe Cruz</strong>. Todos os direitos reservados. 
                </p>
            </div>
        </div>
    </footer>
      
  )
}

export default Footer
