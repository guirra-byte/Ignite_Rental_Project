import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from 'tsyringe';
import { AppError } from "../../../../Errors/AppError";

interface IRequest {
  name: string,
  description: string
}

@injectable()
export class CreateSpecificationsUseCase {

  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationsRepository) {

  }

  async execute({ name, description }: IRequest): Promise<void> {

    const verifySpecificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (verifySpecificationAlreadyExists) {

      throw new AppError("Specification Already Exists");
    }

    const createSpecifications = await this.specificationsRepository.create({
      name,
      description
    });

    return createSpecifications;
  }
}