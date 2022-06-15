import { User } from "@modules/accounts/model/User";
import { ICreateUserDTO } from "@modules/accounts/Services/Data/ICreateUserDTO";

export interface IUserRepository {

  create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void>
  findOne(username: string): Promise<User>
  findAll(): Promise<User[]>
  findById(sub: string): Promise<User>
  verifyUserIsAdmin(sub: string): Promise<User | undefined>

}