# Canil Woof

<div align="center">
  <img src="https://github.com/ArthurAlexi/canil-woof/assets/90854173/90422664-47bc-4380-98bb-e6a59c5063d4" alt="homepage" height="400px" width="auto"/>
</div>

O Sistema  Canil Woof é uma aplicação web desenvolvida para auxiliar os usuários a encontrarem o melhor petshop para suas necessidades com base na data, 
quantidade de cães pequenos e quantidade de cães grandes.

### Tecnologias

#### backend
- [Java](https://www.java.com/pt-BR/)
- [Spring boot](https://spring.io/projects/spring-boot)

#### frontend

- [Typescript](https://www.typescriptlang.org/)
- [React + Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

# Como instalar

### Pre requisitos:

- [Node 20.X.X](https://nodejs.org/en)
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

## Backend

Após clonar o projeto, vá para o diretório `api` que contém o arquivo `pom.xml` e utilize o seguinte comando:
Ou deixe sua IDE instalar as dependências.

```
mvn install
```

Quando terminar, é só inicializar o projeto com a ajuda da IDE ou com o seguinte comando:

```
mvn spring-boot:run
```

a api estará na porta: `8080`

## Frontend

Após clonar o projeto, vá para o diretório `web` que contém o arquivo `package.json` e rode o seguinte comando:

```
npm install
```

Quando terminar, é só inicializar o projeto com o seguinte comando:

```
npm run dev
```

o site estará na porta: `5173`

# Premissas

- Não foi considerado a funcioalide de login
- O Sistema é apenas para escolher o petshop, por isso não será densenvolvido a parte de agendamento
- O usuário deverá informar os dados: `data`, `quantidade de cães pequenos` e `quantidade cães grandes`
- As quantidades de cada tipo de cães não podem ser menor que 0
- Só pode retornar um petshop, sendo que o critério de desempate será a distância da loja até o canil 

# Decisões de projeto

- Os petshops são armazenados em um banco em memória - H2 console - populado na inicialização do projeto
- O backend deve seguir o padrão `REST`
- Os testes unitários serão voltados para o backend
- As validações de campos serão feitas no frontend
- Como a solução em força bruta é da ordem O(n), ela foi adota como solução da escolha do Petshop

# Testes

Foi desenvolvido [testes unitários](https://github.com/ArthurAlexi/canil-woof/blob/main/api/src/test/java/com/canilWoof/servicesTests/PetStoreServiceTest.java) para a funcionalide de escolha do petshop com auxílio do [Mockito](https://mvnrepository.com/artifact/org.mockito/mockito-core) para mocar o retorno do banco de dados.

Os casos de teste foram:

| Motivo | Entrada | Saída |
| - | - | - |
| controle |  data: 08/05/2024 - nº de cães pequenos: 1 - nº de cães grandes: 0 | PetShop escolhido: Vai Rex |
| controle |  data: 08/05/2024 - nº de cães pequenos: 1 - nº de cães grandes: 2 | PetShop escolhido: Meu Canino Feliz |
| Dia não útil |  data: 11/05/2024 - nº de cães pequenos: 0 - nº de cães grandes: 1 | PetShop escolhido: ChowChawgas |
| Critério de desempate |  data: 08/05/2024 - nº de cães pequenos: 2 - nº de cães grandes: 1 | PetShop escolhido: Vai Rex |



