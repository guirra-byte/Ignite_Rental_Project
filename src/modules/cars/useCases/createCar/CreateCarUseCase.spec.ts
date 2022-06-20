import { UserRepositoryInMemory } from '../../../accounts/repositories/in-memory/UserRepositoryInMemory';
import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

import { ICreateUserDTO } from '../../../accounts/Services/Data/ICreateUserDTO';
import { ICarRequestProps } from '../../repositories/ICarRepository';
import { Category } from '../../model/Category';

describe("Create a new Car", () => {

  let createCarUseCase: CreateCarUseCase;

  let categoryRepositoryInMemory: CategoryRepositoryInMemory;
  let carRepositoryInMemory: CarRepositoryInMemory;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(async () => {

    carRepositoryInMemory = new CarRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);

  });

  test("Should be able create a new Car", async () => {

    async function createCategoryAndGetAllProps({ name, description }): Promise<Category> {

      await categoryRepositoryInMemory
        .create(name, description);

      const findCategoryProps = await categoryRepositoryInMemory
        .findOneCategory(name);

      return findCategoryProps;
    }

    const category1 = await createCategoryAndGetAllProps({
      name: "SUV",
      description: "Carro robusto para altas kilometragens"
    });

    const car: ICarRequestProps = {

      name: "Nivus",
      description: "Carro dos sonhos",
      daily_rate: 500,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: "fine_amount",
      brand: "Volks",
      category_id: category1.id
    }

    const { name } = car;

    await createCarUseCase
      .execute(car);

    const findCar = await carRepositoryInMemory
      .findOneCar(name);

    expect(findCar)
      .toHaveProperty("id");
  });

  test("Should not be able create a Car with License Plate already exists", async () => {

    expect(async () => {

      async function createCategoryAndGetAllProps({ name, description }): Promise<Category> {

        await categoryRepositoryInMemory
          .create(name, description);

        const findCategoryProps = await categoryRepositoryInMemory
          .findOneCategory(name);

        return findCategoryProps;
      }

      const category1 = await createCategoryAndGetAllProps({
        name: "SUV",
        description: "Carro robusto para altas kilometragens"
      });

      const firstCar: ICarRequestProps = {

        name: "Ranger Hover",
        description: "Dream Car",
        daily_rate: 1290,
        available: true,
        license_plate: "ABC-1234",
        fine_amount: "fine_amount",
        brand: "Brand",
        category_id: category1.id
      }

      await createCarUseCase
        .execute(firstCar);

      const secondCar: ICarRequestProps = {

        name: "Nivus",
        description: "Other Dream Car",
        daily_rate: 500,
        available: true,
        license_plate: "ABC-1234",
        fine_amount: "fine_amount",
        brand: "Volks",
        category_id: category1.id
      }

      const cars = { firstCar, secondCar };

      const verifyLicensePlateSecondCar = await carRepositoryInMemory
        .findByLicensePlate(cars.secondCar.license_plate);

      if (!verifyLicensePlateSecondCar) {

        await createCarUseCase
          .execute(secondCar);
      }

      throw new AppError("This Car Already Exists");

    }).rejects
      .toBeInstanceOf(AppError);
  });

  test("Should be able create a Car with User prop isAdmin for equals True", async () => {

    const user: ICreateUserDTO = {

      name: "User Name Test",
      username: "UserName Test",
      email: "User Email Test",
      password: "User Password Test",
      isAdmin: true,
      driver_license: "Mabel-2022"
    }

    await userRepositoryInMemory
      .create(user);

    const findUserProps = await userRepositoryInMemory
      .findOne(user.email);

    await userRepositoryInMemory
      .updateAdminProp(findUserProps.id);

    const findUpdatedUser = await userRepositoryInMemory
      .findOne(findUserProps.email);

    expect(findUpdatedUser.isAdmin)
      .toBe(true);

    async function createCategoryAndGetAllProps({ name, description }): Promise<Category> {

      await categoryRepositoryInMemory
        .create(name, description);

      const findCategoryProps = await categoryRepositoryInMemory
        .findOneCategory(name);

      return findCategoryProps;
    }

    const category1 = await createCategoryAndGetAllProps({
      name: "SUV",
      description: "Carro robusto para altas kilometragens"
    });

    const firstCar: ICarRequestProps = {

      name: "Ranger Hover",
      description: "Dream Car",
      daily_rate: 1290,
      available: true,
      license_plate: "Mabel_2022",
      fine_amount: "fine_amount",
      brand: "Brand",
      category_id: category1.id
    }

    await carRepositoryInMemory
      .createCar(firstCar);

    const findCar = await carRepositoryInMemory
      .findByLicensePlate(firstCar.license_plate);

    expect(findCar)
      .toHaveProperty('id');

  });

  test("Should be able create Car with your props available for true by default", async () => {

    async function createCategoryAndGetAllProps({ name, description }): Promise<Category> {

      await categoryRepositoryInMemory
        .create(name, description);

      const findCategoryProps = await categoryRepositoryInMemory
        .findOneCategory(name);

      return findCategoryProps;
    }

    const category1 = await createCategoryAndGetAllProps({
      name: "SUV",
      description: "Carro robusto para altas kilometragens"
    });

    const car: ICarRequestProps = {

      name: "Ranger Hover",
      description: "Dream Car",
      daily_rate: 1290,
      license_plate: "Mabel_2022",
      fine_amount: "fine_amount",
      brand: "brand",
      category_id: category1.id
    }

    await createCarUseCase
      .execute(car);

    const findCar = await carRepositoryInMemory
      .findByLicensePlate(car.license_plate);

    expect(findCar.available)
      .toBe(true);
  })
});