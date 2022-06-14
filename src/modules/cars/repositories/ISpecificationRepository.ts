import { specification } from "../model/Specification";
import { ICreateSpecificationDTO } from "../services/ICreateSpecificationDTO";

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<specification[]>
}