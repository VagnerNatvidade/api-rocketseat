const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError.js");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExist = await this.userRepository.FindByEmail(email);

    if (checkUserExist) {
      throw new AppError("Email already exist!");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
