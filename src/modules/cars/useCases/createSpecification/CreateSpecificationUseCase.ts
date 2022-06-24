import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';
import { Car } from '../../model/Car';
import { ICarRepository } from "../../repositories/ICarRepository";

export interface IRequest {
  name: string,
  description: string,
  car_id: string
}

export class CreateSpecificationsUseCase {

  constructor(private specificationsRepository: ISpecificationsRepository,
    private carRepository: ICarRepository) {

  }

  async execute({ name, description, car_id }: IRequest): Promise<void> {

    const verifyCarExists = await this
      .carRepository
      .findById(car_id);

    if (!verifyCarExists) {

      throw new AppError("Car does exists");
    }

    const verifySpecificationAlreadyExists = await this
      .specificationsRepository
      .findByName(name);

    if (verifySpecificationAlreadyExists) {

      throw new AppError("Specification Already Exists");
    }

    const createSpecifications = await this
      .specificationsRepository
      .create({
        name,
        description,
        car_id
      });

    return createSpecifications;
  }
}