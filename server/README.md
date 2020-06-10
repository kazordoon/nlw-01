
<h1 align="center">
    <img alt="Ecoleta" title="Ecoleta" src="/.github/ecoleta.svg" width="220px" />
</h1>

## Server

### Instalando as dependências
- NPM: `npm install`
- Yarn: `yarn`  
**OBS:** Se optar por utilizar o npm, remova o arquivo `yarn.lock`

### Configurando as variáveis de ambiente
Copie o arquivo `.env.example` e renomeie a cópia para `.env`. Caso queira fazer uso dos testes, crie uma cópia para `.env.test` também.  
Em seguida, altere o valor das variáveis nos arquivos `.env` e `.env.test` de acordo com o seu ambiente.  
Para ambiente de produção, você irá configurar as variáveis de ambiente manualmente de acordo com sua hospedagem.

### Configurando o banco de dados para desenvolvimento
- Rode as migrations:
	- NPM: `npm run dev:knex:migrate`
	- Yarn: `yarn dev:knex:migrate`
- Rode as seeds:
	- NPM: `npm run dev:knex:seed`
	- Yarn: `yarn dev:knex:seed`

### Configurando o banco de dados para os testes
- Rode as migrations:
	- NPM: `npm run test:knex:migrate`
	- Yarn: `yarn test:knex:migrate`
- Rode as seeds:
	- NPM: `npm run test:knex:seed`
	- Yarn: `yarn test:knex:seed`

### Rodando os testes
- NPM: `npm test`
- Yarn: `yarn test`

### Iniciando o servidor

- NPM: `npm run start:dev`
- Yarn: `yarn start:dev`

### Construindo aplicação para rodar em produção
- NPM: `npm run build`
- Yarn: `yarn build`

### API Endpoints

#### Itens
Action | Path | Parameters | Body | Method |
------ | ---- | ---------- | ---- | ------ |
Listar itens | /items | -- | -- | GET

#### Pontos de coleta
Action | Path | Parameters | Body | Method
------ | ---- | ---------- | ---- | ------ |
Listar pontos de coleta filtrados por UF, Cidade e Itens | /points?uf={uf}&city={city}&items={items} | Query Params (uf, city, items) | -- | GET | Pontos de coleta filtrados
Listar ponto de coleta específico pelo ID | /points/{id} | Route Params (id) | -- | GET
Criar novo ponto de coleta | /points | -- | Um _form-data_ com estes [campos](#points) | POST

### Validação da entrada de dados
**Todos os campos são obrigatórios.**
#### points

- name
	- tipo: string
	- quantidade mínima de carácteres: 2
- email
	- tipo: string
- whatsapp
	- tipo: string
- latitude
	- tipo: number
- longitude
	- tipo: number
- city
	- tipo: string
- uf
	- tipo: string
	- quantidade máxima de carácteres: 2
- items:
	- tipo: string
- image:
	- Uma imagem que seja _jpg_ ou _png_ possuindo menos de 5MB
