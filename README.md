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

## 🎨 Design System

O projeto utiliza um sistema de cores personalizado definido em CSS custom properties:

- **Cores Primárias**: Azul (#0171be) e Amarelo (#fcc730)
- **Cores de Status**: Sucesso, erro, warning e info
- **Componentes**: Cards, botões e filtros com design moderno
- **Responsividade**: Layout adaptável para mobile, tablet e desktop

## 📱 Funcionalidades

### Dashboard Principal

- **KPIs**: Indicadores principais de pacientes e exames
- **Gráficos**: Evolução de pacientes e distribuição de exames
- **Métricas**: Tempo de atendimento e satisfação do paciente
- **Filtros**: Períodos e tipos de exames

### Sistema de Manutenção

- **Modo de Manutenção**: Ativado via variável de ambiente
- **Páginas de Erro**: Tratamento elegante de erros 404 e 500
- **Layout Responsivo**: Header e footer condicionais

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

## 🎯 Componentes Principais

- **KPICard**: Indicadores principais com animações
- **DistributionCard**: Gráficos de distribuição responsivos
- **ChartCard**: Cards para gráficos e visualizações
- **MetricCard**: Métricas com gráficos de barras
- **FilterCards**: Sistema de filtros responsivo
- **MaintenanceMode**: Página de manutenção elegante

## 📊 Dados e Mock

O sistema utiliza dados mock para desenvolvimento, estruturados através da interface `SystemData`:

- **Pacientes**: Total, ativos e novos por mês
- **Exames**: Básicos e especializados com distribuição
- **KPIs**: Variações e métricas de performance
- **Gráficos**: Dados para visualizações e relatórios

## 🚀 Deploy

O projeto está configurado para deploy automático via Netlify, com:

- Build automático a partir do branch principal
- Preview de pull requests
- Deploy de branches de feature

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para o CESMAC e está sob licença institucional.

## 📞 Suporte

Para dúvidas ou suporte técnico, entre em contato com a equipe de desenvolvimento do CESMAC.

---

**Desenvolvido com ❤️ para o CESMAC**
