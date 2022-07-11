import { UserRepository } from '../../../accounts/repositories/implementations/UserRepository';
import { CarRepository } from '../../../cars/repositories/implementations/CarRepository';
import { RentalRepository } from '../../repositories/implementation/RentalRepository';

import { CreateDevolutionUseCase } from './CreateDevolutionUseCase';
import { CreateDevolutionController } from './CreateDevolutionController';

import { Request, Response } from 'express';
import { CalcProvider } from '../../../../Shared/infra/Providers/CalcRentalProvider/implementations/CalcProvider';
import { DateProvider } from "../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider";

const CreateDevolutionInstanceIndex = async (request: Request, response: Response) => {

  const userRepository: UserRepository = UserRepository.getInstance();
  const carRepository: CarRepository = CarRepository.getInstance();
  const rentalRepository: RentalRepository = RentalRepository.getInstance();
  const requireDateProvider = new DateProvider();

  const calcRentalProvider = new CalcProvider(rentalRepository, requireDateProvider);

  const createDevolutionUseCase = new CreateDevolutionUseCase(userRepository, carRepository, rentalRepository, calcRentalProvider);
  const createDevolutionController = new CreateDevolutionController(createDevolutionUseCase);

  await createDevolutionController
    .handle(request, response);

  return createDevolutionController;
}

export { CreateDevolutionInstanceIndex }