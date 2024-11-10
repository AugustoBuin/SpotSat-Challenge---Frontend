# SpotSat Frontend

Este projeto é o frontend do SpotSat, uma aplicação web para manipulação de polígonos em um mapa interativo. O frontend permite criar, editar, excluir e salvar polígonos, bem como visualizar suas propriedades.

## Requisitos

Certifique-se de ter instalado os seguintes itens antes de começar:

- [Node.js](https://nodejs.org/) (versão recomendada: 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd seu-repositorio
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```
    ou, se estiver usando `yarn`:

    ```bash
    yarn install
    ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto para armazenar variáveis de ambiente, se necessário:

    ```plaintext
    REACT_APP_API_URL=http://localhost:3000
    ```

    Substitua `http://localhost:3000` pela URL da sua API backend.

2. (Opcional) Altere o token JWT, se necessário. O token é armazenado no `localStorage` e é utilizado automaticamente pelo sistema ao fazer requisições autenticadas para a API backend.

## Executando o Projeto

Para iniciar o frontend em modo de desenvolvimento, use o seguinte comando:

```bash
npm start
``` 

ou, com yarn:

```bash
yarn start
```

O projeto estará disponível em http://localhost:3001.
