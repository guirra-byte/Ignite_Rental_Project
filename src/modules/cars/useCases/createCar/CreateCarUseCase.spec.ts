import { CreateCarUseCase } from './CreateCarUseCase';

describe("Create a new Car", () => {

  let createCarUseCase: CreateCarUseCase;

  beforeEach(async () => {

    createCarUseCase = new CreateCarUseCase();

  });

  test("Should be able create a new Car", async () => {

    await createCarUseCase.execute();

    expect(2 + 2)
      .toEqual(5);
  })
});