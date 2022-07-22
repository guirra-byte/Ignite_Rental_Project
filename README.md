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

- [x] Deve ser possível listar todos os carros disponíveis;F
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da Category;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da Marca;
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do Carro;

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
- [x] Deve ser possível realizar o Aluguel de um Carro;
- [x] Deve ser possível listar todos os Carros que estão Alugados;
- [x] O Aluguel deve ter duração mínima de 24 Horas;
- [x] O User deve estar logado na aplicação;
- [x] Ao ser relizado o aluguel do carro deve ser possível fazer a alteração na property available para False;

**Regras de Negócios: Aluguel de Carros**
- [x] Não deve ser possível fazer o Aluguel de um Carro que já esteja Alugado;
- [x] Não deve ser possível Alugar mais de um Carro;
- [x] Não deve ser possível Alugar um Carro sem estar Cadastrado;


# Devolução do Aluguel de carros:
- [x] Se o carro for devolvido em um espaço de tempo menor ou igual a 24 horas, deverá ser cobrado o valor da diária completa;
- [x] Ao ser realizada a devolução, o carro deverá ser liberado para um outro possível aluguel;
- [x] Ao ser realizada a devolução do carro, o user deverá ser liberado para um outro possível aluguel;
- [x] Ao ser realizada a devolução do carro, deverá ser calculado o valor integral do aluguel;
- [] Caso o horário de devolução seja superior ao horário estimulado da previsão da entrega,
 deverá ser cobrado multa referente ao tempo de atraso;
- [] Caso houver multa, deverá ser inteirado ao valor definido ao valor final do aluguel;
- [x] O User deverá estar logado na aplicação;

- [x] **`Verificação de User License_Plate por meio de Middleware;`**
- [x] **`Verificação de User isAdmin por meio de Middleware;`**

# Recuperar Senha:

**Requisitos Funcionais: Recuperação de Senha**
- [] Dever ser possível o User recuperar a senha informando o email;
- [] O User deve receber um email com o passo a passo para a recuperação de senha;
- [] O User deve conseguir inserir uma nova senha;

**Regras de Negócios: Recuperação de Senha**
- [] O User precisa informar uma nova senha;
- [] O link enviado para a recuperação deve expirar em 3 Horas; 

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

-> Fundamentos dos Testes de Integração:
Sua implementação tem como objetivo encontrar falhas de integração entre as unidades [Que estão sendo testadas com Testes Unitários]:
  - [] Testes de Interface;
  - [] Testes de dependências entre os componentes;

O Escopo deste Tipo de Testagem demonstra ser interessante testar um classe, uma função, um pacote, um serviço, ou todo o sistema.
Simplificando, o Teste de Integração realiza a testagem do módulos em GRUPO;
Desse modo, é perceptível que o Teste de Integração Sucede o Teste Unitário;
Basicamente o Teste Integração é um Teste formado por vários Testes Unitários;

-> Vamos utilizar uma ferramenta chamada SuperTest;
