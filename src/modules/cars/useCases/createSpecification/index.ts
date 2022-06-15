import { SpecificationRepository } from "@modules/cars/repositories/implementations/SpecificationRepository";
import { CreateSpecificationsUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

import { Request, Response } from 'express';

const CreateSpecificationInstanceIndex = async (request: Request, response: Response) => {

  const specificationRepository = SpecificationRepository.getInstance();

  const createSpecificationUseCase = new CreateSpecificationsUseCase(specificationRepository);

  const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

  await createSpecificationController
    .handle(request, response);

  return createSpecificationController;
}

export { CreateSpecificationInstanceIndex }