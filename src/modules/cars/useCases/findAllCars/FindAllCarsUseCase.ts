import { Car } from '@modules/cars/model/Car';
import { ICarRepository } from '../../repositories/ICarRepository'

export class FindAllCarsUseCase {

  constructor(private carRepository: ICarRepository) { }

  async execute(): Promise<Car[]> {

    const findAllCars = await this
      .carRepository
      .findAllCars();

    return findAllCars;
  }
}