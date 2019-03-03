import React from 'react';

const Landing = () => (
  <section className="landing">
    <div className="banner">
      <img className="banner-img" src='assets/images/landing.jpeg' alt="Bloc AM Banner" />

    </div>

   <section className="selling-points">
     <div className="point">
      <span className="icon ion-music-note"></span>
       <h2 className="point-title">Listen to Upasana</h2>
       <p className="point-description">Want to perform Upasana but can't rhyme?</p>
     </div>
     <div className="point">
      <span className="icon ion-wifi"></span>
       <h2 className="point-title">Unlimited & ad-free</h2>
       <p className="point-description">No arbitrary limits. No distractions.</p>
     </div>
     <div className="point">
      <span className="icon ion-ios-book"></span>
       <h2 className="point-title">Lyrics-Enabled</h2>
       <p className="point-description">Know how to sing, but don't know the lyrics?</p>
     </div>
   </section>
  </section>
);
export default Landing;
