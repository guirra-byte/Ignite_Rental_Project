import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ICarRequestPropsDTO } from "@modules/cars/Services/Data/ICarRequestPropsDTO";

export class CreateCarUseCase {

  constructor(private carRepository: ICarRepository) { }

  async execute(props: ICarRequestPropsDTO) {

    await this
      .carRepository
      .createCar(props);
  }
}