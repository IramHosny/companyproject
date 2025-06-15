import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotions } from '../redux/promotionSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Zoom } from 'react-awesome-reveal';

function PublicPromotions() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotions || []);
  const [minPourcentage, setMinPourcentage] = useState(0);

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  const filteredPromos = promotions.filter((promo) => promo.pourcentage >= minPourcentage);

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fffaf5' }}>
      <Zoom triggerOnce>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#0033cc', marginBottom: '40px' }}>
          Promotions en cours
        </h2>
      </Zoom>

      {/* Filtrage */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <label className="text-gray-700 font-medium">Réduction minimale :</label>
        <select
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setMinPourcentage(Number(e.target.value))}
        >
          <option value={0}>Toutes</option>
          <option value={10}>10% et plus</option>
          <option value={20}>20% et plus</option>
          <option value={30}>30% et plus</option>
          <option value={50}>50% et plus</option>
        </select>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3500 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {filteredPromos.map((promo) => (
          <SwiperSlide key={promo._id}>
            <Zoom triggerOnce>
              <div style={{
                background: 'linear-gradient(135deg, #fff0e6, #ffffff)',
                border: '1px solid #ffe3d3',
                borderRadius: '20px',
                padding: '30px',
                height: '100%',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transform: 'scale(1)',
                transition: 'transform 0.4s ease-in-out'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <h3 style={{ color: '#ff7f00', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>{promo.title}</h3>
                <p style={{ color: '#444', fontSize: '1rem', flexGrow: 1 }}>{promo.description}</p>
                <span style={{
                  marginTop: '18px',
                  backgroundColor: '#e6f9e6',
                  color: '#2e7d32',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  alignSelf: 'flex-start'
                }}>
                  -{promo.pourcentage}% OFF
                </span>
              </div>
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PublicPromotions;
