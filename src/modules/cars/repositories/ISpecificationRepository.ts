import { specification as Specification } from "../model/Specification";
import { ICreateSpecificationDTO } from "../Services/Data/ICreateSpecificationDTO";

export interface ISpecificationsRepository {

  create({ name, description }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
  findAllSpecifications(): Promise<Specification[]>
  findById(ids: string[]): Promise<Specification[]>

}