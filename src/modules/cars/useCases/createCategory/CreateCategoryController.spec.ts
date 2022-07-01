/**
* @jest-environment ../../../../../jest.global-setup.js
*/

import request from 'supertest';
import { app } from '../../../../app';
import { create, deleteCategory } from '../../../../Shared/infra/Prisma/Seed/Car/Category/category';
import { selectAdminUser } from '../../../../Shared/infra/Prisma/Seed/Admin/admin';

describe("Create a new Category Controller", () => {
  //Describe serve apenas para agrupar os Testes

  //BeforeAll - Antes de Todos os Testes
  // beforeAll(async () => {

  //   const category1 = {

  //     name: "Hatch",
  //     description: "Carro curto para que está com o bolso apertado, mas sem deixar o conforto de lado"
  //   }

  //   const { name, description } = category1;
  //   await create(name, description);
  // });

  // //AfterAll - Depois de Todos os Testes
  // afterAll(async () => {

  //   await deleteCategory("Hatch");
  // });

  test("Should be able create a new Category", async () => {

    const response = await request(app)
      .get('car/allCars');

    console.log(response.status);
    console.log(response.body);
  });
});