import { CarRepository } from "../../repositories/implementations/CarRepository";
import { ListCarsAvailableUseCase } from "./ListCarsAvailableUseCase";
import { ListCarsAvailableController } from "./ListCarsAvailableController";

import { Request, Response } from 'express';

const ListCarsAvailableInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = CarRepository.getInstance();

  const listCarsAvailableUseCase = new ListCarsAvailableUseCase(carRepository);

  const listCarsAvailableController = new ListCarsAvailableController(listCarsAvailableUseCase);

  listCarsAvailableController
    .handle(request, response);
}

export { ListCarsAvailableInstanceIndex }