import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CarRepository } from "../../repositories/implementations/CarRepository";


import { CreateSpecificationsUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

import { Request, Response } from 'express';

const CreateSpecificationInstanceIndex = async (request: Request, response: Response) => {

  const specificationRepository = SpecificationRepository.getInstance();
  const carRepository = CarRepository.getInstance();

  const createSpecificationUseCase = new CreateSpecificationsUseCase(specificationRepository
    , carRepository);

  const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

  await createSpecificationController
    .handle(request, response);

  return createSpecificationController;
}

export { CreateSpecificationInstanceIndex }