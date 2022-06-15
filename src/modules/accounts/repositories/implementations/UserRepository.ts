import { IUserRepository } from '../IUserRepository';
import { User } from '../../model/User';
import { prisma } from '../../../../Shared/infra/Prisma/Client/Client';
import { ICreateUserDTO } from '../../Services/Data/ICreateUserDTO';

export class UserRepository implements IUserRepository {

  constructor(private repository: typeof prisma) { }

  private static INSTANCE: UserRepository;

  static getInstance(): UserRepository {

    if (!UserRepository.INSTANCE) {

      UserRepository.INSTANCE = new UserRepository(prisma);
    }

    return UserRepository.INSTANCE;
  }

  async create({ name, email, password, driver_license, avatar, username }: ICreateUserDTO): Promise<void> {

    await this
      .repository
      .user
      .create({ data: { name, email, password, driver_license, avatar, username } });

  }

  async findOne(email: string): Promise<User> {

    const findUserByEmail = await this
      .repository
      .user
      .findUnique({ where: { email: email } });

    return findUserByEmail;
  }

  async findAll(): Promise<User[]> {

    const findAllUsers = await this
      .repository
      .user
      .findMany();

    return findAllUsers;
  }

  async findById(sub: string): Promise<User> {

    const findUserById = await this
      .repository
      .user
      .findUnique({ where: { id: sub } });

    return findUserById;
  }

  async verifyUserIsAdmin(sub: string): Promise<User> {

    const findUser = await this
      .repository
      .user
      .findUnique({ where: { id: sub } });

    if (findUser.isAdmin === true) {

      return findUser;
    }
  }
}