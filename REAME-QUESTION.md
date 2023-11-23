# <a name="_lwaol1clpr17"></a>Backend -  Desafio Técnico 2

## <a name="_j0clf5dh7vg1"></a>**Objetivo:**
Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.


## <a name="_xreus4wzmogc"></a>**Especificações Técnicas:**


1. **Formato de Comunicação:**

●     Todos os endpoints devem aceitar e retornar apenas dados no formato JSON.

●     Retorno JSON para situações de endpoint não encontrado.

2. **Persistência de Dados:**

●     Armazenamento persistente de dados do usuário.

3. **Respostas de Erro:**

●     Formato padrão:

`       	`{ "mensagem": "mensagem de erro" }           	|
## <a name="_q6po3akryy42"></a>**Endpoints:**


**1. Sign Up (Criação de Cadastro):**

●     Input:



●     Output (sucesso):

●     Erro:

○     E-mail já cadastrado:         { "mensagem": "E-mail já existente" }   |

○      

**2. Sign In (Autenticação):** 

●     Input:

●     Output:

●     Erros:

○     E-mail não cadastrado ou senha incorreta:

■ 	        { "mensagem": "Usuário e/ou senha inválidos" }   |

○     Senha incorreta: status 401 com:

■ 	        { "mensagem": "Usuário e/ou senha inválidos" }   |

**3. Buscar Usuário:**



●     Requisição: Header Authentication com valor "Bearer {token}"

●     Erros:

○     Token inválido:   { "mensagem": "Não autorizado" } |

○     Token expirado (mais de 30 minutos):   { "mensagem": "Sessão inválida" } |
## <a name="_qkpfq1v94xyi"></a>**Requisitos:**
●     Persistência de dados.

●     Sistema de build com gerenciamento de dependências.

●     Task runner para build.

●     Padronização de estilo (ex: jsHint/jsLint).

●     Framework: Express, Hapi, ou similar.
## <a name="_34d4avtzyzgv"></a>**Requisitos Desejáveis:**
●     JWT como token.

●     Testes unitários.

●     Criptografia hash na senha e token.
## <a name="_vrowv9g46ag9"></a>**Submissão:**
●     Repositório no GitHub.

●     Hospedagem: Heroku, Google Cloud, AWS, ou similar.

●     Enviar URLs por e-mail jobs@escribo.com
## <a name="_5d8j5l3z07rm"></a>**Prazo:**
●     72 horas

