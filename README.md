# Cadastro de Carros:

**Requisistos Funcionais: Cadastro de Carros**

- [x] Deve ser possível cadastrar um novo Carro;

**Regras de Negócios: Cadastro de um Carro**

- [x] Não deve ser possível cadastrar um carro com uma placa que já existe;
- [x] O User responsável pelo cadastro de Carro deve possuir a propriedade isAdmin como True;
- [x] O Carro deve ser cadastrado com a disponibilidade por padrão True;
- [] Não deve ser possível alterar a placa de um carro que já está cadastrado;


# Listagem de Carros:

**Requisitos Funcionais: Listagem de Carros**

- [x] Deve ser possível listar todos os carros disponíveis;
- [] Deve ser possível listar todos os carros disponíveis pelo nome da Category;
- [] Deve ser possível listar todos os carros disponíveis pelo nome da Marca;
- [] Deve ser possível listar todos os carros disponíveis pelo nome do Carro;

**Regras de Negócios: Listagem de Carro**

- [x] Deve ser possível listar os carros;
- [x] O User não precisa estar logado na aplicação - User Auth Token;

# Cadastro de Especficação:

**Requisitos Funcionais: Cadastro de Especificação**

- [x] Deve ser possível cadastrar uma nova especificação;

**Regras de Negócios: Cadastro de Especificação**

- [x] Não deve ser possível cadastrar uma especificação para um carro não existente;
- [x] Não deve ser possível cadastrar uma mesma especificação para um mesmo carro;
- [x] O User responséval pelo cadastro de especificação deve ser um User Admin;

# Cadastro de Imagem do Carro:

**Requisitos Funcionais: Cadastro de Imagem do Carro**

- [x] Deve ser possível cadastrar a Imagem de um Carro;
- [x] Deve ser possível listar todos os Carros; (Disponíveis e Indisponíveis);

**Regras de Negócios: Cadastro de Imagem do Carro**

- [x] Deve ser possível cadastrar mais de uma Imagem para o Carro;
- [] Deve ser possível Comprimir o tamanho das Imagens Cadastradas;
- [x] O User responsável pelo cadastro de Imagens deve ser um User Admin;

**Requisitos Não Funcionais: Cadastro de Imagem do Carro**

- [x] Utilizar a lib Multer para implementação da funcionalidade de Upload de Imagens;

# Aluguel de Carros: 

**Requisitos Funcionais: Aluguel de Carros**
- [] Deve ser possível realizar o Aluguel de um Carro;
- [] Deve ser possível listar todos os Carros que estão Alugados;
- [] O Aluguel deve ter duração mínima de 24 Horas;
- [] O User deve estar logado na aplicação;

**Regras de Negócios: Aluguel de Carros**
- [] Não deve ser possível fazer o Aluguel de um Carro que já esteja Alugado;
- [] Não deve ser possível Alugar mais de um Carro;
- [] Não deve ser possível Alugar um Carro sem estar Cadastrado;

- [x] **`Verificação de User License_Plate por meio de Middleware;`**
- [x] **`Verificação de User isAdmin por meio de Middleware;`**


Requisitos da Aplicação:

Requisitos Funcionais;
 -> São as funcionalidades da nossa aplicação:
  - Cadastro de Category
  - Cadastro de Specification
  - Upload de Avatar de User
Requisitos Não Funcionais;
  -> Dizem a respeito das ferramentas ou bibliotecas que serão utilizadas para a implememntação das funcionalidades;
  -> Não estão ligados diretamente a nossa Regra de Negócio;
  - Qual banco de Dados utilizar
  - Biblioteca de Envio de Email
Regras de Negócios;
  -> Implementação das Regras das funcionalidades da nossa aplicação;

Desafios para uma aplicação mais completa:
 Implementação de GraphQL;
 Para poder particar os conceitos e fundamentos deste novo modelo Rest;
 Pode ser bem mais podutivo que o modelo Rest de API;

 -> Fundamentos do GraphQL;
 -> Test Driven Development - TDD;
 -> Domain Driven Design - DDD;
 -> MicroServices - Modelo de Aplicação;
 -> Implementação e Integração de API de pagamento;
 -> Implementação e Integração com API do WhatsApp;
