import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from 'uuid';

async function create() {

  const prisma = new PrismaClient();

  const id: string = uuidV4();
  const hashPassword: string = await hash("mabel_admin", 10);

  await prisma
    .$queryRaw`INSERT INTO USER(id, name, username, email, password, driver_license, isAdmin, created_at) 
    VALUES(${id}, 'admin', 'admin', 'admin@gmail.com', ${hashPassword}, 'MABEL_22', true, ${new Date()})`;

}

export async function selectAdminUser() {

  const prismaClient: PrismaClient = new PrismaClient();
  const adminUser = await prismaClient.$queryRaw`SELECT * FROM USER WHERE ADMIN = TRUE`
  return adminUser;
}

create()
  .then(
    () => console
      .log("User admin already created!"));