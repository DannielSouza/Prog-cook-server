import { app } from "../../server";
import request from "supertest";
import * as path from "path";
import crypto from "crypto";

describe("Create User Controller", () => {
  const makeSut = () => {
    const fakeImage = path.resolve("./src/services", "imageTest.png");

    return { fakeImage };
  };

  it("Shoud be able to create a new user", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", `any_email${crypto.randomUUID()}@any_email.com`)
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Usuário criado com sucesso");
    expect(response.body.data).toHaveProperty("id");
  });

  it("should throw an error if the email is already in use", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O e-mail já está em uso");
  });

  it("should throw an error if the name is not provided", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O nome é obrigatório");
  });

  it("should throw an error if the email is not provided", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O e-mail é obrigatório");
  });

  it("should throw an error if the password is not provided", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("confirmPassword", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A senha é obrigatória");
  });

  it("should throw an error if the password confirmation is not provided", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A confirmação de senha é obrigatória");
  });

  it("should throw an error if the image is provided", async () => {
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "any_password");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A imagem é obrigatória");
  });

  it("should throw an error if the password and the password confirmation is different", async () => {
    const { fakeImage } = makeSut();
    const response = await request(app)
      .post("/auth/register")
      .field("email", "invalid_email@invalid_email.com")
      .field("name", "any_name")
      .field("bio", "any_bio")
      .field("password", "any_password")
      .field("confirmPassword", "invalid_password")
      .attach("image", fakeImage);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("As senhas são diferentes");
  });
});
