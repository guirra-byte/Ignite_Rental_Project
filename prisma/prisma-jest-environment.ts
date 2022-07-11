import { exec } from 'child_process';
import dotenv from 'dotenv';
import util from 'util';

import { createConnection } from 'mysql2';

import { v4 as uuidV4 } from 'uuid';

// ---- Date Format Libs ----
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
// ---- ** ----

// ---- TestEnvironment Imports ----
import { TestEnvironment as NodeEnvironment } from 'jest-environment-node';
import { JestEnvironmentConfig } from '@jest/environment';
import { EnvironmentContext } from '@jest/environment';
// ---- ** ----

dotenv.config({ path: ".env" });
dayjs.extend(utc);

const execSync = util.promisify(exec);
const prismaClientCli = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {

  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {

    super(config, _context);

    const getDatabaseProps: string = process.env.DATABASE_URL.split("/")[2];
    const splitDatabaseProps: string[] = getDatabaseProps.split("@")

    const databaseUser: string = splitDatabaseProps[0].split(":")[0];
    //Split and get Database User
    const databasePassword: string = splitDatabaseProps[0].split(":")[1];
    //Split and get Database Password
    const databaseHost: string = splitDatabaseProps[1].split(":")[1];
    //Split and get Database Host
    const databaseName: string = process.env.DATABASE_URL.split("/")[3].split("?")[0];
    //Split and get Database Name

    this.schema = `test_${uuidV4()}`;
    //Generate a new Database Schema

    this.connectionString = `mysql://${databaseUser}:${databasePassword}@localhost:${databaseHost}/${databaseName}?schema=${this.schema}`;
  }

  async setup(): Promise<void> {

    console.log("Iniciando a Implementação de Testes de Integração...");
    console.log(this.connectionString);

    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    const prismaMigrateDeployCmd = prismaClientCli
      .split("/")[3]
      .split(" ");

    await execSync(`npx ${prismaMigrateDeployCmd} migrate deploy`);

    return super
      .setup();
  }

  async teardown(): Promise<void> {

    const databaseConnect = createConnection({
      user: "root",
      password: "V84816756",
      host: "localhost",
      port: 3306,
      database: "rentalx_project"
    });

    await databaseConnect
      .connect();

    const newSchema: string = `rentalx_project?schema=${this.schema}`;

    databaseConnect
      .query(`INSERT INTO CATEGORY(id, name, description) 
      VALUES(${uuidV4()}, "Hatch", "Carro custo benefício mas sem deixar o conforto de lado"`);

    const findUser = databaseConnect
      .query(`SELECT * FROM CATEGORY`);

    await databaseConnect
      .end();

    console.log("Finalizando a execução da fase de Testes de Integração...");
  }
}

