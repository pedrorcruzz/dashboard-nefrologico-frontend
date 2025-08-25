# Dashboard Nefrológico Pediátrico - CESMAC

Sistema de gerenciamento e monitoramento de dados nefrológicos pediátricos desenvolvido para o CESMAC (Centro Universitário).

## 🏥 Sobre o Projeto

Este dashboard foi desenvolvido para auxiliar profissionais de saúde no acompanhamento e análise de dados relacionados à nefrologia pediátrica, incluindo:

- **Gestão de Pacientes**: Controle de pacientes ativos e novos
- **Monitoramento de Exames**: Acompanhamento de exames básicos e especializados
- **Métricas de Qualidade**: Indicadores de performance e satisfação
- **Relatórios**: Geração de relatórios médicos e estatísticos

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Roteamento**: TanStack Router
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: React Icons
- **Build Tool**: Vite
- **Package Manager**: Bun

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ ou Bun
- Git

### Configuração

```bash
git clone <repository-url>
cd dashboard-nefrologico-frontend

bun install

cp .env.example .env
```

### Desenvolvimento

```bash
bun dev
```

### Build de Produção

```bash
bun run build
bun run preview
```

## 🔧 Variáveis de Ambiente

```bash
VITE_MAINTENANCE_MODE=false
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── cards/
│   ├── layout/
│   └── ui/
├── hooks/
├── routes/
├── styles/
└── utils/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para o CESMAC e está sob licença institucional.

---

**Desenvolvido com ❤️ para o CESMAC**
