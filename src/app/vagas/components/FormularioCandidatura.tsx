'use client';
import { useState } from 'react';
import styles from './FormularioCandidatura.module.css';
import ButtonStyled from '@/components/ButtonStyled'; 
import { Vaga } from '../../../services/vaga';
import { FaSearch } from "react-icons/fa";


interface FormularioCandidaturaProps {
    onBackClick: () => void;
    vagaSelecionada: Vaga | null;
}

async function fetchEnderecoPorCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Falha na requisição ViaCEP');
        }
        const data = await response.json();

        // Verifica se o CEP foi encontrado (ViaCEP retorna 'erro: true' se não encontrar)
        if (data.erro) {
            return null; 
        }

        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade, // ViaCEP usa 'localidade'
            estado: data.uf,          // ViaCEP usa 'uf'
        };
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        return null;
    }
}

export default function FormularioCandidatura(
        { onBackClick, vagaSelecionada }: FormularioCandidaturaProps
    ) {
    const cargoInicial = vagaSelecionada ? `${vagaSelecionada.titulo} - ${vagaSelecionada.localizacao}` : '';
    
    const [formData, setFormData] = useState({
        cargo: cargoInicial,
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
    });
    
    const handleCepSearch = async () => {
        const cepLimpo = formData.cep.replace(/\D/g, '');
        if (cepLimpo.length === 8) {
            const endereco = await fetchEnderecoPorCep(cepLimpo);
            if (endereco) {
                setFormData(prev => ({
                    ...prev,
                    logradouro: endereco.logradouro,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    estado: endereco.estado,
                }));
            }
        }
    };

    const formatCep = (value: string) => {
        const cleaned = value.replace(/\D/g, ''); // Remove tudo que não for dígito
        if (cleaned.length > 5) {
            // Insere o hífen após o 5º dígito
            return cleaned.slice(0, 5) + '-' + cleaned.slice(5, 8);
        }
        return cleaned;
    };

    const handleCepChange = (value: string) => {
        setFormData({...formData, cep: value});
    };

    return (
        <>
            
            <div className={styles.formularioWrapper}>
                <div className={styles.formularioCard}>
                    <h2 className={styles.formularioTitle}>Formulário de Candidatura</h2> 

                    <form className={styles.vagasForm}>
                        
                        {/* CAMPO: FUNÇÃO PRETENDIDA (Pré-preenchido) */}
                        <label className={styles.formLabel}>FUNÇÃO PRETENDIDA</label>
                        <input 
                            type="text" 
                            className={styles.formInput} 
                            value={cargoInicial}
                            readOnly
                            placeholder="-- SELECIONA O CARGO PARA A VAGADA QUE SEJA SE CANDIDATAR PRETENDIDA"
                        />

                        {/* DEMAIS CAMPOS PESSOAIS (Nome, Telefone, Mensagem) */}
                        <label className={styles.formLabel}>NOME *</label>
                        <input type="text" className={styles.formInput} required />
                        
                        <label className={styles.formLabel}>TELEFONE *</label>
                        <input type="tel" className={styles.formInput} required />

                        <label className={styles.formLabel}>MENSAGEM</label>
                        <textarea className={styles.formTextarea} rows={4} />

                        <div className={styles.enderecoGrid}>
                            
                            <div className={styles.cepContainer}>
                                <label className={styles.formLabel}>CEP *</label>
                                <div className={styles.cepInputGroup}>
                                    <input 
                                        type="text" 
                                        className={styles.formInput} 
                                        value={formData.cep}
                                        onChange={(e) => setFormData({...formData, cep: e.target.value})}
                                        required 
                                        maxLength={9}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.cepSearchButton}
                                        onClick={handleCepSearch}
                                        disabled={formData.cep.length < 8}
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.logradouroContainer}>
                                <label className={styles.formLabel}>Logradouro *</label>
                                <input 
                                    type="text" 
                                    className={styles.formInput} 
                                    value={formData.logradouro} 
                                    onChange={(e) => setFormData({...formData, logradouro: e.target.value})}
                                    required />
                            </div>
                            
                            <div className={styles.bairroContainer}>
                                <label className={styles.formLabel}>Bairro *</label>
                                <input 
                                    type="text" 
                                    className={styles.formInput} 
                                    value={formData.bairro} 
                                    onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                                    required />
                            </div>

                            <div className={styles.cidadeContainer}>
                                <label className={styles.formLabel}>Cidade *</label>
                                <input type="text" className={styles.formInput} value={formData.cidade} readOnly required />
                            </div>
                            
                            <div className={styles.estadoContainer}>
                                <label className={styles.formLabel}>Estado *</label>
                                <input type="text" className={styles.formInput} value={formData.estado} readOnly required />
                            </div>
                            
                        </div>


                        {/* ANEXAR CURRÍCULO */}
                        <div className={styles.anexarCurriculo}>
                            <ButtonStyled 
                                backgroundColor="#007bff" 
                                color="#fff" 
                                width="150px"
                                height="40px"
                                fontSize="0.9rem"
                            >
                                Anexar Currículo ↑
                            </ButtonStyled>
                            <span className={styles.fileStatus}>Nenhum arquivo selecionado</span>
                            <p className={styles.tamanhoMaximo}>Tamanho máximo 50 MB</p>
                        </div>
                        
                        <div className={styles.formActions}>
                            {/* Botão Final de Submissão */}
                            <ButtonStyled 
                                backgroundColor="#007bff" 
                                color="#fff" 
                                width="150px"
                                height="40px"
                                fontSize="0.9rem"
                                type="submit" 
                            >
                                Candidatar-se
                            </ButtonStyled>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}