import { AppError } from '../../../../Shared/infra/http/Errors/AppError';
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from '../../useCases/CreateUser/CreateUserUseCase';

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
      username: "User UserName Test",
      email: "User@gmail.Test",
      password: "Mabel_22",
      driver_license: "Mabel_2022"
    }

    const { name, username, email, password, driver_license } = user;

    await createUserUseCase
      .execute(name, username, email, password, driver_license);

    const findUser = await userRepositoryInMemory
      .findOne(email);

    expect(findUser)
      .toHaveProperty("id");
  });

  test("Should not be able create User with user already exists", async () => {

    expect(async () => {

      await createUserUseCase
        .execute("User Name Test", "User UserName Test",
          "User@gmail.Test", "Mabel_22", "Mabel_2022");

      const verifyUserAlreadyExists = await userRepositoryInMemory
        .findOne("User@gmail.Test");

      expect(verifyUserAlreadyExists)
        .toHaveProperty("id");

      await createUserUseCase
        .execute("User2 Name Test", "User2 UserName2 Test",
          "User2@gmail.Test", "Mabel2_22", "Mabel2_2022");

      const verifyUserAlreadyExistsAgain = await userRepositoryInMemory
        .findOne("User2@gmail.Test");

      if (verifyUserAlreadyExistsAgain) {

        throw new AppError("This User already exists");
      }

      await createUserUseCase
        .execute("User2 Name Test", "User2 UserName2 Test",
          "User2@gmail.Test", "Mabel2_22", "Mabel2_2022");

    }).rejects
      .toBeInstanceOf(AppError);
  });
});