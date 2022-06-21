import { User } from "../model/User";
import { ICreateUserDTO } from "../Services/Data/ICreateUserDTO";

export interface IUserRepository {

  create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void>
  findOne(username: string): Promise<User>
  findAll(): Promise<User[]>
  findById(sub: string): Promise<User>
  verifyUserIsAdmin(sub: string): Promise<User | undefined>
  updateAdminProp(sub: string): Promise<void>

}