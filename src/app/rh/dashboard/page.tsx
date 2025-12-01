'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import ButtonStyled from '@/components/ButtonStyled/index'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import VagaEditModal from './components/VagaEditModal'

//icos
import { FaEdit, FaChevronCircleDown, FaWindowClose, FaChevronCircleUp } from "react-icons/fa";
import { GoIssueReopened } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";

interface Vaga {
    id: number
    titulo: string
    localizacao: string | null
    status: string
    dataPublicacao: string
    descricao?: string
    salario?: null | number
    tipoContrato?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export default function DashboardRH() {
    const router = useRouter()
    const [vagas, setVagas] = useState<Vaga[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [filter, setFilter] = useState<'todas' | 'abertas' | 'fechadas'>('todas')
    
    // NOVO ESTADO: Controla qual modal abrir e se é criação ou edição
    const [modalState, setModalState] = useState<{ vaga: Vaga | null, isCreating: boolean }>({ vaga: null, isCreating: false });


    const toggleDetails = (id: number) => { setExpandedId(expandedId === id ? null : id)}
    const openEditModal = (vaga: Vaga) => { setModalState({ vaga, isCreating: false }) }
    const openCreateModal = () => { setModalState({ vaga: null, isCreating: true }) }


    // *** REMOVIDO: handleLogout ***

    const handleDeleteVaga = async (vagaId: number) => {
        if (!confirm(`Tem certeza que deseja fechar a vaga ID ${vagaId}?`)) return;

        const token = Cookies.get('auth-token')
        // Substituído o handleLogout por redirecionamento direto, caso a verificação falhe
        if (!token) {
            router.push('/rh/login'); 
            return;
        }

        try {
            setLoading(true)

            const response = await fetch(`${API_BASE_URL}/vagas/${vagaId}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                setVagas(prev => prev.map(
                    v => v.id === vagaId ? { ...v, status: 'Fechada' } : v
                ));
                setExpandedId(null);
            } else {
                setError('Falha ao fechar vaga.')
            }
        } catch (err) {
            setError('Erro de rede ao fechar vaga.')
        } finally {
            setLoading(false);
        }
    };

    const handleReabrirVaga = async (vagaId: number) => {
        const token = Cookies.get('auth-token')
        // Substituído o handleLogout por redirecionamento direto, caso a verificação falhe
        if (!token) {
            router.push('/rh/login');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/vagas/${vagaId}/reabrir`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                setVagas(prev => prev.map(
                    v => v.id === vagaId ? { ...v, status: 'Aberta' } : v
                ));
            } else {
                setError('Erro ao reabrir vaga.')
            }
        } catch (err) {
            setError('Erro de rede ao reabrir vaga.')
        } finally {
            setLoading(false);
        }
    };

    // FUNÇÃO ÚNICA PARA TRATAR CRIAÇÃO E EDIÇÃO
    const handleVagaSuccess = (resultVaga: Vaga) => {
        if (modalState.isCreating) {
            // CRIAÇÃO: Adiciona a nova vaga no topo da lista
            const newVagaWithDefaults: Vaga = { 
                ...resultVaga,
                localizacao: resultVaga.localizacao || 'Não informado',
                status: resultVaga.status || 'Aberta',
                dataPublicacao: resultVaga.dataPublicacao || new Date().toISOString()
            };
            setVagas(prevVagas => [newVagaWithDefaults, ...prevVagas]);
        } else {
            // EDIÇÃO: Atualiza a vaga existente na lista
            setVagas(prevVagas => prevVagas.map(vaga =>
                vaga.id === resultVaga.id ? resultVaga : vaga
            ));
        }
        setModalState({ vaga: null, isCreating: false }); // Fecha o modal
    }


    useEffect(() => {
        const token = Cookies.get('auth-token')
        
        if (!token) {
            router.push('/rh/login')
            return
        }

        const fetchVagas = async (jwtToken: string) => {
            try {
                const response = await fetch(`${API_BASE_URL}/vagas`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`, 
                    },
                });

                const data = await response.json()

                if (response.ok) {
                    setVagas(data);
                } else {
                    setError(data.message || 'Erro ao carregar vagas.');
                }
            } catch (err) {
                setError('Erro de rede ao buscar vagas.')
            } finally {
                setLoading(false)
            }
        };

        fetchVagas(token)
    }, [router])


    if (loading) {
        return <div className={styles.loading}>Carregando painel...</div>
    }

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Painel de Gestão de Vagas</h1>
                <div className={styles.headerActions}>
                    {/* BOTÃO CRIAÇÃO: Chama o modal de criação */}
                    {/* *** REMOVIDO: Botão Sair *** */}
                </div>
            </header>

            <div className={styles.buttons}>
                <div className={styles.filters}>
                    <ButtonStyled 
                        className={filter === 'abertas' ? styles.filterActive : styles.filter}
                        onClick={() => setFilter('abertas')}
                    >
                        Abertas
                    </ButtonStyled>
                    <ButtonStyled 
                        className={filter === 'fechadas' ? styles.filterActive : styles.filter}
                        onClick={() => setFilter('fechadas')}
                    >
                        Fechadas
                    </ButtonStyled>
                    <ButtonStyled 
                        className={filter === 'todas' ? styles.filterActive : styles.filter}
                        onClick={() => setFilter('todas')}
                    >
                        Todas
                    </ButtonStyled>
                </div>
                <ButtonStyled 
                    hoverBackgroundColor='#c0ddfcff'
                    color="#fff"
                    onClick={openCreateModal} 
                    title="Criar Nova Vaga"
                    className={styles.createButton}
                >
                    <IoMdAddCircle size={23} padding-left={20}/>Criar Nova Vaga
                </ButtonStyled>
                

            </div>



            <div className={styles.vagasList}>
                {error && <p className={styles.error}>{error}</p>}
                
                {vagas.length === 0 && !error ? (
                    <p className={styles.noData}>Nenhuma vaga encontrada.</p>
                ) : (
                    <>
                        <div className={styles.gridHeader}>
                            <span>Título da Vaga</span>
                            <span>Localização</span>
                            <span>Status</span>
                            <span>Publicação</span>
                            <span>Ações</span>
                        </div>
                        
                        {vagas
                            .filter(v =>
                                filter === 'todas' ? true :
                                filter === 'abertas' ? v.status === 'Aberta' :
                                v.status === 'Fechada'
                            )
                            .map((vaga) => (
                                <div key={vaga.id} className={styles.vagaContainer}>
                                    
                                    <div className={styles.vagaItem}>
                                        <span className={styles.vagaTitle}>{vaga.titulo}</span>
                                        <span>{vaga.localizacao || 'Não informado'}</span>
                                        <span className={vaga.status === 'Aberta' ? styles.vagaStatusOpen : styles.vagaStatusClosed}>
                                            {vaga.status}
                                        </span>
                                        <span>{new Date(vaga.dataPublicacao).toLocaleDateString()}</span>

                                        <div className={styles.actions}>

                                            <ButtonStyled 
                                                color="#007bff" 
                                                width="70px" 
                                                height="30px" 
                                                fontSize="1.5rem"
                                                backgroundColor='transparent'
                                                title='Editar Vaga'
                                                onClick={() => openEditModal(vaga)} 
                                            >
                                                <FaEdit />
                                            </ButtonStyled>

                                            <ButtonStyled 
                                                hoverBackgroundColor='transparent'
                                                backgroundColor='transparent'
                                                color="#007bff" 
                                                width="70px" 
                                                height="30px" 
                                                fontSize="1.3rem"
                                                title={expandedId === vaga.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                                                onClick={() => toggleDetails(vaga.id)}
                                            >
                                                {expandedId === vaga.id ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
                                            </ButtonStyled>

                                            {/* Fechar ou Reabrir */}
                                            {vaga.status === 'Aberta' ? (
                                                <ButtonStyled 
                                                    backgroundColor="transparent"
                                                    hoverBackgroundColor='transparent'
                                                    hoverColor='#dc3545'
                                                    color="#dc3545"
                                                    width="70px" 
                                                    height="30px" 
                                                    fontSize="1.3rem"
                                                    title='Fechar Vaga'
                                                    onClick={() => handleDeleteVaga(vaga.id)}
                                                >
                                                    <FaWindowClose />
                                                </ButtonStyled>
                                            ) : (
                                                <ButtonStyled 
                                                    hoverBackgroundColor='transparent'
                                                    backgroundColor='transparent'
                                                    color="#266117ff"
                                                    width="70px" 
                                                    height="30px" 
                                                    fontSize="1.5em"
                                                    title='Reabrir Vaga'
                                                    onClick={() => handleReabrirVaga(vaga.id)}
                                                >
                                                <GoIssueReopened />
                                                </ButtonStyled>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* PAINEL DE DETALHES COM TRANSIÇÃO */}
                                    <div 
                                        className={`${styles.detailsPanel} ${expandedId === vaga.id ? styles.detailsOpen : styles.detailsClosed}`}
                                    >
                                        <h3 className={styles.detailsTitle}>Descrição Completa</h3>
                                        <p className={styles.detailsDescription}>
                                            {vaga.descricao || 'Descrição não fornecida.'}
                                        </p>
                                        
                                        <div className={styles.detailsFooter}>
                                            <ButtonStyled 
                                                color="#28a745" 
                                                border="1px solid #28a745" 
                                                width="180px" 
                                                height="35px" 
                                                fontSize="0.9rem" 
                                                href={`/rh/candidaturas/${vaga.id}`}
                                            >
                                                Ver Candidaturas
                                            </ButtonStyled>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </>
                )}
            </div>
            
            {/* RENDERIZAÇÃO DO MODAL PARA CRIAÇÃO OU EDIÇÃO */}
            {(modalState.vaga || modalState.isCreating) && (
                <VagaEditModal
                    vaga={modalState.vaga}
                    isCreating={modalState.isCreating}
                    onClose={() => setModalState({ vaga: null, isCreating: false })}
                    onSuccess={handleVagaSuccess}
                />
            )}
        </div>
    );
}