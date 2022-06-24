import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateSpecificationsUseCase } from "./CreateSpecificationUseCase";
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';

import { Category } from "../../model/Category";
import { Car } from "../../model/Car";

describe("Create a new Specification", () => {

  let carRepositoryInMemory: CarRepositoryInMemory;
  let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
  let categoryRepositoryInMemory: CategoryRepositoryInMemory;

  let createSpecificationUseCase: CreateSpecificationsUseCase;

  beforeEach(async () => {

    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();

    createSpecificationUseCase = new CreateSpecificationsUseCase(specificationRepositoryInMemory, carRepositoryInMemory);

  });

  test("Should be able create a new Car Specification", async () => {

    async function createCategoryAndGetAllProps(name: string, description: string): Promise<Category> {

      await categoryRepositoryInMemory
        .create(name, description);

      const getCategoryProps = await categoryRepositoryInMemory
        .findOneCategory(name);

      expect(getCategoryProps)
        .toHaveProperty('id');

      return getCategoryProps;
    }

    async function createCarAndGetAllProps(name: string, description: string,
      daily_rate: number, available: boolean,
      license_plate: string, fine_amount: string,
      brand: string, category_id: string): Promise<Car> {

      const props = {
        name, description, daily_rate, available,
        license_plate, fine_amount, brand, category_id
      };

      await carRepositoryInMemory
        .createCar(props);

      const getCarProps = await carRepositoryInMemory
        .findOneCar(name);

      expect(getCarProps)
        .toHaveProperty('id');

      return getCarProps;
    }

    const props: Category = {

      name: "HAT",
      description: "Carro de pequeno porte, um boa opção para o bolso mais apertado, mas sem abrir mão do conforto e da qualidade",
      created_at: new Date()
    }

    const categoryProps = await createCategoryAndGetAllProps(props.name, props.description);

    const car1 = {

      name: "Range Hover",
      description: "Dream Car",
      daily_rate: 560,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: "fine_amount",
      brand: "England Motors",
      category_id: categoryProps.id

    }

    const carProps = await createCarAndGetAllProps(car1.name, car1.description,
      car1.daily_rate, car1.available, car1.license_plate, car1.fine_amount
      , car1.brand, car1.category_id);

    const createSpecification = {

      name: "Car Specification Name Test",
      description: "Car Specification Description Test"
    }

    const { name, description } = createSpecification;
    const car: string = carProps.id;

    await createSpecificationUseCase
      .execute({ name, description, car_id: car });

    const findSpecificationProps = await specificationRepositoryInMemory
      .findByName(name);

    expect(findSpecificationProps)
      .toHaveProperty('id');
  });
})