/*
  this will mock prisma so it doens't really use the actual
  prisma that uses ESM which conflicts with jest compilation
  which causes the annoying error
*/

jest.mock('../../../lib/prisma', () => {
  return {
    prisma: {
      post: {
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn()
      },
      user: {
        findUnique: jest.fn(),
      },
    },
  };
});
/*------------------------------------*/

import request from 'supertest'
import { app } from "../../app"
import postsRoutes from '../../modules/posts/posts.route'
import { prisma } from '../../../lib/prisma';

describe('POST /posts', () => {
  beforeAll(() => {
    app.use('/api/posts', postsRoutes);
  })

  it('should return status 200', async () => {
    const res = await request(app).get('/api/posts/health').expect(200);
  })

  it('should create post -> status 201', async () => {
    const payload = { title: 'Hello', description: 'World' };
    const fakePost = { id: 1, userId: 1, ...payload };

    // mocking prisma's return value
    (prisma.post.create as jest.Mock).mockResolvedValue(fakePost)

    const res = await request(app)
      .post('/api/posts')
      .send(payload)
      .expect(201);

    expect(res.body).toEqual({
      message: 'Post created successfully',
      post: fakePost
    });
  });

  it('should get all posts -> status 200', async () => {
    const res = await request(app).get('/api/posts').expect(200)
  })

  it('should update post -> status 200', async () => {
    const postId = 1;
    const payload = { title: 'Hello', description: 'World' };
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .send(payload)
      .expect(200);

  })

})