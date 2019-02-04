import React from 'react';

const Landing = () => (
  <section className="landing">
    <div className="banner">
      <img className="banner-img" src='assets/images/landing.jpeg' alt="Bloc AM Banner" />
      <h1 className="hero-title">Kaival Upasana</h1>
    </div>

   <section className="selling-points">
     <div className="point">
      <span className="icon ion-music-note"></span>
       <h2 className="point-title">Choose your music</h2>
       <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
     </div>
     <div className="point">
      <span className="icon ion-wifi"></span>
       <h2 className="point-title">Unlimited, streaming, ad-free</h2>
       <p className="point-description">No arbitrary limits. No distractions.</p>
     </div>
     <div className="point">
      <span className="icon ion-tablet-portrait"></span>
       <h2 className="point-title">Mobile enabled</h2>
       <p className="point-description">No arbitrary limits. No distractions.</p>
     </div>
   </section>
  </section>
);
export default Landing;
