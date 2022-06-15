import { specification as Specification } from "../../model/Specification";
import { ICreateSpecificationDTO } from "../../Services/Data/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../ISpecificationRepository";

import { prisma } from "Shared/infra/Prisma/Client/Client";


export class SpecificationRepository implements ISpecificationsRepository {

  private static INSTANCE: SpecificationRepository;

  constructor(private repository: typeof prisma) { }

  static getInstance(): SpecificationRepository {

    if (!SpecificationRepository.INSTANCE) {

      SpecificationRepository.INSTANCE = new SpecificationRepository(prisma);
    }

    return SpecificationRepository.INSTANCE;

  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

    await this
      .repository
      .specifications
      .create({ data: { name, description } });

  }


  async findByName(name: string): Promise<Specification> {

    const findUniqueSpecification = await this
      .repository
      .specifications
      .findUnique({ where: { name: name } });

    return findUniqueSpecification;
  }

  async findAllSpecifications(): Promise<Specification[]> {

    const findAllSpecifications = await this
      .repository
      .specifications
      .findMany();

    return findAllSpecifications;
  }
}