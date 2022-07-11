import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { CarRepositoryInMemory } from "../../../cars/repositories/in-memory/CarRepositoryInMemory";
import { CategoryRepositoryInMemory } from "../../../cars/repositories/in-memory/CategoryRepositoryInMemory";
import { UserRepositoryInMemory } from "../../../accounts/repositories/in-memory/UserRepositoryInMemory";

import { DateProvider } from "../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

import { AppError } from "../../../../Shared/infra/http/Errors/AppError";
import { Category } from '../../../cars/model/Category';

import dayjs from 'dayjs';

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let returnDatesCompareProvider: DateProvider;

let createRentalUseCase: CreateRentalUseCase;

describe("Create a new Rental", () => {

  const newDateAdd24Hours: Date = dayjs()
    .add(3, "day")
    .toDate();

  beforeEach(async () => {

    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    returnDatesCompareProvider = new DateProvider();

    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, carRepositoryInMemory, returnDatesCompareProvider);
  });

  it("Should be able create a new Rental", async () => {

    async function createCategoryAndGetAllProps({ name, description }): Promise<Category> {

      await categoryRepositoryInMemory
        .create(name, description);

      const findOneCategory = await categoryRepositoryInMemory
        .findOneCategory(name);

      return findOneCategory;
    }

    const category1 = await createCategoryAndGetAllProps(
      { name: "SUV", description: "Carro robusto para o dia a dia corriqueiro" });

    const car1 = {

      name: "Range Rover",
      description: "Dream Car",
      daily_rate: 650,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "England Motors",
      category_id: category1.id
    }

    await carRepositoryInMemory
      .createCar(car1);

    const findAllCarProps = await carRepositoryInMemory
      .findOneCar(car1.name);

    expect(findAllCarProps)
      .toHaveProperty('id');

    const user1 = {

      name: "User Name Test",
      username: "User UserName Test",
      email: "User Email Test",
      password: "User Password Test",
      isAdmin: true,
      driver_license: "MABEL_22"
    }

    await userRepositoryInMemory
      .create(user1);

    const findAllUserProps = await userRepositoryInMemory
      .findOne(user1.email);

    expect(findAllUserProps)
      .toHaveProperty('id');

    const rental1 = {

      user_id: findAllUserProps.id,
      car_id: findAllCarProps.id,
      expect_return_date: newDateAdd24Hours
    }

    await createRentalUseCase
      .execute(rental1);

    const findOpenRental = await rentalRepositoryInMemory
      .findOpenRentalByCar(findAllCarProps.id);

    expect(findOpenRental)
      .toHaveProperty('id');

  });

  it("Should not be able create a new Rental, with invalid return time", async () => {

    expect(async () => {

      await createRentalUseCase
        .execute({
          car_id: "mabel_22",
          user_id: "mabel_22",
          expect_return_date: dayjs().toDate()
        });

    }).rejects
      .toBeInstanceOf(AppError);
  });
});
