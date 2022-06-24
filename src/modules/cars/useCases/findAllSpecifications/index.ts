import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { FindAllSpecificationsUseCase } from "./FindAllSpecificationsUseCase";
import { FindAllSpecificationsController } from "./FindAllSpecificationsController";

import { Request, Response } from 'express';

const FindAllSpecificationsInstanceIndex = async (request: Request, response: Response) => {

  const specificationRepository = SpecificationRepository.getInstance();

  const findAllSpecificationsUseCase = new FindAllSpecificationsUseCase(specificationRepository);

  const findAllSpecificationsController = new FindAllSpecificationsController(findAllSpecificationsUseCase);

  await findAllSpecificationsController
    .handle(request, response);

  return findAllSpecificationsController;
}

export { FindAllSpecificationsInstanceIndex }