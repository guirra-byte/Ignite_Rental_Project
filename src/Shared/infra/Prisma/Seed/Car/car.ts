import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';

async function create() {

  const prisma = new PrismaClient();

  async function generateId(): Promise<string> {

    const id: string = await uuidV4();
    return id;
  }

  const id = await generateId();

  // Create Category
  await prisma
    .$queryRaw`INSERT INTO CATEGORY(id, name, description, created_at) VALUES(${id}, 'SUV', 'Carro robusto para aguentar o dia a dia corriqueiro', ${new Date()})`

  // Create Car
  const car = await prisma
    .$queryRaw`INSERT INTO CARS(name, description, daily_rate, available, license_plate, fine_amount, brand, created_at, id, category_id) VALUES('Volks Nivus', 'Dream Car', 700, true, 'MABEL_NOW', 'fine_amount', 'Volks', ${new Date()}, ${id}, 'ebdfe994-32e4-49fd-a0b6-10244178439d')`

}

create()
  .then(() => console
    .log("Category already created"));