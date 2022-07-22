const { TestEnvironment: NodeEnvironment } = require ("jest-environment-node");
const prismaClientCli = "./node_modules/.bin/prisma";

const { createConnection } = require("mysql2");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { config } = require("dotenv")
const { v4: uuidV4 } = require("uuid");

config({ path: ".env" });

class CustomEnvironment extends NodeEnvironment {

  constructor(config) {

    super(config);

    this.schema = `code_test_schema_${uuidV4()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;

    console.log(`Aqui está a sua SuperConfig ${config}`);
  }

  async setup() { 

    console.log("Iniciando a fase de Implementação de Testes de Integração");
    await super.setup();

      process.env.DATABASE_URL = this.connectionString;
      this.global.process.env.DATABASE_URL = this.connectionString;

      console.log(process.env.DATABASE_URL);
      console.log(this.global.process.env.DATABASE_URL);
      
      //Rodar as Migrations que já foram criadas;
      //Para rodar iremos precisar do Prisma;
      //Por isso utilizamos a sua Cli - Comand Line Intelisense;

      const prismaCmdMigrateDev = prismaClientCli.split("/")[3];

      execSync(`npx ${prismaCmdMigrateDev} migrate deploy`);
  }

  async teardown(){

    console.log("Finalizando a fase de Testes de Integração!");
    await super.teardown();
    const getDatabaseEnvProps = this.connectionString.split("/")[2];
    const getDatabasePassword = getDatabaseEnvProps.split("@");

    const user = getDatabasePassword[0].split(":")[0];
    const password = getDatabasePassword[0].split(":")[1];
    const localhostPort = getDatabasePassword[1].split(":")[1];
    const databaseName = this.connectionString.split("/")[3].split("?")[0];

    const databaseClient = createConnection(
      { host: "localhost",
        port: 3306,
        user: "root",
        password: "V84816756",
        database: "rentalx_project" });

    await databaseClient
    .connect();

    const schemaName = toString(this.schema);
    console.log(schemaName);

    databaseClient
    .query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);

    await databaseClient
    .end();

  }
}

module.exports = new CustomEnvironment;