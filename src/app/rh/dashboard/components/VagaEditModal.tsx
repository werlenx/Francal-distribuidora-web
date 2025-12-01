// src/app/rh/dashboard/components/VagaEditModal.tsx
'use client';
import { useState, useEffect } from 'react';
import styles from './VagaEditModal.module.css';
import ButtonStyled from '@/components/ButtonStyled/index';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface Vaga {
    id: number;
    titulo: string;
    localizacao: string | null;
    status: string;
    dataPublicacao: string;
    descricao?: string;
    salario?: number | null;
    tipoContrato?: string;
}

interface VagaEditModalProps {
    vaga: Vaga | null; // 💡 Agora pode ser NULL para CRIAR
    isCreating: boolean; // 💡 NOVO: Flag para saber se é criação
    onClose: () => void;
    onSuccess: (newVaga: Vaga) => void; // 💡 onUpdate mudou para onSuccess
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const initialFormData = {
    titulo: '',
    descricao: '',
    localizacao: '',
    salario: '',
    tipoContrato: 'CLT', // Valor padrão para select
};

export default function VagaEditModal({ vaga, isCreating, onClose, onSuccess }: VagaEditModalProps) {
    const router = useRouter();
    
    // 💡 Usa o 'vaga' existente ou 'initialFormData'
    const [formData, setFormData] = useState({
        titulo: vaga?.titulo || initialFormData.titulo,
        descricao: vaga?.descricao || initialFormData.descricao,
        localizacao: vaga?.localizacao || initialFormData.localizacao,
        salario: vaga?.salario !== null && vaga?.salario !== undefined ? String(vaga.salario) : initialFormData.salario,
        tipoContrato: vaga?.tipoContrato || initialFormData.tipoContrato,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.titulo.trim() || !formData.descricao.trim() || !formData.localizacao.trim() || !formData.tipoContrato.trim()) {
            return 'Preencha todos os campos obrigatórios.';
        }
        return null;
    };
    
    const titleText = isCreating ? 'Criar Nova Vaga' : `Editar Vaga: ${vaga?.titulo}`;

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Isso garante que o navegador veja o elemento com opacidade 0 antes de aplicar opacidade 1
        requestAnimationFrame(() => setIsActive(true));
        
        // Limpeza: Adicionar escuta para fechar com ESC, se desejar
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);

    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        const validationError = validateForm();
        if (validationError) return setError(validationError);

        const token = Cookies.get('auth-token');
        if (!token) return router.push('/rh/login');

        try {
            setLoading(true);
            
            const updatePayload = {
                ...formData,
                salario: formData.salario ? parseFloat(formData.salario) : null,
            };

            const method = isCreating ? 'POST' : 'PUT';
            // 💡 ROTA E MÉTODO CONDICIONAL
            const url = isCreating ? `${API_BASE_URL}/vagas` : `${API_BASE_URL}/vagas/${vaga!.id}/update`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatePayload),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Para edição: o backend retorna a vaga atualizada. Para criação, retorna a vaga recém-criada.
                const finalVaga: Vaga = {
                    ...vaga, // mantém dados antigos se for edição
                    ...responseData, // dados novos
                    salario: updatePayload.salario
                };
                
                onSuccess(finalVaga); 
                onClose(); 
            } else {
                setError(responseData.error || `Falha ao ${isCreating ? 'criar' : 'atualizar'} a vaga.`);
            }
        } catch (err) {
            setError('Erro de rede ao salvar as alterações.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className={`${styles.modalBackdrop} ${isActive ? styles.modalActive : ''}`} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>{titleText}</h2>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    
                    {/* TÍTULO */}
                    <label htmlFor="titulo" className={styles.modalLabel}>Título</label>
                    <input type="text" id="titulo" name="titulo" className={styles.modalInput} value={formData.titulo} onChange={handleChange} required disabled={loading} />

                    {/* DESCRIÇÃO */}
                    <label htmlFor="descricao" className={styles.modalLabel}>Descrição</label>
                    <textarea id="descricao" name="descricao" className={styles.modalTextarea} value={formData.descricao} onChange={handleChange} required disabled={loading} />

                    {/* LOCALIZAÇÃO */}
                    <label htmlFor="localizacao" className={styles.modalLabel}>Localização</label>
                    <input type="text" id="localizacao" name="localizacao" className={styles.modalInput} value={formData.localizacao} onChange={handleChange} required disabled={loading} />

                    {/* SALÁRIO */}
                    <label htmlFor="salario" className={styles.modalLabel}>Salário (R$)</label>
                    <input type="number" id="salario" name="salario" className={styles.modalInput} value={formData.salario} onChange={handleChange} step="0.01" disabled={loading} />
                    
                    {/* TIPO CONTRATO */}
                    <label htmlFor="tipoContrato" className={styles.modalLabel}>Tipo de Contrato</label>
                    <select id="tipoContrato" name="tipoContrato" className={styles.modalInput} value={formData.tipoContrato} onChange={handleChange} required disabled={loading}>
                        <option value="">Selecione o Tipo de Contrato</option> 
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ</option>
                        <option value="Estagio">Estágio</option>
                        <option value="Temporario">Temporário</option>
                    </select>

                    {error && <p className={styles.modalError}>{error}</p>}

                    <div className={styles.modalActions}>
                        <ButtonStyled type="button" onClick={onClose} backgroundColor="#6c757d" color="#fff" width="100px" height="40px">
                            Cancelar
                        </ButtonStyled>
                        <ButtonStyled type="submit" backgroundColor="#007bff" color="#fff" width="120px" height="40px" disabled={loading}>
                            {loading ? 'Salvando...' : (isCreating ? 'Criar Vaga' : 'Atualizar')}
                        </ButtonStyled>
                    </div>
                </form>
            </div>
        </div>
    );
}