import { AppError } from '../../../../Shared/infra/http/Errors/AppError';
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from '../../useCases/CreateUser/CreateUserUseCase';

function userAlreadyExists(): Error {

  throw new AppError('This User already exists');
}

describe("Create User", () => {

  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {

    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

  });

  test("Should be able create a new User", async () => {

    const user = {

      name: "User Name Test",
      username: "User Username Test",
      email: "User Email Test",
      password: "User Password Test",
      driver_license: "User Driver-License Test"
    }

    await createUserUseCase
      .execute(user.name, user.username, user.email, user.password, user.driver_license);

    const { email } = user;

    const findUser = await userRepositoryInMemory
      .findOne(email);

    expect(findUser)
      .toHaveProperty("id");
  });

  test("Should not be able create User with user already exists", async () => {

    expect(async () => {

      const user = {

        name: "User Name Test",
        username: "User Username Test",
        email: "User Email Test",
        password: "User Password Test",
        driver_license: "User Driver-License Test"

      }

      const { name, username, email, driver_license, password } = user;

      await createUserUseCase
        .execute(name, username, email, password, driver_license);

      const verifyUserAlreadyExists = await userRepositoryInMemory
        .findOne(email);

      expect(verifyUserAlreadyExists)
        .toHaveProperty("id");

      await createUserUseCase
        .execute(name, username, email, password, driver_license);

      const verifyUserAlreadyExistsAgain = await userRepositoryInMemory
        .findOne(email);

      if (verifyUserAlreadyExistsAgain) {

        throw new AppError("This User already exists");
      }

      await createUserUseCase
        .execute(name, username, email, password, driver_license);

    }).rejects
      .toBeInstanceOf(AppError);
  });
});