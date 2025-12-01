'use client';
import { useState } from 'react';
import styles from './page.module.css'; 
import ButtonStyled from '@/components/ButtonStyled/index';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CriarNovaVagaPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        salario: '', 
        localizacao: '',
        tipoContrato: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.titulo.trim()) return 'Título da vaga é obrigatório.';
        if (!formData.descricao.trim()) return 'Descrição da vaga é obrigatória.';
        if (!formData.localizacao.trim()) return 'Localização da vaga é obrigatória.';
        if (!formData.tipoContrato.trim()) return 'Tipo de contrato é obrigatório.';
        if (formData.salario && (isNaN(Number(formData.salario)) || Number(formData.salario) < 0)) {
            return 'Salário deve ser um número positivo válido.';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const validationError = validateForm();
        if (validationError) {
            return setError(validationError);
        }
        
        if (!API_URL) {
            return setError('Erro de Configuração: API_URL não definida.');
        }

        setLoading(true);

        const token = Cookies.get('auth-token');
        if (!token) {
            router.push('/rh/login');
            return;
        }

        try {
            const vagaData = {
                ...formData,
                salario: formData.salario ? parseFloat(formData.salario) : null,
            };

            const response = await fetch(`${API_URL}/vagas`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(vagaData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Vaga criada com sucesso!');
                setFormData({
                    titulo: '',
                    descricao: '',
                    salario: '',
                    localizacao: '',
                    tipoContrato: '',
                });
                setTimeout(() => router.push('/rh/dashboard'), 2000); 
            } else if (response.status === 401 || response.status === 403) {
                setError('Sessão expirada ou não autorizada. Faça login novamente.');
                Cookies.remove('auth-token');
                localStorage.removeItem('user');
                router.push('/rh/login');
            } else {
                setError(data.message || (data.errors && data.errors[0]?.message) || 'Erro ao criar vaga.');
            }

        } catch (err) {
            console.error('Erro de rede ao criar vaga:', err);
            setError('Ocorreu um erro de rede. Verifique se o backend está ativo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Criar Nova Vaga</h1>
                <ButtonStyled 
                    backgroundColor="#6c757d"
                    color="#fff"
                    borderRadius="4px"
                    height="40px"
                    onClick={() => router.push('/rh/dashboard')}
                >
                    Voltar ao Painel
                </ButtonStyled>
            </header>

            <div className={styles.formCard}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <label htmlFor="titulo" className={styles.label}>Título da Vaga</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        className={styles.input}
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />

                    <label htmlFor="descricao" className={styles.label}>Descrição da Vaga</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        className={styles.textarea}
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />

                    <label htmlFor="salario" className={styles.label}>Salário (Opcional)</label>
                    <input
                        type="number"
                        id="salario"
                        name="salario"
                        className={styles.input}
                        value={formData.salario}
                        onChange={handleChange}
                        step="0.01"
                        disabled={loading}
                    />

                    <label htmlFor="localizacao" className={styles.label}>Localização</label>
                    <input
                        type="text"
                        id="localizacao"
                        name="localizacao"
                        className={styles.input}
                        value={formData.localizacao}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />

                    <label htmlFor="tipoContrato" className={styles.label}>Tipo de Contrato</label>
                    <select
                        id="tipoContrato"
                        name="tipoContrato"
                        className={styles.select}
                        value={formData.tipoContrato}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Selecione o Tipo</option>
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Estagio">Estágio</option>
                        <option value="Temporario">Temporário</option>
                    </select>

                    {error && <p className={styles.error}>{error}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}

                    <ButtonStyled
                        type="submit"
                        backgroundColor="#28a745"
                        color="#fff"
                        borderRadius="4px"
                        height="45px"
                        disabled={loading}
                    >
                        {loading ? 'Criando Vaga...' : 'Criar Vaga'}
                    </ButtonStyled>
                </form>
            </div>
        </div>
    );
}