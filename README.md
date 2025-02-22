# CobreNix

Sistema de gestão financeira desenvolvido com Angular 17, focado em uma experiência moderna e intuitiva.

## 🚀 Funcionalidades

- 🔐 **Autenticação Segura**
  - Login com validação
  - Persistência de sessão
  - Proteção de rotas

- 🎨 **Interface Moderna**
  - Temas claro/escuro
  - Design responsivo
  - Animações suaves
  - Componentes reutilizáveis

- 🌍 **Internacionalização**
  - Suporte para múltiplos idiomas (PT-BR, EN)
  - Persistência da preferência de idioma

- 📱 **Layout Adaptativo**
  - Menu mobile otimizado
  - Interface desktop amigável
  - Navegação intuitiva

## 🛠️ Tecnologias

- Angular 17
- TypeScript
- SCSS
- NgRx (em breve)
- RxJS
- Angular Material (em breve)

## 📦 Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Angular CLI 17.x

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/luisclaudiorp/cobrenix-app.git
```

2. Instale as dependências:
```bash
cd cobrenix-app
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```

4. Acesse `http://localhost:4200`

## 🔧 Scripts Disponíveis

- `ng serve` - Inicia o servidor de desenvolvimento
- `ng build` - Gera build de produção
- `ng test` - Executa testes unitários
- `ng lint` - Executa linting do código
- `ng e2e` - Executa testes end-to-end

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/           # Serviços e guardas essenciais
│   ├── features/       # Módulos de funcionalidades
│   ├── layouts/        # Layouts da aplicação
│   └── shared/         # Componentes compartilhados
├── assets/
│   ├── i18n/          # Arquivos de tradução
│   └── icons/         # Ícones e imagens
└── environments/      # Configurações por ambiente
```

## 🔐 Autenticação

O sistema utiliza autenticação baseada em token JWT com:
- Interceptor para requisições HTTP
- Guard para proteção de rotas
- Persistência de sessão
- Refresh token (em breve)

## 🎨 Temas

Suporte a temas claro e escuro com:
- Transições suaves
- Persistência da preferência
- Cores consistentes
- Contraste adequado

## 🌐 Internacionalização

Suporte completo para:
- Português (PT-BR)
- Inglês (EN)
- Novos idiomas podem ser facilmente adicionados

## 📱 Responsividade

Design responsivo com:
- Menu mobile otimizado
- Layouts adaptáveis
- Breakpoints consistentes
- Experiência móvel aprimorada

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Convenções

- **Commits:** Seguimos o padrão Conventional Commits
- **Código:** Utilizamos ESLint e Prettier
- **Branches:** Padrão GitFlow adaptado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Luis Claudio** - [GitHub](https://github.com/luisclaudiorp)

## 🙏 Agradecimentos

- Angular Team
- Contribuidores
- Comunidade Open Source
