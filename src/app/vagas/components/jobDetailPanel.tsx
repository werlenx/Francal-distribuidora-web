// src/app/vagas/components/JobDetailPanel.tsx
import detailStyles from './jobDetailPanel.module.css';
import ButtonStyled from '@/components/ButtonStyled';
import FormularioCandidatura from './FormularioCandidatura';
import { Vaga } from '../../../services/vaga'; 
import { FaMapMarkerAlt, FaFileContract, FaRegBuilding } from 'react-icons/fa';

import { MdArrowBackIosNew } from "react-icons/md";


interface JobDetailPanelProps {
    vaga: Vaga | null;
    vagaToCandidatar: Vaga | null;
    onClose: () => void;
    onCandidatarClick: (vaga: Vaga) => void; 
    onBackToDetails: () => void;
}

export default function JobDetailPanel({ vaga, vagaToCandidatar, onClose, onCandidatarClick, onBackToDetails }: JobDetailPanelProps) {
    
    // NENHUMA LÓGICA DE RETURN NULL/POSITION FIXED AQUI
    if (!vaga) return null; 

    const isCandidating = !!vagaToCandidatar;

    return (
        <div className={detailStyles.detailContentWrapper}> 
            
            {/* 1. Visão de Detalhes (Padrão) */}
            {!isCandidating && (
                <div className={detailStyles.detailContent}>
                    
                    {/* Cabeçalho da Vaga (conforme a imagem) */}
                    <div className={detailStyles.header}>
                        <div className={detailStyles.vagaTitleContainer}>
                            <h2 className={detailStyles.vagaTitle}>{vaga.titulo}</h2>
                        </div>
                        
                        {/* Tags de Localização e Contrato */}
                        <div className={detailStyles.tagContainer}>
                            <span className={detailStyles.tag}><FaMapMarkerAlt /> {vaga.localizacao}</span>
                            <span className={detailStyles.tag}><FaFileContract /> {vaga.tipoContrato || 'CLT'}</span>
                        </div>
                    </div>
                    
                    {/* Descrição Detalhada */}
                    <div className={detailStyles.body}>
                        <p className={detailStyles.descriptionHeader}>da vaga</p>
                        <p className={detailStyles.descriptionText}>{vaga.descricao || 'Descrição não disponível.'}</p>
                        
                        <p className={detailStyles.descriptionHeader}>requisitos</p>
                        <p className={detailStyles.descriptionText}>
                            {/* Requisitos viriam separados, mas por enquanto usamos a descrição como placeholder */}
                            {vaga.descricao} 
                        </p>
                    </div>

                    {/* Footer com Botão Candidatar-se */}
                    <div className={detailStyles.footer}>
                        <ButtonStyled 
                            backgroundColor="#007bff" 
                            color="#fff" 
                            width="200px" 
                            height="45px" 
                            fontSize="1rem"
                            onClick={() => onCandidatarClick(vaga)} 
                        >
                            Candidatar-se
                        </ButtonStyled>
                    </div>
                </div>
            )}

            {/* 2. Visão de Formulário de Candidatura */}
            {isCandidating && (
                <div className={detailStyles.formContainer}>
                    {/* Botão de voltar (para JobDetailPanel) */}
                    <ButtonStyled 
                        backgroundColor="#ccc"
                        color="#333"
                        width="150px"
                        height="40px"
                        onClick={onBackToDetails}
                        style={{ marginBottom: '15px' }}
                    >
                        <MdArrowBackIosNew />
                    </ButtonStyled>

                    <FormularioCandidatura
                        vagaSelecionada={vagaToCandidatar}
                        onBackClick={onBackToDetails}
                    />
                </div>
            )}
        </div>
    );
}