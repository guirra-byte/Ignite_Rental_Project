import { ICarRepository } from "../../repositories/ICarRepository";
import { Car } from "../../model/Car";

export class ListCarsUseCase {

  constructor(private carsRepository: ICarRepository) { }

  async execute(): Promise<Car[]> {

    const allCars = await this
      .carsRepository
      .findAllCars();

    return allCars;
  }
}