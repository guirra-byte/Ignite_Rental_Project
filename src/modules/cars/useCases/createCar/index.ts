import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CreateCarController } from "./CreateCarController";

import { Request, Response } from 'express';

const CreateCarInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = new CarRepositoryInMemory();

  const createCarUseCae = new CreateCarUseCase(carRepository);

  const createCarController = new CreateCarController(createCarUseCae);

  await createCarController
    .handle(request, response);

  return createCarController;
}

export { CreateCarInstanceIndex }