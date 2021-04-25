import chai from "chai";
import http from "chai-http";
import app from "../server";
import Sinon from "sinon";
import path from "path";
import Models from "../database/models/index";
import uploader from "../database/config/photoConfig";
import { userCredentials, createdUser } from "./mocks/mocks";

chai.use(http);
const { expect, request } = chai;

const { Post } = Models;

const mockPost = {
  title: "the best selling books",
  body: "most of the best selling booksare from heart of africa",
  imageUrl: path.resolve(__dirname, "./mocks/PROFILE.jpg"),
};
const mockUpdate = {
  title: "the money making through programing",
  body: "programing in these days it is making youth have alot of money",
  imageUrl: path.resolve(__dirname, "./mocks/CAPUTURE.PNG"),
};

describe("posts testing", async () => {
  const sandbox = Sinon.createSandbox();
  beforeEach(async () => {
    sandbox.stub(uploader, "upload").resolves({
      imageUrl: "hellllooooo",
    });
    await Post.destroy({
      where: {},
      truncate: true,
    });
  });
  afterEach(async () => {
    await Post.destroy({
      where: {},
      truncate: true,
    });
    sandbox.restore();
  });

  // testing starting server,

  it("should make sure that the server is up and runing", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.be.equal(200);
  });

  // testing if creating user is authenticated.

  it("should not create post if no token provided", async () => {
    const noToken = " ";
    const res = await request(app)
      .post("/api/posts")
      .field("title", mockPost.title)
      .field("body", mockPost.body)
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"))
      .set("auth", noToken);
    expect(res.status).to.be.equal(403);
  });

  // testing creating post endpoint

  it("should create a post", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const res = await request(app)
      .post("/api/posts")
      .field("title", mockPost.title)
      .field("body", mockPost.body)
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"))
      .set("authorization", data.token);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property("message");
  });

  it("should fail to create post if provided token is not valid", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `${userData.body.data.token}`,
    };
    const res = await request(app)
      .post("/api/posts")
      .field("title", mockPost.title)
      .field("body", mockPost.body)
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"))
      .set("authorization", data.token);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property("message");
  });

  it("should not create post if all required field are not passed and no token", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ title: "the best selling books" });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property("message");
  });

  it("should find all post created", async () => {
    const post = await Post.create(mockPost);
    post.save();

    const res = await request(app).get("/api/posts");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not be able to find post", async () => {
    const post = await Post.create(mockPost);
    post.save();

    const res = await request(app).get("/api/posts/4");
    expect(res.status).to.be.equal(404);
  });
  it("should get a user with passed id", async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).get(`/api/posts/${post.id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not get non existing post", async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).get(`/api/posts/${2}`);
    expect(res.status).to.be.equal(404);
  });
  it("should update post with given id and valid token", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();

    const res = await request(app)
      .put(`/api/posts/${post.id}`)
      .attach("imageUrl", path.resolve(__dirname, "./mocks/CAPUTURE.PNG"))
      .set("authorization", data.token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not update post with given id if no passed token", async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/${post.id}`)
      .field("title", "hello world")
      .field("body", "this is me coming to code you world")
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"));
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property("message");
  });

  it("should not update if there is a field not filled", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/${post.id}`)
      .set("authorization", data.token)
      .field("title", "richard")
      .field("body", "")
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"));
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property("message");
  });

  it("should not update if there are fields missing", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/${post.id}`)
      .set("authorization", data.token)
      .field("body", " ")
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"));
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property("message");
  });

  it("should not update post if passed id is not found", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/5`)
      .field("title", mockPost.title)
      .field("body", mockPost.body)
      .attach("imageUrl", path.resolve(__dirname, "./mocks/PROFILE.jpg"))
      .set("authorization", data.token);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property("message");
  });

  it("should not delete post if passed id is not valid", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await await request(app)
      .delete(`/api/posts/5`)
      .set("authorization", data.token);
    expect(res.status).to.be.equal(404);
  });

  it("should delete post with given id and valid token", async () => {
    const createUser = await request(app).post("/api/users").send(createdUser);
    const userData = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .delete(`/api/posts/${post.id}`)
      .set("authorization", data.token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should not delete user with given id if no passed token", async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).delete(`/api/posts/${post.id}`);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property("message");
  });
});
