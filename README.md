# OnTrip API Documentation

# Escribo Test API

## Conteúdo

- [Documentation](#escribo-test-api)
  - [Conteúdo](#conteúdo)
  - [1. Sobre o Projeto](#1-sobre-o-projeto)
  - [2. Iniciando o Projeto Localmente](#2-iniciando-o-projeto-localmente)
  - [3. Autenticação](#3-autenticação)
  - [4. Endpoints](#4-endpoints)

---

## 1. Sobre o Projeto

Esta API foi construida para a 2ª fase do teste técnico da empresa Escribo.
Tem como objetivo ser uma API de criação, leitura e login de usuários através dos endpoints:

- **/users**
- **/login**

Falaremos sobre cada um logo mais.

Para este projeto, foram utilizadas as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [Docker](https://www.docker.com/)

<br/>

URL de base para a aplicação em que foi feito o deploy:

<br/>

**Base URL: https://escribo-tlh7.onrender.com**


---

## 2. Iniciando o Projeto Localmente

[ Topo ](#conteúdo)

Antes de executar de fato o programa, você precisará se certificar de que possui o [Node.JS](https://nodejs.org/en/) e o [Docker](https://www.docker.com/) instalado na sua máquina. São as duas ferramentas que são obrigatórias para execução local desta aplicação, seja em desenvolvimento ou pra teste de produção local.

* Após clonar o projeto para a sua máquina local, abra um terminal na raiz do projeto clonado e habilite o script de inicialização do projeto(NÃO USE O POWERSHELL do windows, aconselho usar o git bash):

    ```shell
    chmod +x ./start.sh
    ```
* Logo depois, execute o script que você habilitou:

    ```shell
    ./start.sh
    ```


E pronto! Só esperar o docker subir o banco de dados e também iniciar a aplicação no formato de teste de produção local.

---

## 3. Autenticação

[ Topo ](#conteúdo)

Algumas rotas necessitam de um token para funcionar. Certifique-se que este token seja do tipo **Bearer**.

este token é gerado automaticamente quando o usuário faz o login ou se cadastra.
---

## 4. Endpoints

[ Topo ](#conteúdo)

### Índice

- [Users](#1-users)
- [Login](#2-login)

---

## 1. **Users**

[ Índice de endpoints ](#índice)

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**                                 |
| ---------- | -------------- | ----------------------------------------------- |
| POST       | /users         | Cria um novo usuário                            |
| GET        | /users         | Lista todos os usuários (necessita autenticação)|
| GET        | /users/profile | Dados do usuário logado (necessita autenticação)|

<br>

## POST /users

[ Índice de endpoints ](#índice)

Rota de criação de usuário

<br/>

#### headers:

- Authorization: None
- Content-type: application/json

<br>

**Exemplo de Corpo de Requisição**

```application/json
  {
    "nome": "João",
    "email": "joao@mail.com",
    "senha": "João!123",
    "telefones": [
      {
        "ddd": "81",
        "numero": "987654321"
      }
    ]
  }
```

<br>

#### Resposta esperada:

<br>

**Status 201 - Usuário criado**

```json
{
	"id": "7c84596a-c006-4951-be16-83cb7f809d39",
	"data_criacao": "2023-11-26T00:37:52.458Z",
	"data_atualizacao": "2023-11-26T00:37:52.458Z",
	"ultimo_login": "2023-11-25T21:37:52.398Z",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3Yzg0NTk2YS1jMDA2LTQ5NTEtYmUxNi04M2NiN2Y4MDlkMzkiLCJpYXQiOjE3MDA5NDgyNzIsImV4cCI6MTcwMDk0ODU3Mn0.x7djW9tAtn7carcwELTsqt8RW9tjKPPMD5EnlN6JzV8"
}
```

<br>

#### Possíveis erros:

<br>

**Status 400 - Faltando um acmpo obrigatório**

```json
{
	"status": "error",
	"codigo": 400,
	"mensagem": "Os campos nome, email, senha e telefones são obrigatórios"
}
```

<br>

**Status 400 - Tipos ou formatos inválidos**

```json
{
	"status": "error",
	"codigo": 400,
	"mensagem": "O campo senha deve conter ao menos 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial e no mínimo 8 caracteres"
}
```

<br>

**Status 409 - E-mail já existente**

```json
{
	"status": "error",
	"codigo": 409,
	"mensagem": "E-mail já existente"
}
```

#

## GET /users

[ Índice de endpoints ](#índice)

Leitura de todos os usuários
<br>

#### Headers:

- Authorization: Bearer Token

#### Query Params:

- page
- limit

```
baseURL/users?page=2&limit=10
```

#### Resposta esperada:

<br>

**Status 200 - OK**

```json
{
	"page": 1,
	"count": 1,
	"next": null,
	"prev": null,
	"limit": 5,
	"result": [
		{
			"id": "51e4fbe4-9746-43d9-b87e-5c9529106466",
			"data_criacao": "2023-11-26T05:37:14.829Z",
			"data_atualizacao": "2023-11-26T05:41:45.966Z",
			"ultimo_login": "2023-11-26T02:41:45.955Z"
		}
	]
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Token de autorização ausente**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Token de autorização ausente"
}
```

<br>

**Status 401 - Token inválido**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Não autorizado"
}
```

<br>

**Status 401 - Token expirado**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Sessão inválida"
}
```

<br>

#

## GET /users/profile

[ Índice de endpoints ](#índice)

Recuperação de dados do usuário logado

<br>

#### Request:

- Authorization: Bearer Token


#### Resposta esperada

<br>

**Status 200 - OK**

```json
{
	"id": "51e4fbe4-9746-43d9-b87e-5c9529106466",
	"data_criacao": "2023-11-26T05:37:14.829Z",
	"data_atualizacao": "2023-11-26T05:53:45.679Z",
	"ultimo_login": "2023-11-26T02:53:45.660Z",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MWU0ZmJlNC05NzQ2LTQzZDktYjg3ZS01Yzk1MjkxMDY0NjYiLCJpYXQiOjE3MDA5NjcyMjUsImV4cCI6MTcwMDk2NzUyNX0.bKBvDK7DFqo6DLtrqeIjgH84Dg21TTHISXhGIISvlas"
}
```

<br>

#### Possíveis Erros:

<br>

**Status 401 - Token de autorização ausente**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Token de autorização ausente"
}
```

<br>

**Status 401 - Token inválido**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Não autorizado"
}
```

<br>

**Status 401 - Token expirado**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Sessão inválida"
}
```

---

## 2. **Login**

[ Índice de endpoints ](#índice)

### **Endpoints**

| **Method** |     **Route**     | **Description** |
| ---------- | ----------------- | --------------- |
| POST       | /login            | Login user      |
| POST       | /session/login    | Login user      |
| POST       | /signin           | Login user      |

<br>

#

## POST /login ou /session/login ou /signin

[ Índice de endpoints ](#índice)

<br>

#### Request:

- Content-type: application/json

**Exemplo de corpo de requisição**

```json
{
  "email": "joao@mail.com",
  "senha": "João!123"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
	"id": "51e4fbe4-9746-43d9-b87e-5c9529106466",
	"data_criacao": "2023-11-26T05:37:14.829Z",
	"data_atualizacao": "2023-11-26T05:53:45.679Z",
	"ultimo_login": "2023-11-26T02:53:45.660Z",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MWU0ZmJlNC05NzQ2LTQzZDktYjg3ZS01Yzk1MjkxMDY0NjYiLCJpYXQiOjE3MDA5Njc1NDgsImV4cCI6MTcwMDk2Nzg0OH0.Ka-u_t3uJAEt8LNgTd_5pyUwTa3r1AIoKMuZV8zb6-Y"
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Campos obrigatórios**

```json
{
	"status": "error",
	"codigo": 400,
	"mensagem": "Campos email e senha são obrigatórios"
}
```

<br>

**Status 401 - e-mail ou senha invalidos**

```json
{
	"status": "error",
	"codigo": 401,
	"mensagem": "Usuário e/ou senha inválidos"
}
```

<br/>

Qualquer dúvida pode entrar em contato pelo [linkedin](https://www.linkedin.com/in/th-matheus) ou [whatsapp](https://wa.me/558196336588)

Este projeto foi desenvolvido por Matheus Vieira:

<table>
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/109465340?s=400&u=c19eb7d2cf67c227c5a8bbef65757c104b37ae55&v=4" width="100px;" alt="Foto do Theus no GitHub"/><br>
        <sub>
          <b>Matheus Vieira</b>
        </sub>
    </td>
    
  </tr>
</table>