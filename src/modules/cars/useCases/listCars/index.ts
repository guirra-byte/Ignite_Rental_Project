import { CarRepository } from "../../repositories/implementations/CarRepository";
import { ListCarsUseCase } from "./ListCarsUseCase";
import { ListCarsController } from "./ListCarsController";

import { Request, Response } from 'express';

const ListCarsInstanceIndex = async (request: Request, response: Response) => {

  const carRepository = CarRepository.getInstance();

  const listCarsUseCase = new ListCarsUseCase(carRepository);

  const listCarsController = new ListCarsController(listCarsUseCase);

  listCarsController
    .handle(request, response);

  return listCarsController;
}

export { ListCarsInstanceIndex }