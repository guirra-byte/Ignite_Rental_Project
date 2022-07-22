import { createConnection, Connection } from 'mysql2';
import { PrismaClient } from '@prisma/client';

import { exec } from 'child_process';
import { config } from 'dotenv';
import { DotenvConfigOutput } from 'dotenv';
import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import util from 'util';

enum PORT {

  DEFAULT = 3306
}

enum DATABASE_URL {

  HOST = "localhost",
  USER = "root",
  PASSWORD = "V84816756",
  PORT = 3306,
  NAME = "rentalx_project"
}

config({ path: '../../.env' });

const prismaClientCli = '../../../../../../node_modules/.bin/prisma';

const requireDatabaseProps = async () => {

  const requireUser: DATABASE_URL = DATABASE_URL.USER;
  const requirePassword: DATABASE_URL = DATABASE_URL.PASSWORD;
  const requireHost: DATABASE_URL = DATABASE_URL.HOST;
  const requireName: DATABASE_URL = DATABASE_URL.NAME;

  const requireProps = {
    user: requireUser,
    password: requirePassword,
    host: requireHost,
    name: requireName
  }

  return requireProps;
}

const Connect = async (): Promise<void> => {

  console
    .log("Iniciando a fase de Testes de Integração... Connect");

  const databaseConnect = await requireDatabaseProps();
  const { host, name, password, user } = databaseConnect;

  let requireConnect: Connection;

  if (process.env.NODE_ENV === "test") {

    requireConnect = await createConnection({
      host: host,
      user: user,
      password: password,
      database: name
    });

    await requireConnect
      .connect();

    // requireConnect.end();

    enum TEST_DATABASE {

      DATABASE_URL = "rentalx_project_test3"
    }

    requireConnect = createConnection({
      host: host,
      user: user,
      password: password,
      database: TEST_DATABASE.DATABASE_URL
    });

    const prismaMigrateDeploy = prismaClientCli
      .split('/')[3]
      .split(" ");

    const execSync = util.promisify(exec);
    console.log(execSync);

    await execSync(`npx ${prismaMigrateDeploy} migrate dev`);
    // // ---- ** ----

    // const requirePasswordHash: string = await hash("mabel_84816756", 10);

    // const requireId: string = uuidV4();

    // requireConnect
    //   .query(`CREATE TABLE users
    // (id VARCHAR(255) NOT NULL,
    //  name VARCHAR(255) NOT NULL,
    //  email VARCHAR(255) NOT NULL,
    //  username VARCHAR(255) NOT NULL UNIQUE,
    //  password VARCHAR(255) UNIQUE NOT NULL,
    //  driver_license VARCHAR(255) UNIQUE NOT NULL,
    //  created_at TIMESTAMP DEFAULT now() NOT NULL,
    //  updated_at TIMESTAMP)`);

    // requireConnect
    //   .query(`INSERT INTO USERS(id, name, email, username, password,  driver_license) 
    //   VALUES('${requireId}','Matheus Guirra', 'Guirra',
    //    'guirramatheus1@gmail.com', '${requirePasswordHash}', 'MJI-2022')`);

    await requireConnect
      .end();
  }

  console
    .log("Finalizando a fase de Testes de Integração... Connect");
}

const DisConnect = async (): Promise<void> => {

  const database = await requireDatabaseProps();
  const { user, password, host, name } = database;

  console
    .log("Iniciando a fase de Testes de Integração... DisConnect");

  let requireDisconnect: Connection = await createConnection(
    {
      host: host,
      user: user,
      password: password,
      database: name,
      port: PORT.DEFAULT
    });

  await requireDisconnect
    .connect();

  requireDisconnect
    .query(`DROP DATABASE rentalx_project_test3`);

  await requireDisconnect
    .end();

  console
    .log("Finalizando a fase de Testes de Integração... DisConnect");
}

export { Connect, DisConnect }