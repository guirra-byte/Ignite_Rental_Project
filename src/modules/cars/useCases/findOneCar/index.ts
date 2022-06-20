import { CarRepository } from '../../repositories/implementations/CarRepository';
import { FindOneCarUseCase } from './FindOneCarUseCase';
import { FindOneCarController } from './FindOneCarController';

import { Request, Response } from 'express';

const FindOneCarInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = CarRepository.getInstance();

  const findOneCarUseCase = new FindOneCarUseCase(carRepository);

  const findOneCarController = new FindOneCarController(findOneCarUseCase);

  await findOneCarController
    .handle(request, response);

  return findOneCarController;
}

export { FindOneCarInstanceIndex }