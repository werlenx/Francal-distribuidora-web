// src/app/vagas/page.tsx
'use client';
import { useState, useMemo, useEffect } from 'react';
import styles from './page.module.css';
import VagasDisponiveis from './components/VagasDisponiveis'; 
import SearchJob from './components/SearchJob';
import JobDetailPanel from './components/jobDetailPanel'; 
import {getVagas, Vaga} from '../../services/vaga'


export default function Vagas() {
  
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // ESTADO PARA O PAINEL LATERAL: Rastreia a vaga que está aberta
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);

  // ESTADO PARA O FORMULÁRIO: Rastreia se estamos no modo candidatura
  const [vagaToCandidatar, setVagaToCandidatar] = useState<Vaga | null>(null);

  const [filtros, setFiltros] = useState({ termo: '', titulo: '', localizacao: '' });
  
  useEffect(() =>{
    async function loadJobs(){
      try{
        setLoading(true);
        const data = await getVagas();
        setVagas(data)
        
      }catch(error){
        console.error("falha ao carregar dados: ", error)
        setError("Não foi possível carregar as vagas")
        
      }finally{setLoading(false)}
    }
    loadJobs() 
  },[])
  
  
  const handleClearFilters = () => {
    setFiltros({ termo: '', titulo: '', localizacao: '' });
  };
  
  const handleSearch = (termo: string) => {
    if (termo === 'trigger') return;
    setFiltros(prev => ({ ...prev, termo }));
  };
  
  const handleFilterChange = (tipo: 'titulo' | 'localizacao', valor: string) => {
      setFiltros(prev => ({ ...prev, [tipo]: valor }));
  };

  const vagasFiltradas = useMemo(() => {
    const termoBusca = filtros.termo ? filtros.termo.toLowerCase().trim() : '';
    const tituloFiltro = filtros.titulo ? filtros.titulo.toLowerCase() : '';
    const localizacaoFiltro = filtros.localizacao ? filtros.localizacao.toLowerCase() : '';
    
    if (!termoBusca && !tituloFiltro && !localizacaoFiltro) { 
      return vagas;
    }
    
    return vagas.filter(vaga => {
      const termoMatch = !termoBusca || (
        vaga.titulo.toLowerCase().includes(termoBusca) ||
        vaga.localizacao.toLowerCase().includes(termoBusca)
      );
      
      const tituloMatch = !tituloFiltro || vaga.titulo.toLowerCase().includes(tituloFiltro);
      const localizacaoMatch = !localizacaoFiltro || vaga.localizacao.toLowerCase().includes(localizacaoFiltro);
      
      return termoMatch && tituloMatch && localizacaoMatch;
    });
  }, [vagas, filtros]);
  
  

  const handleViewDetails = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setVagaToCandidatar(null); 
  };
  

  const handleCandidatarClick = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setVagaToCandidatar(vaga);
  };
  
  const handleClosePanel = () => {
    setSelectedVaga(null);
    setVagaToCandidatar(null);
  };
  
  if(loading){
    return <h2>Carregando vagas. . .</h2>
  }

  if(error){
    return <h2> erro: {error}</h2>
  }

    return (
    <div className={selectedVaga ? styles.overflowHidden : ''}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
                Bem vindo ao RH da Francal
            </h1>
        </div>
      </section>
      
      <section className={styles.vagasContainer}>
        
        {/* FILTROS */}
        <SearchJob
            handleSearch={handleSearch}
            handleFilterChange={handleFilterChange} 
            handleClearFilters={handleClearFilters}
            filtrosAtuais={filtros}
        />
        
        {/* NOVO LAYOUT: Container com as duas colunas */ }
        <div className={styles.masterDetailContainer}>
            
            {/* 1. PAINEL ESQUERDO: LISTA DE MINIATURAS (MASTER) */}
            <aside className={styles.masterPanel}>
                <VagasDisponiveis 
                    vagas={vagasFiltradas}
                    onViewDetails={handleViewDetails} 
                    onCandidatarClick={handleCandidatarClick} 
                    selectedVagaId={selectedVaga ? selectedVaga.id : null}
                />
            </aside>
            
            {/* 2. PAINEL DIREITO: DETALHES DA VAGA (DETAIL) */}
            <main className={styles.detailPanel}>
                {selectedVaga ? (
                    <JobDetailPanel
                        vaga={selectedVaga}
                        vagaToCandidatar={vagaToCandidatar}
                        onClose={handleClosePanel} 
                        onCandidatarClick={handleCandidatarClick} 
                        onBackToDetails={() => setVagaToCandidatar(null)}
                    />
                ) : (
                    <div className={styles.detailPlaceholder}>
                        Selecione uma vaga na lateral para ver os detalhes.
                    </div>
                )}
            </main>
        </div>
      </section>
    </div>
  );
}