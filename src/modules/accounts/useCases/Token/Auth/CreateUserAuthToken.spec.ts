import { AuthUserUseCase } from "./AuthUserUseCase";
import { CreateUserUseCase } from "../../CreateUser/CreateUserUseCase";

import { AppError } from '../../../../../Shared/infra/http/Errors/AppError';

import { UserRepositoryInMemory } from '../../../repositories/in-memory/UserRepositoryInMemory';

describe("Create User Auth Token", () => {

  let createUserAuthToken: AuthUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepositoryInMemory;

  beforeEach(async () => {

    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    createUserAuthToken = new AuthUserUseCase(userRepository);
  });

  test("Create User Auth Token", async () => {

    const user = {

      name: "User Name Test",
      username: "User Username Test",
      email: "User Email Test",
      password: "User Password Test",
      driver_license: "User Driver-License Test"
    }

    await createUserUseCase
      .execute(user.name, user.username, user.email, user.password, user.driver_license);

    const { email, password } = user;

    const createAuthToken = await createUserAuthToken
      .execute({ email, password });

    expect(createAuthToken)
      .toHaveProperty("token");
  });

  test("User does exists", async () => {

    expect(async () => {

      const user = {

        email: "User Email Test False",
        password: "User Password Test"
      }

      const { email, password } = user;

      await createUserAuthToken
        .execute({ email, password });

    }).rejects
      .toBeInstanceOf(AppError);
  });

  it("User password are incorrect", async () => {

    expect(async () => {

      const user = {

        email: "User Email Test",
        password: "User Password Test False"
      }

      const { email, password } = user;

      await createUserAuthToken
        .execute({ email, password });

    }).rejects
      .toBeInstanceOf(AppError);

  })
});