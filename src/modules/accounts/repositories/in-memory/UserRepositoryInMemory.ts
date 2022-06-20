import { ICreateUserDTO } from '../../Services/Data/ICreateUserDTO';
import { IUserRepository } from '../IUserRepository';
import { User } from '../../model/User';

export class UserRepositoryInMemory implements IUserRepository {

  private repository: User[];

  constructor() {

    this.repository = [];
  }

  async create({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void> {

    const create = {

      name: name,
      email: email,
      username: username,
      password: password,
      driver_license: driver_license,
    }

    const createUser = new User(create);

    Object
      .assign(createUser, {

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

  async verifyUserIsAdmin(sub: string): Promise<User | undefined> {

    const verifyUserAdminProp = await this
      .repository
      .find((user) => user.id === sub);

    console
      .log(verifyUserAdminProp);

    if (verifyUserAdminProp.isAdmin) {

      return verifyUserAdminProp;
    }

    return undefined;
  }

  async updateAdminProp(sub: string): Promise<void> {

    const findUser = await this
      .repository
      .find((user) => user.id === sub);

    if (findUser.isAdmin === false) {

      findUser.isAdmin = true;
    }
  }
}