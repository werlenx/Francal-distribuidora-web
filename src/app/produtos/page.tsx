import styles from './page.module.css';

export default function Produtos() {
  const categorias = [
    {
      nome: "Alimentos",
      descricao: "Produtos alimentícios de qualidade para toda a família",
      icone: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      nome: "Bebidas",
      descricao: "Variedade de bebidas para todos os momentos",
      icone: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    },
    {
      nome: "Higiene e Limpeza",
      descricao: "Produtos essenciais para higiene pessoal e limpeza",
      icone: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const marcasParceiras = [
    "Coca-Cola", "Pepsi", "Nestlé", "Unilever", "Procter & Gamble", 
    "Johnson & Johnson", "Kraft", "Danone", "Ferrero", "Mars"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Nossos Produtos
          </h1>
          <p className={styles.heroSubtitle}>
            A Francal Distribuidora trabalha com um portfólio diversificado, 
            oferecendo qualidade e confiança em cada entrega.
          </p>
        </div>
      </section>

      {/* Categorias Section */}
      <section className={styles.categorias}>
        <div className={styles.categoriasContent}>
          <h2 className={styles.categoriasTitle}>
            Categorias de Produtos
          </h2>
          <div className={styles.categoriasGrid}>
            {categorias.map((categoria, index) => (
              <div key={index} className={styles.categoriaCard}>
                <div className={styles.categoriaIcon}>
                  {categoria.icone}
                </div>
                <h3 className={styles.categoriaTitle}>{categoria.nome}</h3>
                <p className={styles.categoriaDescription}>{categoria.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas Parceiras Section */}
      <section className={styles.marcas}>
        <div className={styles.marcasContent}>
          <h2 className={styles.marcasTitle}>
            Indústrias Parceiras
          </h2>
          <p className={styles.marcasSubtitle}>
            Trabalhamos com as principais marcas do mercado, garantindo produtos 
            de qualidade e confiabilidade para nossos clientes.
          </p>
          
          <div className={styles.marcasGrid}>
            {marcasParceiras.map((marca, index) => (
              <div key={index} className={styles.marcaCard}>
                <div className={styles.marcaName}>{marca}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className={styles.diferenciais}>
        <div className={styles.diferenciaisContent}>
          <h2 className={styles.diferenciaisTitle}>
            Por que escolher nossos produtos?
          </h2>
          <div className={styles.diferenciaisGrid}>
            <div className={styles.diferencialCard}>
              <div className={styles.diferencialIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.diferencialTitle}>Qualidade Garantida</h3>
              <p className={styles.diferencialDescription}>
                Produtos de marcas reconhecidas e confiáveis
              </p>
            </div>

            <div className={styles.diferencialCard}>
              <div className={styles.diferencialIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.diferencialTitle}>Entrega Rápida</h3>
              <p className={styles.diferencialDescription}>
                Frota própria para entregas pontuais
              </p>
            </div>

            <div className={styles.diferencialCard}>
              <div className={styles.diferencialIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className={styles.diferencialTitle}>Cobertura Regional</h3>
              <p className={styles.diferencialDescription}>
                Atendemos toda a região Norte e Nordeste
              </p>
            </div>

            <div className={styles.diferencialCard}>
              <div className={styles.diferencialIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className={styles.diferencialTitle}>Atendimento Personalizado</h3>
              <p className={styles.diferencialDescription}>
                Equipe especializada para melhor atendimento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Interessado em nossos produtos?
          </h2>
          <p className={styles.ctaSubtitle}>
            Entre em contato conosco e descubra como podemos atender suas necessidades.
          </p>
          <a
            href="/contato"
            className={styles.ctaButton}
          >
            Solicitar Orçamento
          </a>
        </div>
      </section>
    </div>
  );
}
