import { AuthUserUseCase } from "./AuthUserUseCase";
import { CreateUserUseCase } from "../../CreateUser/CreateUserUseCase";

import { AppError } from '../../../../../Errors/AppError';

import { UserRepositoryInMemory } from '../../../repositories/in-memory/UserRepositoryInMemory';

let createUserAuthToken: AuthUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepository: UserRepositoryInMemory;


function compileEmailAppError() {

  throw new AppError("Email or Password are incorrect, but now is a Email!");
}

function compilePasswordAppError() {

  throw new AppError("Email or Password are incorrect!");
}

describe("Create User Auth Token", () => {

  beforeEach(() => {

    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    createUserAuthToken = new AuthUserUseCase(userRepository);
  });

  it("Create User Auth Token", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test",
      password: "User Password Test",
      driver_license: "User Driver-License Test"
    }

    await createUserUseCase
      .execute(user.name, user.email, user.password, user.driver_license);

    const { email, password } = user;

    const createAuthToken = await createUserAuthToken
      .execute({ email, password });

    expect(createAuthToken)
      .toHaveProperty("token");
  });

  it("User does exists", async () => {

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