import { ICreateSpecificationDTO } from '@modules/cars/Services/Data/ICreateSpecificationDTO';
import { specification as Specification } from '../../model/Specification'
import { ISpecificationsRepository } from '../ISpecificationRepository';

export class SpecificationRepositoryInMemory implements ISpecificationsRepository {

  private specifications: Specification[];

  constructor() {

    this.specifications = [];
  }

  async create({ name, description, car_id }: ICreateSpecificationDTO): Promise<void> {

    const specification: Specification = {

      name: name,
      description: description,
      created_at: new Date(),
      car_id: car_id

    }

    const createSpecification = new Specification();

    Object
      .assign(createSpecification, {

        name: specification.name,
        description: specification.description,
        car_id: specification.car_id
      });

    await this
      .specifications
      .push(createSpecification);
  }

  async findByName(name: string): Promise<Specification> {

    const findSpecification = await this
      .specifications
      .find((specification) => specification.name === name);

    return findSpecification;
  }

  async findAllSpecifications(): Promise<Specification[]> {

    const findAllSpecifications = await this
      .specifications;

    return findAllSpecifications;
  }

  async findById(ids: string[]): Promise<Specification[]> {

    const findSpecifications = await this
      .specifications
      .filter(async (specification) =>
      (ids &&
        ids
          .map(async (id) => specification.id === id)));

    const otherFindMode = await this
      .specifications
      .filter(async (specification) => ids
        .includes(specification.id));

    console.log(otherFindMode);

    return findSpecifications;
  }
}