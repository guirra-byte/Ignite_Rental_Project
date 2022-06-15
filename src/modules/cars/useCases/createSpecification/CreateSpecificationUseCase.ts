import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";
import { AppError } from '../../../../Shared/infra/http/Errors/AppError';

interface IRequest {
  name: string,
  description: string
}

export class CreateSpecificationsUseCase {

  constructor(
    private specificationsRepository: ISpecificationsRepository) {

  }

  async execute({ name, description }: IRequest): Promise<void> {

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
        description
      });

    return createSpecifications;
  }
}