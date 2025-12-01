'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';
import { GiStairsGoal } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function Sobre() {
  const heroRef = useRef<HTMLElement>(null);
  const historiaRef = useRef<HTMLElement>(null);
  const missaoRef = useRef<HTMLElement>(null);
  const valoresRef = useRef<HTMLElement>(null);
  const diferenciaisRef = useRef<HTMLElement>(null);
  
  
  
  const propositoCardRef = useRef<HTMLDivElement>(null);
  const visaoCardRef = useRef<HTMLDivElement>(null);
  const valoresCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (historiaRef.current) observer.observe(historiaRef.current);
    if (missaoRef.current) observer.observe(missaoRef.current);
    if (valoresRef.current) observer.observe(valoresRef.current);
    if (diferenciaisRef.current) observer.observe(diferenciaisRef.current);
    
    // 💡 OBSERVAÇÃO DAS NOVAS REFERÊNCIAS
    if (propositoCardRef.current) observer.observe(propositoCardRef.current);
    if (visaoCardRef.current) observer.observe(visaoCardRef.current);
    if (valoresCardRef.current) observer.observe(valoresCardRef.current);
    
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.gray}></div>
        <div className={styles.red}></div>
        <div className={styles.heroContent}>
            <p>
                "Desde 1995, a <strong>Francal Distribuidora</strong> se dedica a levar produtos de alta qualidade ao Norte e Nordeste do Brasil com rapidez e total confiabilidade. Com quase três décadas de atuação, nossa marca é sinônimo de sólida reputação, <strong>pontualidade nas entregas e excelência no atendimento</strong>, sustentando um crescimento baseado em inovação e compromisso com o desenvolvimento regional."
            </p>
        </div>
      </section>
      {/* cultura */}
      <section className={styles.cultura} ref={missaoRef}>
        <div className={styles.culturaContent}>
            {/* Título opcional da seção para dar contexto */}
            <h2 className={styles.culturaHeader}>Nossa Essência e Princípios</h2>
            
            <div className={styles.culturaGrid}>

                {/* CARD 1: PROPÓSITO - APLICAÇÃO DA REF */}
                <div className={styles.culturaCard} ref={propositoCardRef}>
                    <h3 className={styles.culturaTitle}>Propósito <span><GiStairsGoal/></span></h3>
                    <p className={styles.culturaDescription}>
                        Acreditamos em um mundo melhor servindo a você.
                    </p>
                </div>
                

                {/* CARD 2: VISÃO - APLICAÇÃO DA REF */}
                <div className={styles.culturaCard} ref={visaoCardRef}>
                    <h3 className={styles.culturaTitle}>Visão <span><FaEye/></span></h3>
                    <p className={styles.culturaDescription}>
                        Ampliar a participação e distribuição de produtos do Pará e Maranhão, 
                        desenvolvendo valor aos parceiros do negócio, consumidores e colaboradores até 2026.
                    </p>
                </div>

                {/* CARD 3: VALORES - APLICAÇÃO DA REF */}
                <div className={styles.culturaCard} ref={valoresCardRef}>
                    <h3 className={styles.culturaTitle}>Valores <span><FaHandHoldingHeart /></span></h3>
                    {/* Usando uma lista não ordenada para clareza */}
                    <ul className={styles.culturaValoresList}>
                        <li>
                            <span className={styles.listMarker}>•</span> 
                            Resiliência: Na busca constante por melhores resultados, surpreendendo constantemente os nossos parceiros.
                        </li>
                        <li>
                            <span className={styles.listMarker}>•</span> 
                            Comprometimento: Com os parceiros do negócio, trabalhando com amor e ética.
                        </li>
                        <li>
                            <span className={styles.listMarker}>•</span> 
                            Proatividade: Que busquem os melhores caminhos para rentabilizar o nosso negócio.
                        </li>
                        <li>
                            <span className={styles.listMarker}>•</span> 
                            Disciplina: Para preparação e motivação de todos para a mesma direção, buscando a satisfação dos nossos parceiros.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>
      {/* ------------------------------------------------ */}
      {/* 💡 NOVA SEÇÃO: NOSSA EQUIPE (DIRETORIA) */}
      {/* ------------------------------------------------ */}
      <section className={styles.nossaEquipe} ref={historiaRef}> {/* Use uma ref livre ou a historiaRef */}
        <h2 className={styles.equipeHeader}>Nossa equipe</h2>
        
        <div className={styles.equipeContent}>
            
            {/* Bloco 1: Texto de Contexto */}
            <div className={styles.equipeText}>
                <h3 className={styles.equipeTitle}>Diretoria</h3>
                <p className={styles.equipeDescription}>
                    Márcio, Eliane, Lucas & Adeilson são responsáveis por organizar, planejar e orientar políticas de gestão do grupo.
                </p>
            </div>

            {/* Bloco 2: Fotos da Diretoria */}
            <div className={styles.equipePhotosGrid}>
                
                <div className={styles.memberPhotoWrapper}>
                    <img 
                        src="/diretoria/marcio.png" 
                        alt="Foto de Márcio, Diretor da Francal" 
                        className={styles.memberPhoto} 
                    />
                </div>
                
                <div className={styles.memberPhotoWrapper}>
                    <img 
                        src="/diretoria/eliane.png" 
                        alt="Foto de Eliane, Diretora da Francal" 
                        className={styles.memberPhoto} 
                    />
                </div>
                
                <div className={styles.memberPhotoWrapper}>
                    <img 
                        src="/diretoria/lucas.png" 
                        alt="Foto de Lucas, Diretor da Francal" 
                        className={styles.memberPhoto} 
                    />
                </div>

                <div className={styles.memberPhotoWrapper}>
                    <img 
                        src="/diretoria/adeilson.png" 
                        alt="Foto de Adeilson, Diretor da Francal" 
                        className={styles.memberPhoto} 
                    />
                </div>

            </div>

        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* 💡 NOVA SEÇÃO: GERÊNCIA COMERCIAL */}
      {/* ------------------------------------------------ */}
      <section className={styles.gerenciaComercial}>
        
        <div className={styles.gerenciaHeaderContainer}>
            {/* Bloco de Texto (Alinhado à Direita no Grid) */}
            <div className={styles.gerenciaText}>
                <h3 className={styles.gerenciaTitle}>Gerencia comercial</h3>
                <p className={styles.gerenciaDescription}>
                    Equipe de liderança e sua área de atuação
                </p>
            </div>
        </div>

        <div className={styles.gerenciaPhotosGrid}>
            
            {/* ITEM 1 */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    {/* Substitua o src pelo caminho real da sua imagem */}
                    <img src="/images/gerencia/gerente1.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>
            
            {/* ITEM 2 */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    <img src="/images/gerencia/gerente2.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>
            
            {/* ITEM 3 */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    <img src="/images/gerencia/gerente3.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>
            
            {/* ITEM 4 */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    <img src="/images/gerencia/gerente4.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>
            
            {/* ITEM 5 */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    <img src="/images/gerencia/gerente5.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>

            {/* ITEM 6 (Para preencher o grid) */}
            <div className={styles.gerenciaItem}>
                <div className={styles.memberPhotoWrapper}>
                    <img src="/images/gerencia/gerente6.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                </div>
                <p className={styles.memberName}>Ger. Antonio Cloves</p>
                <p className={styles.memberLocation}>Marabá-PA</p>
                <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
            </div>
            

        </div>

      </section>

      {/* ------------------------------------------------ */}
      {/* 💡 NOVA SEÇÃO: GERÊNCIA GERAL */}
      {/* ------------------------------------------------ */}
      <section className={styles.gerenciaGeral}>
        
        <h2 className={styles.gerenciaGeralHeader}>Gerência</h2>
        
        {/* Container principal para centralizar o grid de fotos */}
        <div className={styles.gerenciaGeralContent}>
            
            <div className={styles.gerenciaGeralGrid}>
                
                {/* ITEM 1 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        {/* Substitua o src pelo caminho real da sua imagem */}
                        <img src="/images/gerencia/gerente1.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>
                
                {/* ITEM 2 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        <img src="/images/gerencia/gerente2.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>
                
                {/* ITEM 3 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        <img src="/images/gerencia/gerente3.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>
                
                {/* ITEM 4 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        <img src="/images/gerencia/gerente4.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>
                
                {/* ITEM 5 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        <img src="/images/gerencia/gerente5.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>

                {/* ITEM 6 */}
                <div className={styles.gerenciaGeralItem}>
                    <div className={styles.memberPhotoWrapper}>
                        <img src="/images/gerencia/gerente6.jpg" alt="Gerente Antonio Cloves" className={styles.memberPhoto} />
                    </div>
                    <p className={styles.memberName}>Ger. Antonio Cloves</p>
                    <p className={styles.memberLocation}>Marabá-PA</p>
                    <p className={styles.memberArea}>Sul e Sudeste do Pará</p>
                </div>
                
            </div>
            
        </div>

      </section>

      {/* ------------------------------------------------ */}
      {/* 💡 NOVA SEÇÃO: EQUIPE OPERACIONAL (DESTAQUE) */}
      {/* ------------------------------------------------ */}
      <section className={styles.operacionalDestaque}>
        <div className={styles.operacionalContent}>
            
            {/* Bloco 1: Título Principal */}
            <h2 className={styles.operacionalHeader}>Equipe Operacional</h2>
            
            {/* Container para os dois blocos de texto alinhados */}
            <div className={styles.operacionalGrid}>
                
                {/* Bloco Esquerdo: Descrição e Missão */}
                <div className={styles.operacionalDescricao}>
                    <h4 className={styles.operacionalSubtitulo}>Cultura e Performance Unificadas.</h4>
                    <p className={styles.operacionalTexto}>
                        Projetamos um ambiente de trabalho colaborativo e altamente eficiente. Nossa metodologia garante 
                        o alinhamento perfeito entre o talento e a posição, transformando potencial em resultados de valor inquestionável.
                    </p>
                </div>
                
                {/* Bloco Direito: Dados Estatísticos */}
                <div className={styles.operacionalEstatistica}>
                    <p className={styles.operacionalTextoDestaque}>
                        <span className={styles.operacionalNumero}>560 profissionais</span> 
                        treinados, a Francal Distribuidora garante eficiência e agilidade em cada operação.
                    </p>
                </div>
                
            </div>
            
        </div>
      </section>
    </div>
  );
}