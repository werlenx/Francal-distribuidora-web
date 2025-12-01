"use client";
import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const partners = [
    "bic.png",
    "ElmaChips.png",
    "Mondelez.svg",
    "Pepsico.svg",
    "Unicharm.png",
    "SC_Johnson.svg",
    "Ontex.png",
    "AB_Brasil.png",
    "GrendeneBlack.png",
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    const speed = 0.5; // ajusta velocidade (px por frame)
    const logos = track.querySelectorAll(`.${styles.partnerLogo}`).length;
    const slideWidth = 200 + 20; // largura + espaçamento aproximado

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= logos * slideWidth / 2) {
        position = 0; // reinicia metade do ciclo (loop perfeito)
      }
      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (

        <div ref={trackRef} className={styles.partnersTrack}>
          {[...partners, ...partners].map((logo, index) => (
            <img
              key={index}
              src={`/parceiros/${logo}`}
              alt={`Parceiro ${index + 1}`}
              className={styles.partnerLogo}
            />
          ))}
        </div>

  );
}
