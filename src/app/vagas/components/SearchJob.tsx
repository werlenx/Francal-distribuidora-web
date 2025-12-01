'use client';
import styles from './SearchJob.module.css';
import ButtonStyled from '@/components/ButtonStyled'; 

interface SearchJobProps {
    handleSearch: (termo: string) => void;
    // CORRIGIDO: Tipos de filtro agora são 'titulo' e 'localizacao'
    handleFilterChange: (tipo: 'titulo' | 'localizacao', valor: string) => void;
    handleClearFilters: () => void;
    // CORRIGIDO: Nomes das propriedades de filtro
    filtrosAtuais: { termo: string, titulo: string, localizacao: string }; 
}

export default function SearchJob({ 
    handleSearch, 
    handleFilterChange, 
    handleClearFilters,
    filtrosAtuais
}: SearchJobProps) {

    return (
        <div className={styles.searchJob}>
            
            <div className={styles.searchJobInputGroup}>
                <input 
                    type="text" 
                    className={styles.searchInput} 
                    placeholder="Buscar vagas..."
                    onChange={(e) => handleSearch(e.target.value)}
                    value={filtrosAtuais.termo}
                />
                <button 
                    className={styles.searchButton} 
                    onClick={() => handleSearch(filtrosAtuais.termo)}
                    type="button" 
                >
                    🔍
                </button>
            </div>
            
            <div className={styles.filterGroup}>
                <select 
                    className={styles.filterSelect}
                    // CORRIGIDO: Passando 'titulo' como tipo de filtro
                    onChange={(e) => handleFilterChange('titulo', e.target.value)}
                    value={filtrosAtuais.titulo}
                >
                    <option value="" disabled hidden>Filtrar por Título</option>
                    <option value="vendedor">Vendedor (A)</option>
                    <option value="motorista">Motorista</option>
                </select>
                <div className={styles.filterChevron}>⌄</div>
            </div>

            <div className={styles.filterGroup}>
                <select 
                    className={styles.filterSelect}
                    // CORRIGIDO: Passando 'localizacao' como tipo de filtro
                    onChange={(e) => handleFilterChange('localizacao', e.target.value)}
                    value={filtrosAtuais.localizacao}
                >
                    <option value="" disabled hidden>Filtrar por Localização</option>
                    <option value="maraba">Marabá/PA</option>
                    <option value="belem">Belém/PA</option>
                </select>
                <div className={styles.filterChevron}>⌄</div>
            </div>

            <ButtonStyled 
                backgroundColor="transparent" 
                color="#666" 
                border="1px solid #ccc"
                borderRadius="4px"
                height="45px"
                fontSize="0.9rem"
                onClick={handleClearFilters}
            >
                Limpar Filtros
            </ButtonStyled>
        </div>
    );
}