# OwlCare
## Autor: Peterson Henrique de Padua

Este projeto tem como objetivo implementar, de forma didática, uma aplicação web inspirada no site PopularPet, acessado em 1/04/2027 às 18:59.

Principais Funcionalidades
Cadastro de Serviços: Cadastrar serviços de petshop, como banho, tosa, vacinas, com status da solicitação.

Cadastro de Clientes (CRUD): Cadastro completo de clientes, permitindo criar, editar, visualizar e excluir informações.

Tecnologias Utilizadas
Frontend: Desenvolvido com HTML, CSS e JavaScript.

Backend: Simulado com uma API Fake utilizando JSON Server e localStorage.

Design das Telas
Figma: Acessar Design

Ajustes Mobile: Em andamento.

Design System
Link para o PDF: [Inserir Link Aqui]

Links Importantes
Site em Produção (GitHub Pages): Acessar Site

GitHub: https://github.com/Pett97/OwlCare-AnimalCare

### Funcionalidades Implementadas
#### RA1 - Utilização de Frameworks CSS
* [X] ID01: Implementação de layout responsivo utilizando o Materialize CSS, garantindo que a página se adapte adequadamente a diferentes dispositivos (mobile e desktop).

* [X] ID02: Uso de Flexbox e Grid Layout para garantir que o layout seja fluido e responsivo em diferentes resoluções.

* [X] ID03: Utilização de componentes prontos, como cards, botões e modais, que oferecem uma interface interativa e agradável.

* [X] ID04: Layout fluido e responsivo utilizando unidades relativas como vw, vh, %, em e rem, em vez de unidades fixas (px).

* [X] ID05: Implementação de animações para transições e feedback visual ao usuário, usando CSS Animations e jQuery.

* [X] ID06: Aplicação de transições personalizadas entre diferentes estados da página, como mudança de cor e exibição de elementos.

* [X] ID07: Aplicação de um Design System consistente com diretrizes de estilo, cores e tipografia, garantindo uma experiência de usuário uniforme.

* [ ] ID08: Uso do Sass para modularizar e organizar o código CSS (Em andamento).

* [X] ID09: Implementação de tipografia responsiva, ajustando o tamanho da fonte de acordo com diferentes tamanhos de tela utilizando media queries.

#### RA2 - Tratamento de Formulários e Validações Customizadas
* [X] ID10: Validação de formulários com exibição de mensagens de erro ou sucesso usando a API de HTML, para garantir dados válidos.

* [X] ID11: Implementação de validação customizada com expressões regulares (REGEX) para garantir o formato adequado de e-mail, telefone, etc.

* [X] ID12: Implementação de elementos de formulário como checkbox, radio buttons e select para facilitar a interação com o usuário.

* [X] ID13: Uso de Web Storage para persistir dados entre sessões de usuário.

#### RA3 - Ferramentas de Desenvolvimento e Qualidade de Código
* [X] ID14: Configuração de ambiente de desenvolvimento com Node.js e NPM.

* [X] ID15: Uso de linters como ESLint para garantir a qualidade e consistência do código.

* [X] ID16: Versionamento de código com Git e GitHub, seguindo boas práticas de gerenciamento de branches.

* [X] ID17: Otimização do código e recursos com minificação de CSS/JS e otimização de imagens.

* [X] ID18: Documentação do projeto no arquivo README.md.

* [X] ID19: Organização dos arquivos do projeto de forma coerente e modular.

#### RA4 - Bibliotecas de Funções e Componentes JavaScript
* [X] ID21: Uso da biblioteca jQuery para manipulação do DOM e aprimoramento da interatividade da aplicação.

* [ ] ID22: Integração com um plugin jQuery (como o jQuery Mask Plugin) para melhorar a funcionalidade da interface (Em andamento).

* [ ] ID23: Uso de bibliotecas de web components como Lit, para criar componentes reutilizáveis e melhorar a modularidade (Em andamento).

* [X] ID24: Uso de Material Web Components para integrar componentes prontos e fornecer funcionalidades específicas.

#### RA5 - Requisições Assíncronas
* [X] ID25: Realização de requisições assíncronas para uma API Fake com Fetch API para persistir dados.

* [X] ID26: Exibição de dados obtidos da API Fake na página web.

### Manual de Execução

* Clonar o repositório:

```
git clone https://github.com/Pett97/OwlCare-AnimalCare.git
```

dentro da pasta do projeto 
```
npm install
```

(Opcional) Instalar o JSON Server globalmente:
```
npm install -g json-server
```

Executar a API Fake (JSON Server):
```
npx json-server db.json
```