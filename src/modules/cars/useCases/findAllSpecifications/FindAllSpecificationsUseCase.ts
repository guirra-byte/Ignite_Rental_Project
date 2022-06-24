import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

export class FindAllSpecificationsUseCase {

  constructor(private specificationRepository: ISpecificationsRepository) { }

  async execute() {

    const findAll = await this
      .specificationRepository
      .findAllSpecifications();

    return findAll;
  }
}