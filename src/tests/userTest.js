import chai from "chai";
import http from "chai-http";
import app from "../server";
import { Op } from "sequelize";
import encryption from "../app/helpers/auth";
import Models from "../database/models/index";

chai.use(http);
const { expect, request } = chai;

const { User } = Models;

const mockUser = {
  username: "nicholar",
  email: "nichlas123@gmail.com",
  password: "hello1234",
};

const mockLogin = {
  email: "nicholas123@gmail.com",
  password: "hello1234",
};

describe("user testing", () => {
  beforeEach(async () => {
    await User.destroy({
      where: { email: { [Op.not]: ["nicholas123@gmail.com"] } },
    });
  });
  afterEach(async () => {
    await User.destroy({
      where: { email: { [Op.not]: ["nicholas123@gmail.com"] } },
    });
  });
  it("should register a user if all fields are filled well", async () => {
    const res = await request(app).post("/api/users").send(mockUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property(
      "message",
      "user Successfully Registered"
    );
    expect(res.body).to.be.a("object");
  });
  it("should not register a user if there is a field not filled", async () => {
    const res = await request(app).post("/api/users").send({
      email: "jamescorden@mail.com",
    });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property("message");
    expect(res.body).to.be.a("object");
  });
  it("should get user of given id", async () => {
    const user = await User.create(mockUser);
    user.save();
    const res = await request(app).get(`/api/users/${user.id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });
  it("should find all users", async () => {
    const user = await User.create(mockUser);
    user.save();
    const res = await request(app).get("/api/users");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });
  it("should update user with given id", async () => {
    const user = await User.create(mockUser);
    user.save();
    const res = await request(app)
      .put(`/api/users/${user.id}`)
      .send({ username: "richard", password: "yagotvshow" });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });
  it("should delete user with a given id", async () => {
    const user = await User.create(mockUser);
    user.save();
    const res = await request(app).delete(`/api/users/${user.id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "successfully deleted user");
  });
  it("should login a regitered user and provide token", async () => {
    const user = await request(app).post("/api/users").send(mockUser);
    const password = mockUser.password;

    const email = user.body.data.email;
    const res = await request(app)
      .post("/api/users/login")
      .send({ email, password });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "user logged in successfully");
  });
});
