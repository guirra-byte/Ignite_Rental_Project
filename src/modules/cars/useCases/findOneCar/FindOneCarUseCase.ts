import { Car } from "../../model/Car";
import { ICarRepository } from "../../repositories/ICarRepository";

export class FindOneCarUseCase {

  constructor(private carRepository: ICarRepository) { }

  async execute(name: string): Promise<Car> {


    const findOneCar = await this
      .carRepository
      .findOneCar(name);

    return findOneCar;
  }
}