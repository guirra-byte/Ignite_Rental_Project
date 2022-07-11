import { UploadCarImagesRepositoryInMemory } from '../../repositories/in-memory/UploadCarImagesRepositoryInMemory';
import { CarRepositoryInMemory } from '../../repositories/in-memory/CarRepositoryInMemory';

import { UploadCarImagesUseCase } from './UploadCarImageUseCase';
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory';

describe("Upload a new Car Images", () => {

  let uploadCarImagesRepositoryInMemory: UploadCarImagesRepositoryInMemory;
  let categoryRepositoryInMemory: CategoryRepositoryInMemory;
  let carRepositoryInMemory: CarRepositoryInMemory;

  let uploadCarImagesUseCase: UploadCarImagesUseCase;

  beforeEach(async () => {

    uploadCarImagesRepositoryInMemory = new UploadCarImagesRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    carRepositoryInMemory = new CarRepositoryInMemory();

    uploadCarImagesUseCase = new UploadCarImagesUseCase(uploadCarImagesRepositoryInMemory, carRepositoryInMemory);

  });

  test("Should be able Upload Car Images", async () => {

    const category1 = {

      name: "SUV",
      description: "Carro robusto para aguentar o dia a dia corriqueiro"
    }

    await categoryRepositoryInMemory
      .create(category1.name, category1.description);

    const findCategory1 = await categoryRepositoryInMemory
      .findOneCategory(category1.name);

    expect(findCategory1)
      .toHaveProperty('id');

    const createCar = {

      name: "Range Hover",
      description: "Dream Car",
      daily_rate: 700,
      available: true,
      license_plate: "MABEL_22",
      fine_amount: 450,
      brand: "England Motors",
      category_id: findCategory1.id

    }

    const { name, description, daily_rate, available,
      license_plate, fine_amount, brand, category_id } = createCar;

    await carRepositoryInMemory
      .createCar({
        name, description, daily_rate,
        available, license_plate, brand, fine_amount, category_id
      });

    const findCar = await carRepositoryInMemory
      .findOneCar(name);

    expect(findCar)
      .toHaveProperty('id');

    const uploadCarImages = await uploadCarImagesUseCase
      .execute({
        car_id: findCar.id,
        images_name: ["mabel_forever", "mabel_22"]
      });
  })
})