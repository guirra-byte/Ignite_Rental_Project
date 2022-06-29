import { RentalRepository } from "../../repositories/implementation/RentalRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CreateRentalController } from "./CreateRentalController";

import { DateProvider } from "../../../../Shared/infra/Providers/DateProvider/implementations/DateProvider";

import { Request, Response } from 'express';

const CreateRentalInstanceIndex = async (request: Request, response: Response) => {

  const rentalsRepository = RentalRepository.getInstance();
  const dateProvider = new DateProvider();

  const createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider);

  const createRentalsController = new CreateRentalController(createRentalUseCase);

  await createRentalsController
    .handle(request, response);

  return createRentalsController;
}

export { CreateRentalInstanceIndex }