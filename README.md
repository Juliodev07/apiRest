# API REST de Produtos

API REST desenvolvida com **Node.js, Express, Prisma e MariaDB/MySQL** para cadastro e gerenciamento de produtos.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- MariaDB/MySQL
- dotenv
- Nodemon

## Estrutura do projeto

```
src/
├── controllers/
│   └── ProdutoController.js
├── databases/
│   └── prisma.js
├── routes/
│   └── ProdutosRoutes.js
├── services/
│   └── ProdutosService.js
└── index.js

prisma/
└── schema.prisma
```

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/Juliodev07/apiRest.git
cd apiRest
```

Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

Crie um arquivo `.env` na raiz do projeto com as informações do banco:

```env
PORT=3000

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

O projeto utiliza Prisma com MariaDB/MySQL.

Depois de configurar o banco e o schema, gere o cliente Prisma:

```bash
npx prisma generate
```

## Executando a API

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível, por padrão, em:

```
http://localhost:3000
```

## Endpoints

### 1. Cadastrar produto

**POST** `/produtos`

Exemplo:

```json
{
  "nome": "Teclado"
}
```

Resposta:

```json
{
  "produto": {
    "id": 1,
    "nome": "Teclado"
  }
}
```

### 2. Listar produtos

**GET** `/produtos`

A listagem possui paginação, ordenação e contagem total.

Parâmetros disponíveis:

- `page`: número da página.
- `pageSize`: quantidade de produtos por página.
- `orderBy`: campo utilizado para ordenar.
- `order`: `asc` ou `desc`.

Exemplo:

```
GET /produtos?page=1&pageSize=10&orderBy=nome&order=asc
```

Campos permitidos para `orderBy`:

- `id`
- `nome`
- `createdAt`
- `updatedAt`

Exemplo de resposta:

```json
{
  "produtos": [
    {
      "id": 1,
      "nome": "Teclado"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10
}
```

### 3. Buscar produto por ID

**GET** `/produtos/:id`

Exemplo:

```
GET /produtos/1
```

Se o produto existir:

```json
{
  "produto": {
    "id": 1,
    "nome": "Teclado"
  }
}
```

Se o produto não existir, a API retorna **404**.

### 4. Atualizar produto

**PUT** `/produtos/:id`

Exemplo:

```
PUT /produtos/1
```

Body:

```json
{
  "nome": "Teclado Mecânico"
}
```

A API valida se o produto existe e se o nome foi informado. Como o campo `nome` é único no banco, nomes duplicados são tratados como erro.

### 5. Remover produto

**DELETE** `/produtos/:id`

Exemplo:

```
DELETE /produtos/1
```

Quando a remoção é realizada com sucesso, a API retorna **204 No Content**.

Se o produto não existir, a API retorna **404**.

## Modelo de Produto

O modelo utilizado pelo Prisma possui:

| Campo | Tipo | Regra |
|---|---|---|
| id | Int | Chave primária e autoincremento |
| nome | String | Obrigatório e único |
| createdAt | DateTime | Preenchido automaticamente |
| updatedAt | DateTime | Atualizado automaticamente |

## Tratamento de erros

A API possui tratamento para situações como:

- Produto não encontrado;
- ID inválido ou inexistente;
- Nome não informado na atualização;
- Nome de produto duplicado;
- Campo de ordenação inválido;
- Ordem de ordenação inválida.

## Projeto acadêmico

Esta API foi utilizada para implementar os requisitos de ordenação, contagem, busca por ID, atualização e remoção de registros.

## Autor

**Júlio Thomas**

