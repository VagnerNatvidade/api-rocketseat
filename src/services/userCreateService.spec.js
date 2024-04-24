const AppError = require("../utils/AppError");

const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  });

  it("user should be create", async () => {
    const user = {
      name: "user test",
      email: "user@test.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("User not should be created with exist email", async () => {
    const user1 = {
      name: "user test 1",
      email: "user@test.com",
      password: "123",
    };

    const user2 = {
      name: "user test 2",
      email: "user@test.com",
      password: "456",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Email already exist!")
    );
  });
});
