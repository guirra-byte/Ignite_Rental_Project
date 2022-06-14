import { ICreateUserDTO } from '@modules/accounts/Services/Data/ICreateUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { User } from '@modules/accounts/model/User';

export class UserRepositoryInMemory implements IUserRepository {

  private repository: User[]

  constructor() {

    this.repository = []
  }

  async create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {

    const create = {

      name: name,
      email: email,
      password: password,
      driver_license: driver_license,
    }

    const createUser = new User();

    Object.assign(createUser, {

      name: create.name,
      email: create.email,
      password: create.password,
      driver_license: create.driver_license
    });

    await this
      .repository
      .push(createUser);
  }

  async findOne(email: string): Promise<User> {

    const findOneUser = await this
      .repository
      .find((user) => email === user.email);

    return findOneUser;
  }

  async findAll(): Promise<User[]> {

    const findAll = await this.repository;
    return findAll
  }

  async findById(sub: string): Promise<User> {

    const findUserById = await this
      .repository
      .find((user) => sub === user.id)

    return findUserById;
  }
}