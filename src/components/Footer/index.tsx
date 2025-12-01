import styles from './index.module.css'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        {/* Mapa */}
        <div className={styles.mapSection}>

          <iframe
            title="Mapa Francal Distribuidora (local correto)"
            src="https://www.google.com/maps?q=-5.3427127,-49.0841317&hl=pt-BR&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapIframe}
          />
        </div>

        {/* Informações da empresa */}
        <div className={styles.infoSection}>
          <h3 className={styles.title}>Francal Distribuidora</h3>
          <p>IREZ E SIQUEIRA COMÉRCIO ATACADISTA DE CALÇADOS LTDA</p>
          <p>CNPJ: 07.809.073/0001-78</p>
          <p>Folha 29, Quadra Especial, Lt 3, Galpão 2</p>
          <p>Nova Marabá - Marabá - PA, 68508-970</p>
          <p>Telefone: (94) 8169-0584</p>
        </div>

        {/* Redes sociais */}
        <div className={styles.socialSection}>
          <h3 className={styles.title}>Siga-nos</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/francaldistruidora" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/francaldistribuidora" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/francal-distribuidora/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Linha final */}
      <div className={styles.footerBottom}>
        <p>© 2025 Francal Distribuidora. Todos os direitos reservados.</p>
        <p>
          Created by <a href="https://www.linkedin.com/in/werlen-araujo/" target="_blank" rel="noopener noreferrer">Werlen Araujo</a>
        </p>
      </div>
    </footer>
  )
}
