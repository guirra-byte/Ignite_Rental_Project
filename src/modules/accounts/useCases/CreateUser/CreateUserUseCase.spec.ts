import { AppError } from "@error/AppError";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";

let userRepository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {

  beforeEach(() => {

    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);

  });
  it("Create a new User", async () => {

    const user = {

      name: "User Name Test",
      email: "User Email Test",
      password: "User Password Test",
      driver_license: "User Driver-License Test"
    }

    const createUser = await createUserUseCase
      .execute(user.name, user.email, user.password, user.driver_license);

    const { email } = user;

    const findUser = await userRepository
      .findOne(email);

    expect(findUser)
      .toHaveProperty("id");
  });

  it("Verify User Already Exists", async () => {


    expect(async () => {

      const user = {

        name: "User Name Test",
        email: "User Email Test",
        password: "User Password Test",
        driver_license: "User Driver-License Test"

      }

      const { name, email, driver_license, password } = user;

      await createUserUseCase
        .execute(name, email, password, driver_license);

      await createUserUseCase
        .execute(name, email, password, driver_license);

      await createUserUseCase
        .execute(name, email, password, driver_license);

    }).rejects
      .toBeInstanceOf(AppError);
  })
});