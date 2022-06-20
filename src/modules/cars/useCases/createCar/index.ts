import { CarRepository } from "@modules/cars/repositories/implementations/CarRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CreateCarController } from "./CreateCarController";

import { Request, Response } from 'express';

const CreateCarInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = CarRepository.getInstance();

  const createCarUseCae = new CreateCarUseCase(carRepository);

  const createCarController = new CreateCarController(createCarUseCae);

  await createCarController
    .handle(request, response);

  return createCarController;
}

export { CreateCarInstanceIndex }