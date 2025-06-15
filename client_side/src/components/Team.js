import React from 'react';
import './fcss/Team.css';
import { motion } from 'framer-motion';

function Team() {
  return (
    <section id="team" style={{ background: 'linear-gradient(to right, #f0f9ff, #fff6f0)' }}>
      <div className="container my-3 py-5 text-center">
        <div className="row mb-5">
          <div className="col">
            <h1 style={{ color: '#002cfd', fontWeight: 'bold', fontSize: '2.5rem' }}>Notre équipe</h1>
            <p className="my-3" style={{ textAlign: 'center', fontSize: '1.1rem', color: '#555' }}>
              Mr. Abdedaiem est assisté par :
            </p>
          </div>
        </div>

        <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {[{
            name: 'Hend Chibani',
            title: 'Assistante administrative',
            img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=333&q=80'
          }, {
            name: 'Fatma Ben Yeder',
            title: 'Secrétaire',
            img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=334&q=80'
          }, {
            name: 'Youssef Hssine',
            title: "Chef d'équipe",
            img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=500&q=60'
          }].map((member, i) => (
            <motion.div
              key={i}
              className="col-lg-3 col-md-6 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body">
                  <img className="img-fluid rounded-circle mb-3 border border-3 shadow" src={member.img} alt={member.name} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                  <h3 style={{ color: '#003366', fontWeight: 'bold' }}>{member.name}</h3>
                  <h5 style={{ color: '#ff7f00', fontWeight: '500' }}>{member.title}</h5>
                  <div className="d-flex justify-content-center mt-3">
                    {["facebook-f", "twitter", "instagram"].map((icon, idx) => (
                      <div className="px-3" key={idx}>
                        <a href="#" style={{ color: '#002cfd', fontSize: '1.1rem' }}>
                          <i className={`fab fa-${icon}`} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
