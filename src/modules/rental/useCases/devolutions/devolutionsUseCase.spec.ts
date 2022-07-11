import { UserRepositoryInMemory } from '../../../accounts/repositories/in-memory/UserRepositoryInMemory';
import { CarRepositoryInMemory } from '../../../cars/repositories/in-memory/CarRepositoryInMemory';
import { RentalRepositoryInMemory } from '../../../rental/repositories/in-memory/RentalRepositoryInMemory';

import { CreateDevolutionUseCase } from './CreateDevolutionUseCase';
import { CalcProvider } from '../../../../Shared/infra/Providers/CalcRentalProvider/implementations/CalcProvider';
import { DateProvider } from '../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider';

import dayjs from "dayjs";

let userRepositoryInMemory: UserRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let rentalRepositoryInMemory: RentalRepositoryInMemory;

let dateProvider: DateProvider;
let createDevolutionUseCase: CreateDevolutionUseCase;

let requireDate: Date;

describe("Create a new devolution", () => {

  beforeEach(async () => {

    requireDate = dayjs()
      .add(4, "days")
      .toDate();

    userRepositoryInMemory = new UserRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();
    rentalRepositoryInMemory = new RentalRepositoryInMemory();

    dateProvider = new DateProvider();

    createDevolutionUseCase = new CreateDevolutionUseCase(userRepositoryInMemory, carRepositoryInMemory, rentalRepositoryInMemory, dateProvider);
  });

  it("Should be able Create a new devolution", async () => {

    const user = {

      name: "User Name Test",
      username: "User UserName Test",
      email: "User Email Test",
      password: "User Password Test",
      driver_license: "mabel_2022",
      isAdmin: true,

    }

    const { name, username, email, password, driver_license, isAdmin } = user;

    await userRepositoryInMemory
      .create({

        name: name,
        username: username,
        email: email,
        password: password,
        driver_license: driver_license,
        isAdmin: isAdmin

      });

    const requireUserProps = await userRepositoryInMemory
      .findOne(email);

    expect(requireUserProps)
      .toHaveProperty("id");

    const car = {

      name: "Porsche Cayenne",
      description: "Dream Car",
      daily_rate: 670,
      available: true,
      license_plate: "mabel_2022",
      fine_amount: 450,
      brand: "Porsche",
      category_id: "mabel_2022"
    }

    const { description, daily_rate, available,
      license_plate, fine_amount, brand, category_id } = car;

    await carRepositoryInMemory
      .createCar({

        name: car.name,
        description: description,
        daily_rate: daily_rate,
        available: available,
        fine_amount: fine_amount,
        brand: brand,
        license_plate: license_plate,
        category_id: category_id

      });

    const requireCarProps = await carRepositoryInMemory
      .findOneCar(car.name);

    expect(requireCarProps)
      .toHaveProperty("id");

    await rentalRepositoryInMemory
      .createRental({

        car_id: requireCarProps.id,
        user_id: requireUserProps.id,
        expect_return_date: requireDate

      });

    const requireRentalByUser = await rentalRepositoryInMemory
      .findOpenRentalByUser(requireUserProps.id);

    expect(requireRentalByUser.end_date)
      .toBeUndefined();

    const requireRentalByCar = await rentalRepositoryInMemory
      .findOpenRentalByCar(requireCarProps.id);

    expect(requireRentalByCar.end_date)
      .toBeUndefined();

    await createDevolutionUseCase
      .execute({
        user_id: requireUserProps.id,
        car_id: requireCarProps.id,
        rental_id: requireRentalByUser.id
      });

  });
});