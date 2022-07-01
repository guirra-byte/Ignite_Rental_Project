import { PrismaClient } from '@prisma/client';
import { v4 as uuidV4 } from 'uuid';

import { DateProvider } from '../../../Providers/DateProvider/implementations/DateProvider';
import dayjs from 'dayjs';

async function create() {

  let returnDateProvider: DateProvider = new DateProvider();
  let prisma: PrismaClient = new PrismaClient();

  async function generateId() {

    const id: string = uuidV4();
    return id;
  }

  const id: string = await generateId();
  const returnRandomDay: Date = dayjs().add(24, "hour").toDate();

  const miliseconds: number = await returnDateProvider
    .compare(returnRandomDay);

  const seconds: number = (miliseconds / 1000);
  const minutes: number = (seconds / 60);
  const hours: number = (minutes / 60);
  const day: number = (hours / 24);

  //Create Car Rental
  await prisma
    .$queryRaw`INSERT INTO RENTAL(id, start_date, expect_return_date, created_at, user_id, car_id) VALUES(${id}, ${new Date()}, ${new Date()}, ${new Date()}, 'eac76feb-1f15-4ab7-a663-a7d3229378a0', '8507a95c-103f-4552-a3a4-c6de58738cf8')`

  //Create User Rental Car relation
  await prisma
    .$queryRaw`INSERT INTO USER_RENTAL_CAR(user_id, car_id) VALUES('eac76feb-1f15-4ab7-a663-a7d3229378a0', '8507a95c-103f-4552-a3a4-c6de58738cf8')`
}

create()
  .then(() => {

    console.log("User Rental Car already created!");
  })

