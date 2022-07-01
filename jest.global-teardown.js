const { createConnection } = require("mysql2");

module.exports = async ()=>{

  console.log("Deletando o Schema...");

  const client = createConnection(
    { host: "localhost",
      port: 3306,
      user: "root",
      password: "V84816756",
      database: "rentalx_project" });

      await client.connect();
      client.query(`DROP SCHEMA IF EXISTS "${global.__SCHEMA__}" CASCADE`);
      await client.end();

      console.log("Remoção do Schema feita com sucesso...");
}