import { specification as Specification } from "../../model/Specification";
import { ICreateSpecificationDTO } from "../../Services/Data/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../ISpecificationRepository";

import { prisma } from "../../../../Shared/infra/Prisma/Client/Client";
import { Specifications } from "@prisma/client";


export class SpecificationRepository implements ISpecificationsRepository {

  private static INSTANCE: SpecificationRepository;

  constructor(private repository: typeof prisma) { }

  static getInstance(): SpecificationRepository {

    if (!SpecificationRepository.INSTANCE) {

      SpecificationRepository.INSTANCE = new SpecificationRepository(prisma);
    }

    return SpecificationRepository.INSTANCE;

  }

  async create({ name, description, car_id }: ICreateSpecificationDTO): Promise<void> {

    await this
      .repository
      .specifications
      .create({
        data: {
          name, description,
          Car: { connect: { id: car_id } }
        }
      });
  }

  async findByName(name: string): Promise<Specification> {

    const findUniqueSpecification = await this
      .repository
      .specifications
      .findUnique({
        where: { name: name },
        include: { Car: true }
      });

    return findUniqueSpecification;
  }

  async findAllSpecifications(): Promise<Specification[]> {

    const findAllSpecifications = await this
      .repository
      .specifications
      .findMany({ include: { Car: true } });

    return findAllSpecifications;
  }

  async findById(ids: string[]): Promise<Specification[]> {

    const findAll = await this.
      repository
      .specifications
      .findMany();

    const compareById = findAll
      .filter(async (specification) =>
        (ids.map(async (id) => (id && specification.id === id))));

    return compareById;

  }
}