import { authRepositoryInMemory } from "../../repositories/in-memory/authReposotory";
import { AuthService } from "./authService";
import bcrypt from "bcrypt";
import * as fs from "fs";
import * as path from "path";
import * as imageUploader from "../../helpers/imageUploader";

jest.mock("bcrypt");
jest.mock("firebase-admin");
jest.mock("../../helpers/imageUploader");

describe("Create user", () => {
  const makeSut = () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue("test");
    (bcrypt.hash as jest.Mock).mockResolvedValue("test");
    (imageUploader.uploadImage as jest.Mock).mockResolvedValue("fakeImageUrl");

    const fakeImage = fs.createReadStream(
      path.resolve("./src/services", "imageTest.png")
    );

    const authRepository = new authRepositoryInMemory();
    const authService = new AuthService(authRepository);
    return { fakeImage, authService, authRepository };
  };

  it("should be able to create a new user", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      bio: "valid_bio",
      email: "valid_email@mail.com",
      password: "valid_password",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    const user = await authService.registerUser(userData);
    expect(imageUploader.uploadImage).toHaveBeenCalled();
    expect(user).toHaveProperty("id");
  });

  it("should throw an error if the email is already in use", async () => {
    const { authService, fakeImage, authRepository } = makeSut();
    authRepository.exists = jest.fn().mockResolvedValue(true);

    const userData: any = {
      name: "valid_name",
      bio: "valid_bio",
      email: "valid_email@mail.com",
      password: "valid_password",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "O e-mail já está em uso"
    );
  });

  it("should throw an error if the name is not provided", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      bio: "valid_bio",
      email: "valid_email@mail.com",
      password: "valid_password",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "O nome é obrigatório"
    );
  });

  it("should throw an error if the email is not provided", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      bio: "valid_bio",
      password: "valid_password",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "O e-mail é obrigatório"
    );
  });

  it("should throw an error if the password is not provided", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      email: "valid_email@mail.com",
      bio: "valid_bio",
      confirmPassword: "valid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "A senha é obrigatória"
    );
  });

  it("should throw an error if the password confirmation is not provided", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      email: "valid_email@mail.com",
      bio: "valid_bio",
      password: "valid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "A confirmação de senha é obrigatório"
    );
  });

  it("should throw an error if the image is provided", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      email: "valid_email@mail.com",
      bio: "valid_bio",
      password: "valid_password",
      confirmPassword: "valid_password",
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "A imagem é obrigatória"
    );
  });

  it("should throw an error if the password and the password confirmation is different", async () => {
    const { authService, fakeImage } = makeSut();

    const userData: any = {
      name: "valid_name",
      email: "valid_email@mail.com",
      bio: "valid_bio",
      password: "valid_password",
      confirmPassword: "invalid_password",
      images: [fakeImage as any],
    };

    await expect(authService.registerUser(userData)).rejects.toThrow(
      "As senhas são diferentes"
    );
  });
});
