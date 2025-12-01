// src/app/vagas/components/VagasDisponiveis.tsx
import styles from '../page.module.css';
import miniStyles from './VagasDisponiveis.module.css'; 
import ButtonStyled from '@/components/ButtonStyled'; 
import { Vaga } from '../../../services/vaga'; 
import { FaMapMarkerAlt } from 'react-icons/fa';

interface VagasDisponiveisProps {
    vagas: Vaga[];
    onViewDetails: (vaga: Vaga) => void;
    onCandidatarClick: (vaga: Vaga) => void; 
    selectedVagaId?: string | number | null; // Recebe o ID da vaga selecionada
}

export default function VagasDisponiveis({ vagas, onViewDetails, onCandidatarClick, selectedVagaId }: VagasDisponiveisProps) {
    return (
        <div className={miniStyles.vagasGrid}>
            {vagas.map(vaga => { // 💡 CORREÇÃO: Abre bloco explícito com {
                const isActive = vaga.id === selectedVagaId; // Declaração de const válida aqui
                
                return ( // 💡 CORREÇÃO: Adiciona return explícito
                    <div 
                        key={vaga.id} 
                        className={`${miniStyles.vagaMiniCard} ${isActive ? miniStyles.vagaMiniCardActive : ''}`} 
                        onClick={() => onViewDetails(vaga)} 
                    > 
                        <h3 className={miniStyles.vagaTitle}>{vaga.titulo}</h3>
                        <p className={miniStyles.vagaArea}>{vaga.tipoContrato || 'Não informado'}</p>
                        <p className={miniStyles.vagaLocation}><FaMapMarkerAlt /> {vaga.localizacao}</p>
                        {/* Tags Adicionais de Contrato, etc., podem ser adicionadas aqui */}
                    </div>
                );
            })}
        </div>
    );
}