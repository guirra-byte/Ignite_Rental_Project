import { UserRepository } from '../../../accounts/repositories/implementations/UserRepository';
import { CarRepository } from '../../../cars/repositories/implementations/CarRepository';
import { RentalRepository } from '../../repositories/implementation/RentalRepository';

import { CreateDevolutionUseCase } from './CreateDevolutionUseCase';
import { CreateDevolutionController } from './CreateDevolutionController';

import { Request, Response } from 'express';
import { DateProvider } from "../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider";

const CreateDevolutionInstanceIndex = async (request: Request, response: Response) => {

  const userRepository: UserRepository = UserRepository.getInstance();
  const carRepository: CarRepository = CarRepository.getInstance();
  const rentalRepository: RentalRepository = RentalRepository.getInstance();
  const requireDateProvider: DateProvider = new DateProvider();

  const createDevolutionUseCase = new CreateDevolutionUseCase(userRepository, carRepository, rentalRepository, requireDateProvider);
  const createDevolutionController = new CreateDevolutionController(createDevolutionUseCase);

  await createDevolutionController
    .handle(request, response);

  return createDevolutionController;
}

export { CreateDevolutionInstanceIndex }