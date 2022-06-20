import { CarRepository } from '../../repositories/implementations/CarRepository';
import { FindAllCarsUseCase } from './FindAllCarsUseCase';
import { FindAllCarsController } from './FindAllCarsController';

import { Request, Response } from 'express';

const FindAllCarsInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = CarRepository.getInstance();

  const findAllCarsUseCase = new FindAllCarsUseCase(carRepository);

  const findAllCarsController = new FindAllCarsController(findAllCarsUseCase);

  await findAllCarsController
    .handle(request, response);

  return findAllCarsController;
}

export { FindAllCarsInstanceIndex }