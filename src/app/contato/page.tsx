'use client'

import { useState } from 'react'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import styles from './page.module.css'

export default function Contato() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validar dados com Zod
      const validatedData = contactFormSchema.parse(formData)
      
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Dados do formulário:', validatedData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        const zodError = error as { issues: Array<{ path: string[]; message: string }> }
        const fieldErrors: Partial<ContactFormData> = {}
        zodError.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message
        })
        setErrors(fieldErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={styles.successModal}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Mensagem Enviada!</h2>
          <p className={styles.successMessage}>
            Obrigado pelo seu contato. Retornaremos em breve.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className={styles.successButton}
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Entre em Contato
          </h1>
          <p className={styles.heroSubtitle}>
            Estamos prontos para atender você. Entre em contato e conheça nossas soluções.
          </p>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className={styles.contact}>
        <div className={styles.contactContent}>
          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2>Informações de Contato</h2>
              
              <div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h3>Endereço Principal</h3>
                    <p>
                      Marabá/PA<br />
                      Cobertura: Belém/PA, Santarém/PA, Imperatriz/MA e São Luís/MA
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h3>Telefone</h3>
                    <p>
                      (94) 3324-0000<br />
                      (94) 3324-0001
                    </p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h3>E-mail</h3>
                    <p>
                      contato@francal.com.br<br />
                      vendas@francal.com.br
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h2>Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className={styles.formError}>{errors.name}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className={styles.formError}>{errors.email}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                    placeholder="Como podemos ajudá-lo?"
                  />
                  {errors.message && (
                    <p className={styles.formError}>{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.formButton}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
