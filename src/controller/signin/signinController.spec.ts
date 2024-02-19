import { app } from "../../server";
import request from "supertest";

describe("Login User Controller", () => {
  it("shoud be able to login the user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "valid_email@valid_email.com",
      password: "any_password",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Usuário autenticado com sucesso");
  });

  it("should throw an error if the email is not provided", async () => {
    const response = await request(app).post("/auth/login").send({
      password: "any_password",
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("O e-mail é obrigatório");
  });

  it("should throw an error if the password is not provided", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "valid_email@valid_email.com",
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("A senha é obrigatória");
  });

  it("should throw an error if the email don`t exist", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: `${crypto.randomUUID()}@any_email.com`,
        password: "any_password",
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Usuário não encontrado");
  });
});
