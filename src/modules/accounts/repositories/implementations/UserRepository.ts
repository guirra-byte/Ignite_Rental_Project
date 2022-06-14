import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { Repository, getRepository } from "typeorm";
import { User } from "@modules/accounts/model/User";
import { ICreateUserDTO } from "@modules/accounts/Services/Data/ICreateUserDTO";

export class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {

    this.repository = getRepository(User);
  }

  async create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {

    const user = await this
      .repository
      .create({
        name, email,
        password, driver_license,
        id, avatar
      });

    await this.repository.save(user);

  }

  async findOne(email: string): Promise<User> {

    const findUserByEmail = await this
      .repository
      .findOne({ where: { email: email } });

    return findUserByEmail;
  }

  async findAll(): Promise<User[]> {

    const findAllUsers = await this
      .repository
      .find();

    return findAllUsers;
  }

  async findById(sub: string): Promise<User> {

    const findUserById = await this
      .repository
      .findOne({ where: { id: sub } });

    return findUserById;
  }
}