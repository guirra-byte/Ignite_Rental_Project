const util = require("util");
const { config } = require("dotenv");
const { v4: uuidV4 } = require("uuid");
const { exec } = require("child_process");

const prismaClientCli = './node_modules/.bin/prisma';
console.log("Chegou aqui!");

module.exports = async()=>{

  console.log("Aplicando suítes de Testes de Integração");

  config({ path: '.env' });
  const execSync = util.promisify(exec);

  global.__SCHEMA__ = `test_${uuidV4()}`;
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}${global.__SCHEMA__}`;

  const prismaCmdMigrateDeploy = prismaClientCli.split("/")[3];
  await execSync(`${prismaCmdMigrateDeploy} migrate deploy`);

  console.log("Finalizando suítes de Teste de Integração");

};