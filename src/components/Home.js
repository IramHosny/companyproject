import React from 'react'
import './fcss/Home.css'
import Homebody from './Homebody'
import { Bounce,  Zoom } from "react-awesome-reveal";
import ChattBott from './ChattBott'


function Home() {
  
  return (
    <>
    <div className='home' style={{marginTop:'5%'}}>
        <div className='hometext'>
        <Zoom triggerOnce>
  <h2 className='text'>
    Vos structures métalliques, sur mesure et prêtes partout en un clic
  </h2>
</Zoom>
<Bounce triggerOnce delay={1500}>
  <h5 className='text'>
    Avec ABDEDAIEM ARTS MÉTALLIQUES MODERNES, optez pour la qualité professionnelle
  </h5>
  <h6 className='text'>
    Commandez vos produits métalliques en ligne, sans vous déplacer : cabines, abris, portes, tables, articles décoratifs et plus encore.
  </h6>
</Bounce>

        </div>
        <div className='homeimg'>
  <img src='./compta.png' style={{ borderRadius: '12px' }} />
</div>


    </div>
    <Homebody/>
    <ChattBott/>
    </>
  )
}

export default Home