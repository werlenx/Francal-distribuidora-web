# Francal Distribuidora - Site Institucional

Site institucional da Francal Distribuidora desenvolvido em Next.js com TypeScript.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização modular
- **@tanstack/react-query** - Gerenciamento de estado
- **Zod** - Validação de formulários

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas do Next.js (App Router)
│   ├── contato/           # Página de contato
│   ├── produtos/          # Página de produtos
│   ├── sobre/             # Página sobre nós
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho com navegação
│   └── Footer.tsx         # Rodapé
└── lib/                   # Utilitários e configurações
    ├── providers.tsx      # Provider do React Query
    └── validations.ts     # Esquemas de validação Zod
```

## 🎯 Páginas Implementadas

### 1. Home (/)
- Banner com slogan institucional
- Destaques dos principais serviços
- CTAs para produtos e contato

### 2. Sobre Nós (/sobre)
- História da empresa (fundada em 1995)
- Missão, valores e diferenciais
- Informações sobre frota e cobertura

### 3. Nossos Produtos (/produtos)
- Categorias de produtos (alimentos, bebidas, higiene)
- Marcas parceiras
- Diferenciais competitivos

### 4. Contato (/contato)
- Informações de contato
- Formulário validado com Zod
- Endereços e telefones

## 🛠️ Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo desenvolvimento:
```bash
npm run dev
```

3. Acessar no navegador:
```
http://localhost:3000
```

## ✨ Funcionalidades

- ✅ Design responsivo com CSS Modules
- ✅ Navegação fixa no header
- ✅ Formulário de contato com validação
- ✅ Estrutura preparada para expansão
- ✅ SEO otimizado
- ✅ TypeScript para maior segurança

## 🎨 Design

- Design institucional limpo e profissional
- Cores principais: azul (#2563eb) e cinza
- Layout responsivo para mobile e desktop
- Componentes reutilizáveis com CSS Modules
- Estilos modulares e organizados

## 📝 Próximos Passos

O projeto está estruturado para facilitar futuras expansões como:
- Blog institucional
- Área de clientes
- Sistema de orçamentos
- Integração com APIs