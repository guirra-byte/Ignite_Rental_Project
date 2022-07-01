import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';

async function create() {

  const prisma = new PrismaClient();

  async function generateId(): Promise<string> {

    const id: string = uuidV4();
    return id;
  }

  const id = await generateId();

  // Create Category
  await prisma
    .$queryRaw`INSERT INTO CATEGORY(id, name, description, created_at) VALUES(${id}, 'SUV', 'Carro robusto para aguentar o dia a dia corriqueiro', ${new Date()})`

  // Create Car
  await prisma
    .$queryRaw`INSERT INTO CARS(name, description, daily_rate, available, license_plate, fine_amount, brand, created_at, id, category_id) VALUES('Volks Nivus', 'Dream Car', 700, true, 'MABEL_NOW','fine_amount', 'Volks', ${new Date()}, ${id}, 'fe000604-c4cb-4ea4-af67-9fc179881b7e')`

  //Create Car Specification
  await prisma
    .$queryRaw`INSERT INTO SPECIFICATION(name, description, id, created_at, car_id) VALUES('test', 'test', ${id}, ${new Date()}, '8507a95c-103f-4552-a3a4-c6de58738cf8')`

  //Create Car Specification Relation
  await prisma
    .$queryRaw`INSERT INTO CAR_SPECIFICATION(car_id, specification_id) VALUES('8507a95c-103f-4552-a3a4-c6de58738cf8','3b983dd4-d0d6-456a-87bf-75256b02bd4c')`

  //Select All Specification
  await prisma
    .$queryRaw`SELECT * FROM CAR_SPECIFICATION`;

  await prisma
    .$queryRaw`INSERT INTO CARIMAGES(id, car_id, image_name, created_at) VALUES(${id}, '8507a95c-103f-4552-a3a4-c6de58738cf8', 'images_name', ${new Date()})`
}

create()
  .then(() => console
    .log("Car all Datas already created!"));