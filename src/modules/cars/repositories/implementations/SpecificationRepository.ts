import { specification as Specification } from "../../model/Specification";
import { ICreateSpecificationDTO } from "../../Services/Data/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "../ISpecificationRepository";
import { Repository, getRepository } from "typeorm";


export class SpecificationRepository implements ISpecificationsRepository {

  private allSpecifications: Repository<Specification>

  constructor() {

    this
      .allSpecifications = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {

    const specifications = this.allSpecifications.create({
      name,
      description
    });

    await this
      .allSpecifications
      .insert(specifications);
    //Insert do DataBase (Banco de Dados)
  }


  async findByName(name: string): Promise<Specification[]> {

    const specificationName = name;

    const verifySpecificationAlreadyExists = await this
      .allSpecifications
      .find({ where: { name: specificationName } });

    return verifySpecificationAlreadyExists;
  }
}