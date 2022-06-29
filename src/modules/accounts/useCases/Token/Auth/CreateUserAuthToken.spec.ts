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

    await createUserUseCase
      .execute("User Name Test", "User UserName Test",
        "User@gmail.Test", "Mabel_22", "MABEL_2022");

    const createAuthToken = await createUserAuthToken
      .execute({ email: "User@gmail.Test", password: "Mabel_22" });

    expect(createAuthToken)
      .toHaveProperty("token");
  });

  test("User does exists", async () => {

    expect(async () => {

      await createUserAuthToken
        .execute({ email: "User Email Test False", password: "User Password Test" });

    }).rejects
      .toBeInstanceOf(AppError);
  });

  it("User password are incorrect", async () => {

    expect(async () => {

      await createUserAuthToken
        .execute({ email: "User Email Test", password: "User Password Test False" });

    }).rejects
      .toBeInstanceOf(AppError);

  })
});