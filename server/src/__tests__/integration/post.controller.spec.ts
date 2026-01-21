/*
  Mock the Prisma client module so the real Prisma client file is never loaded.

  This prevents:
  - Jest trying to execute Prisma's ESM-generated client
  - `import.meta` syntax errors in Jest (CommonJS environment)
  - Real database connections during tests

  All Prisma calls are replaced with mock functions.
*/

jest.mock('../../../lib/prisma', () => {
  return {
    prisma: {
      post: {
        create: jest.fn(),
        update: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
    },
  };
});

import request from 'supertest'
import { app } from "../../app"
import { PostService } from '../../modules/posts/posts.service';
import registerRoutes from '../../register.routes';

describe('POST /posts', () => {

  let mockService: any;


  beforeAll(() => {
    registerRoutes(app)
  })


  it('should return status 200', async () => {
    const res = await request(app).get('/api/posts/health').expect(200);
  })

  it('should create post', async () => {
    const payload = { title: 'Hello', description: 'World' };
    const fakePost = { id: 1, userId: 1, ...payload };

    const MockedPostService = PostService as jest.Mock;
    MockedPostService.prototype.create = jest.fn().mockResolvedValue(fakePost);

    const res = await request(app)
      .post('/api/posts')
      .send(payload)
      .expect(201);

    expect(res.body).toEqual({
      message: 'Post created successfully',
      post: { ...fakePost }
    });
    expect(MockedPostService.prototype.create)
      .toHaveBeenCalledWith(1, payload);
  });
})