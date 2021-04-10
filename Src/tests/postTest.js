import chai from 'chai';
import http from 'chai-http';
import app from '../server';
import { Op } from 'sequelize';
import Sinon from 'sinon';
import path from 'path';
import Models from '../database/models/index';
import uploader from '../database/config/photoConfig';
import { userCredentials, createdUser } from './mocks/mocks';

chai.use(http);
const { expect, request } = chai;

const { Post, User } = Models;

// const sign = async () => {
//   // console.log(userData.body.data.token);
//   const data = {
//     token: `Bearer ${userData.body.data.token}`,
//   };
//   return data;
//   // console.log(data);
// };

const mockPost = {
  title: 'the best selling books',
  body: 'most of the best selling booksare from heart of africa',
};

describe('posts testing', async (done) => {
  const sandbox = Sinon.createSandbox();
  beforeEach(async () => {
    sandbox.stub(uploader, 'upload').resolves({
      imageUrl: 'hellllooooo',
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
  it('should not create post if no token', async () => {
    const noToken = ' ';
    const res = await request(app)
      .post('/api/posts')
      .field('title', mockPost.title)
      .field('body', mockPost.body)
      .attach('imageUrl', path.resolve(__dirname, './mocks/PROFILE.jpg'))
      .set('auth', noToken);
    expect(res.status).to.be.equal(403);
  });
  it('should create a post', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const res = await request(app)
      .post('/api/posts')
      .field('title', mockPost.title)
      .field('body', mockPost.body)
      .attach('imageUrl', path.resolve(__dirname, './mocks/PROFILE.jpg'))
      .set('authorization', data.token);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message');
  });
  it('should fail to create post if no token provided', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `${userData.body.data.token}`,
    };
    const res = await request(app)
      .post('/api/posts')
      .field('title', mockPost.title)
      .field('body', mockPost.body)
      .attach('imageUrl', path.resolve(__dirname, './mocks/PROFILE.jpg'))
      .set('authorization', data.token);
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });
  it('should not create post if all required field are not passed and no token', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'the best selling books' });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('message');
  });
  it('should find all post created', async () => {
    const post = await Post.create(mockPost);
    post.save();

    const res = await request(app).get('/api/posts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message');
  });
  it('should get a user with passed id', async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).get(`/api/posts/${post.id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message');
  });
  it('should update post with give id and valid token', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).put(`/api/posts/${post.id}`).send({
      title: 'hello mr bigman',
      body: 'this is the world I want ',
    });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('message');
  });
  it('should not update post with given id if no passed token', async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app).put(`/api/posts/${post.id}`).send({
      title: 'hello mr bigman',
      body: 'this is the world I want ',
    });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('message');
  });
  it('should not update if there is a field not filled', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/${post.id}`)
      .set('authorization', data.token)
      .send({ title: 'richard ', body: ' ' });
    expect(res.status).to.be.equal(409);
    expect(res.body).to.have.property('message');
  });
  it('should not update post if passed id is not found', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .put(`/api/posts/5`)
      .field('title', mockPost.title)
      .field('body', mockPost.body)
      .set('authorization', data.token);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property('message');
  });
  it('should not delete post if passed id is not valid', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await await request(app)
      .delete(`/api/posts/`)
      .set('authorization', data.token);
    expect(res.status).to.be.equal(404);
  });
  it('should delete post with given id and valid token', async () => {
    const createUser = await request(app).post('/api/users').send(createdUser);
    const userData = await request(app)
      .post('/api/users/login')
      .send(userCredentials);
    const data = {
      token: `Bearer ${userData.body.data.token}`,
    };
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      .delete(`/api/posts/${post.id}`)
      .set('authorization', data.token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message');
  });
  it('should not delete user with given id if no passed token', async () => {
    const post = await Post.create(mockPost);
    post.save();
    const res = await request(app)
      // .set('auth', token)
      .delete(`/api/posts/${post.id}`);
    // console.log(res);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property('message');
  });
});