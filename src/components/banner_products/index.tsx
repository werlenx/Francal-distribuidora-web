// components/BannerProducts/BannerProducts.tsx

import React from 'react';
import { useKeenSlider, KeenSliderInstance } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from './index.module.css';


interface Banner {
    id: number;
    src: string;
    alt: string;
}


const Autoplay = (slider: KeenSliderInstance) => {
  let timeout: ReturnType<typeof setTimeout>;

  function clearNextTimeout() {
    if (timeout) clearTimeout(timeout);
  }

  function next() {
    clearNextTimeout();
    timeout = setTimeout(() => {
      slider.next();
    }, 4000);
  }

  slider.on('created', () => {
    next();
  });

  slider.on('dragStarted', clearNextTimeout);
  slider.on('animationEnded', next);
  slider.on('updated', next);
};


const BannerProducts: React.FC = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [Autoplay]
  );

  const banners: Banner[] = [
    { id: 1, src: '/banner_BP/b_doritos.png', alt: '' },
    { id: 2, src: '/banner_BP/b_todynho.png', alt: '' },
    { id: 3, src: '/banner_BP/b_rider.png', alt: '' },
  ];

  return (
    <section className={styles.bnnr_products}>
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner) => (
          <div key={banner.id} className={`${styles.slide} keen-slider__slide`}>
            <img src={banner.src} alt={banner.alt} className={styles.bannerImage} />
            <div className={styles.bannerContent}>
                <h2>{banner.alt}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BannerProducts;