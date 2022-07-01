import { PrismaClient } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';

async function create(name: string, description: string) {

  const prismaClient: PrismaClient = new PrismaClient();

  const generateId = async (): Promise<string> => {

    const id = uuidV4();
    return id;
  }

  const id: string = await generateId();

  //Create Category
  await prismaClient
    .$queryRaw`INSERT INTO CATEGORY(name, description, id, created_at) 
    VALUES(${name} , ${description}, ${id}, ${new Date()})`;

}

async function deleteCategory(name: string) {

  const prismaClient: PrismaClient = new PrismaClient();

  //Delete Category
  await prismaClient
    .$queryRaw`DELETE FROM CATEGORY WHERE name = ${name}`;
}


export { create, deleteCategory }