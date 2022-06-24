import { ICarRepository } from "../../repositories/ICarRepository";
import { Car } from '../../model/Car';

interface IRequest {

  name?: string
  brand?: string
  category_id?: string
}

export class ListCarsAvailableUseCase {

  constructor(private carRepository: ICarRepository) { }

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {

    const listCarsAvailable = await this
      .carRepository
      .findAvailable(brand, category_id, name);

    return listCarsAvailable;
  }
}