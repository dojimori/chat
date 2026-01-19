jest.mock('../../../lib/prisma', () => {
  return {
    prisma: {
      post: {
        create: jest.fn(),
        update: jest.fn(),
      },
    },
  };
});

import supertest from 'supertest'
import { app } from "../../app"

describe('POST /posts', () => {
  it('create user and return 201', async () => {
    const input = { title: 'create title', description: 'create description' }

    const res = await supertest(app)
      .post('/api/posts')
      .send(input)
      .expect(201)
  })


})