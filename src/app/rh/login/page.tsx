// src/app/rh/login/page.tsx
'use client';
import { useState } from 'react';
import styles from './page.module.css'; 
import ButtonStyled from '@/components/ButtonStyled/index'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        if (!email || !password) {
            return 'Email e senha são obrigatórios.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Por favor, insira um email válido.';
        }
        if (password.length < 6) {
            return 'A senha deve ter pelo menos 6 caracteres.';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const validationError = validateInputs();
        if (validationError) {
            return setError(validationError);
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/auth/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token && data.user) {
                    // Cookies.set('auth-token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });
                    const  cookieOptions = {expires: 1, sameSite: 'Strict' } as any; 
                    // localStorage.setItem('user', JSON.stringify(data.user));
                    if(typeof window !== 'undefined' && window.location.protocol === 'https:'){
                        cookieOptions.secure = true; 
                    } 
                    Cookies.set('auth-token', data.token, cookieOptions);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                
                // alert('Login bem-sucedido! Bem-vindo(a) ao painel RH.');
                // router.push('http://localhost:5000/rh/dashboard');
                await router.push('/rh/dashboard'); 
                return
            } else {
                setError(data.message || 'Falha no login. Credenciais inválidas.');
            }

        } catch (err) {
            setError('Ocorreu um erro de rede. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Login RH</h1>
                
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <label className={styles.label}>Senha</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <ButtonStyled
                        type="submit"
                        backgroundColor="#007bff"
                        color="#fff"
                        borderRadius="4px"
                        height="45px"
                        disabled={loading}
                    >
                        {loading ? 'Verificando...' : 'Entrar'}
                    </ButtonStyled>
                </form>
            </div>
        </div>
    );
}