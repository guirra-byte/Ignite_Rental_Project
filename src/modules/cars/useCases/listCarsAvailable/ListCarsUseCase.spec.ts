import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'

import { ListCarsAvailableUseCase } from './ListCarsAvailableUseCase';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';

let carRepositoryInMemory: CarRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

let createCategoryUseCase: CreateCategoryUseCase;
let listCarsAvailableUseCase: ListCarsAvailableUseCase;

describe("List Cars", () => {

  beforeEach(async () => {

    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
    listCarsAvailableUseCase = new ListCarsAvailableUseCase(carRepositoryInMemory);

  });

  test("Should be able List Available Cars", async () => {

    const category1 = {

      name: "SUV",
      description: "Carro robusto para aguentar a correria do dia a dia"
    }

    await createCategoryUseCase
      .execute(category1);

    const getCategoryProps = await categoryRepositoryInMemory
      .findOneCategory(category1.name);

    const { id } = getCategoryProps;

    const car1 = {
      name: "Nivus",
      description: "Carro dos sonhos",
      daily_rate: 500,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 450,
      brand: "Volks",
      category_id: id
    }

    await carRepositoryInMemory
      .createCar(car1);

    const findCar1 = await carRepositoryInMemory
      .findByLicensePlate(car1.license_plate);

    expect(findCar1).
      toHaveProperty('id');

    const car2 = {

      name: "T-Cross",
      description: "Carro dos sonhos",
      daily_rate: 430,
      available: true,
      license_plate: "ABC-4321",
      fine_amount: 450,
      brand: "Volks",
      category_id: id
    }

    await carRepositoryInMemory
      .createCar(car2);

    const findCar2 = await carRepositoryInMemory
      .findByLicensePlate(car2.license_plate);

    expect(findCar2)
      .toHaveProperty('id');

    const listAllCarsAvailable = await listCarsAvailableUseCase
      .execute({});

    expect(listAllCarsAvailable)
      .toMatchObject([findCar1, findCar2]);
  });

  test("Should be able List Available Cars by Name", async () => {

    const category1 = {

      name: "SUV",
      description: "Carro robusto para aguentar o dia corriqueiro"
    }

    await categoryRepositoryInMemory
      .create(category1.name, category1.description);

    const findCategory1 = await categoryRepositoryInMemory
      .findOneCategory(category1.name);

    expect(findCategory1)
      .toHaveProperty('id');

    const car1 = {

      name: "Nivus",
      description: "Dream Car",
      daily_rate: 560,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "Volks",
      category_id: findCategory1.id
    }

    await carRepositoryInMemory
      .createCar(car1);

    const car2 = {

      name: "Range Hover",
      description: "Other Dream Car",
      daily_rate: 700,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "England Motors",
      category_id: findCategory1.id

    }

    await carRepositoryInMemory
      .createCar(car2);

    const findCar2 = await carRepositoryInMemory
      .findOneCar(car2.name);

    const findCar1 = await carRepositoryInMemory
      .findOneCar(car1.name);

    const findAllCars = await carRepositoryInMemory
      .findAvailable(car2.name);

    expect(findAllCars)
      .toMatchObject([findCar1, findCar2]);

  });

  test("Should be able List Available Cars by Category", async () => {

    const category1 = {

      name: "SUV",
      description: "Carro robusto para aguentar o dia corriqueiro"
    }

    await categoryRepositoryInMemory
      .create(category1.name, category1.description);

    const findCategory1 = await categoryRepositoryInMemory
      .findOneCategory(category1.name);

    expect(findCategory1)
      .toHaveProperty('id');

    const car1 = {

      name: "Range Hover",
      description: "Dream Car",
      daily_rate: 700,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "England Motors",
      category_id: findCategory1.id
    }

    await carRepositoryInMemory
      .createCar(car1);

    const findCar1 = await carRepositoryInMemory
      .findOneCar(car1.name);

    expect(findCar1)
      .toHaveProperty('id');

    const findCarsAvailable = await carRepositoryInMemory
      .findAvailable(car1.category_id);

    expect(findCarsAvailable)
      .toMatchObject([findCar1]);
  });

  test("Should be able List Available Cars by Brand", async () => {

    const category1 = {

      name: "SUV",
      description: "Carro robusto para o dia a dia corriqueiro"
    }

    await categoryRepositoryInMemory
      .create(category1.name, category1.description);

    const findCategory1 = await categoryRepositoryInMemory
      .findOneCategory(category1.name);

    expect(findCategory1)
      .toHaveProperty('id');

    const car1 = {

      name: "Ranger Hover",
      description: "Dream Car",
      daily_rate: 700,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "England Motors",
      category_id: findCategory1.id
    }

    await carRepositoryInMemory
      .createCar(car1);

    const findCar1 = await carRepositoryInMemory
      .findOneCar(car1.name);

    expect(findCar1)
      .toHaveProperty('id');

    const findAvailable = await carRepositoryInMemory
      .findAvailable(findCar1.brand);

    expect(findAvailable)
      .toMatchObject([findCar1]);
  })
});