"use client";

import { useEffect, useRef } from 'react';
import Link from "next/link";
import styles from './page.module.css';
import ButtonStyled from "@/components/ButtonStyled";
import PartnersCarousel from "@/components/parceirosSlider";
import BannerProducts from '@/components/banner_products';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const destaquesRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const whatsappRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const workUsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // Para de observar após a animação
          }
        });
      },
      {
        threshold: 0.1, // Define quando a animação deve começar (10% visível)
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (destaquesRef.current) observer.observe(destaquesRef.current);
    if (partnersRef.current) observer.observe(partnersRef.current);
    if (whatsappRef.current) observer.observe(whatsappRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    if (mapRef.current) observer.observe(mapRef.current);
    if (workUsRef.current) observer.observe(workUsRef.current);
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <p className={styles.heroWelcome}>
            Bem vindo à Francal Distribuidora
          </p>
          <h1 className={styles.heroTitle}>
            Acreditamos em um mundo melhor servindo a você
          </h1>
          <p className={styles.heroSubtitle}>
            Distribuição logística confiável para o Norte e Nordeste do Brasil
          </p>


          <div className={styles.heroButtons}>
            <ButtonStyled href="/produtos">Conheça nossos produtos</ButtonStyled>
            <ButtonStyled href="/contato">Entre em contato</ButtonStyled>
          </div>
        </div>
      </section>

      {/*nossos parceiros*/}
      <section className={styles.partnersSection} ref={partnersRef}>
        <h2 className={styles.partnersTitle}>Nossos Parceiros</h2>
        <div className={styles.partnersWrapper}>
          <PartnersCarousel />
        </div>
        <p>Trabalhamos com as principais marcas do mercado, garantindo produtos de qualidade e confiabilidade para nossos clientes.</p>
      </section>

      {/* services section */}
      <section className={styles.services} ref={servicesRef}>
        <div className={styles.servicesContent}>
          <h4 className={styles.servicesTitle}>FRETE <span>GRÁTIS</span></h4>
          <p>Entrega rápida</p>
          <img className={styles.ico} src="delivery _WHITE.png" alt="" />
        </div>
        <div className={styles.servicesContent}>
          <h4 className={styles.servicesTitle}>PEDIDO <span>RASTREADO</span></h4>
          <p>Acompanhe seu pedido em tempo real</p>
          <img className={styles.ico} src="rastreio.svg" alt="" />
        </div>
        <div className={styles.servicesContent}>
          <h4 className={styles.servicesTitle}>LOJA <span>ONLINE</span></h4>
          <p>Descubra novidades</p>
          <img className={styles.ico} src="shopping-bag-svgrepo-com.svg" alt="" />

        </div>
      </section>


      {/* Destaques Section */}
      <section className={styles.bnnr_products_container} ref={destaquesRef}>
        <h2>Nossos campeões em vendas</h2>
        <BannerProducts />
      </section>

      {/*CTA Whatsapp */}
      <section className={styles.ctaWhatsappSection} ref={whatsappRef}>
        <p className={styles.textWhatsApp}>
          COMPRE AGORA PELO <br />
          <span>WHATSAPP</span>
        </p>
        <img src="WhatsAppLogo.webp" alt="icone do whatsapp" />
        <p style={{ textAlign: 'right' }}>
          AGILIDADE NO <span>ATENDIMENTO</span>
          <br />
          CONVERSE COM A FRANCAL AGORA MESMO!
        </p>

      </section>


      {/* Info Section */}
      <section className={styles.infoSection} ref={infoRef}>
          <div className={styles.infoContainer}>

              {/* COLUNA 1: Sobre Nós */}
              <div className={styles.infoCard}>
                  <h3 className={styles.cardTitle}>FUNDADA EM 1995</h3>
                  <p className={styles.cardText}>
                      A FRANCAL DISTRIBUIDORA NASCEU COM O PROPÓSITO DE LEVAR PRODUTOS DE
                      <span className={styles.highlight}> QUALIDADE COM RAPIDEZ E CONFIABILIDADE</span>,
                      SEMPRE PRIORIZANDO A EXCELÊNCIA NO ATENDIMENTO E A PONTUALIDADE NAS ENTREGAS.
                  </p>
                  <ButtonStyled href="/sobre" color="" backgroundColor="#3c4de7ff">Sobre nós</ButtonStyled>
              </div>

              {/* COLUNA 2: Atendimento e Contato */}
              <div className={styles.infoCard}>
                  <h3 className={styles.cardTitle}>
                      ATENDIMENTO <span className={styles.highlight}>DAS 08H00 ÀS 12H00 - 14H00 ÀS 18:00</span> DE SEGUNDA A SEXTA.
                  </h3>
                  <div className={styles.iconPlaceholder}>
                      {/* Aqui ficaria seu ícone de Fale Conosco (em SVG) */}
                      <img src="customer-service.svg" alt="" />
                  </div>
                  <h3 >FALE COM A GENTE</h3>
                  <ButtonStyled href="/sobre" color="" backgroundColor="#3c4de7ff">Fale conosco</ButtonStyled>
              </div>

              {/* COLUNA 3: Regiões de Atendimento */}
              <div className={styles.infoCard}>
                  <h3 className={styles.cardTitle}>
                      ATENDIMENTO NAS <br /> REGIÕES <span className={styles.highlight}>NORTE E NORDESTE</span>
                  </h3>
                  <div className={styles.mapPlaceholder}>
                      {/* Aqui ficaria o mapa das regiões (em SVG) */}
                      <img src="Norte_nordeste 1.svg" alt="" />
                  </div>
                  <ButtonStyled href="/sobre" color="" backgroundColor="#3c4de7ff">Abrir</ButtonStyled>
              </div>

          </div>
      </section>
      {/* Mapa Section */}
      {/* <section className={styles.mapContainerSection} ref={mapRef}>
        <h2 className={styles.mapTitle}>Nossa Área de Atuação</h2>
        <p className={styles.mapSubtitle}>Atendemos com excelência as regiões Norte e Nordeste do Brasil</p>
        <div className={styles.mapContainer}>
          <img src="/mapa.png" alt="Mapa de Atuação da Francal Distribuidora" className={styles.mapImage} />
        </div>
      </section> */}

      {/* CTA Section */}
      <section className={styles.workUs} ref={workUsRef}>
        <div className={styles.workUsContent}>
          <div className={styles.workUsHeader}>
            <img src="/work_us.svg" alt="Trabalhe Conosco" className={styles.workUsImage} />
            <ButtonStyled 
              href="/vagas" 
              color="#fffff" 
              border="4px solid #ffffff"
              // backgroundColor="#ffffffff"
              borderRadius="35px"
              width='400px'
              height='100px'
              fontSize='2rem'
              >
                Trabalhe Conosco
            </ButtonStyled>
          </div>
          <p className={styles.workUsSubtitle}>
            Junte-se à nossa equipe e faça parte de uma empresa que valoriza seus colaboradores e oferece oportunidades de crescimento.
          </p>
        </div>
      </section>

    </div>
  );
}