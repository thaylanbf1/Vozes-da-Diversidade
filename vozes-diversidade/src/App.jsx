import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero';
import Support from './components/RedeSuporte/Support';
import Sobre from './components/Sobre/Sobre';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import Infos from './components/Infos/Infos';



function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Sobre />
            <Support />
            <Infos />

          </>
        );
      case 'about':
        return (
          <Sobre />
        );
      case 'support':
        return (
          <>
            <Support />
            <Infos />
          </>
        );
        case 'report':
          return (
            <Form />
          )
        default:
          return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Sobre />
            <Support />
            <Infos />
          </>
        );
    }
  }
  return (
    <div className="App">
      <Header onNavigate={setCurrentPage} currentPage={currentPage}/>
      <main className='main-content'>
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
