import { specification } from "../model/Specification";
import { ICreateSpecificationDTO } from "../Services/Data/ICreateSpecificationDTO";

export interface ISpecificationsRepository {

  create({ name, description }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<specification>
  findAllSpecifications(): Promise<specification[]>

}