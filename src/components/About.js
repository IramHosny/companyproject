import React from 'react'
import './fcss/Apropos.css'
import { Fade } from 'react-awesome-reveal'
import Team from './Team'

function About() {

  return (
<div className='apropos'>
  <video autoPlay loop width={'100%'} height={'auto'}>
    <source src='./couv.mp4' type='video/mp4' />
  </video>

  <div className='proptext'>
    <Fade cascade triggerOnce>
      <h2 className="fancy">Notre société</h2>
      <p style={{fontWeight:'bold'}}>
        ABDEDAIEM ARTS MÉTALLIQUES MODERNES est une société spécialisée dans la conception, la fabrication
        et la vente de produits métalliques de haute qualité. Fondée avec la volonté de combiner savoir-faire artisanal
        et innovation industrielle, notre entreprise est aujourd’hui un acteur reconnu dans le secteur métallique.
      </p>

      <h2 className="fancy">Notre mission</h2>
      <p style={{fontWeight:'bold'}} >
        Offrir à nos clients des solutions métalliques durables, esthétiques et personnalisées répondant aux exigences
        techniques les plus strictes. Nous nous engageons à fournir un service fiable, rapide et accessible en ligne,
        afin de faciliter la concrétisation de leurs projets.
      </p>

      <h2 className="fancy">Notre activité</h2>
      <p style={{fontWeight:'bold'}}>
        Nous proposons une large gamme de produits métalliques tels que des cabines de chantier, abris, portes, tables,
        rayonnages, articles décoratifs, etc. Notre activité couvre la conception sur mesure, la fabrication locale,
        la commande en ligne ainsi que la livraison rapide.
        <br />Nous accompagnons également nos clients avec des services complémentaires : assistance technique,
        élaboration de devis personnalisés, conseils en aménagement et suivi de production.
      </p>
    </Fade>
  </div>

  <Team />
</div>

  )
}

export default About