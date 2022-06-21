import { ICarRepository } from "../../repositories/ICarRepository";
import { ICarRequestPropsDTO } from "../../Services/Data/ICarRequestPropsDTO";

export class CreateCarUseCase {

  constructor(private carRepository: ICarRepository) { }

  async execute(props: ICarRequestPropsDTO) {

    await this
      .carRepository
      .createCar(props);
  }
}