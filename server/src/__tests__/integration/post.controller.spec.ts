// jest.mock('../../../lib/prisma', () => {
//   return {
//     prisma: {
//       post: {
//         create: jest.fn(),
//         update: jest.fn(),
//       },
//     },
//   };
// });



import supertest from 'supertest'
import { app } from "../../app"
import registerRoutes from '../../register.routes'

beforeAll(() => {
  registerRoutes(app)
})

describe('POST /posts', () => {
  it('create user and return 201', async () => {
    const input = { title: 'create title', description: 'create description' }

    const res = await supertest(app)
      .post('/api/posts')
      .send(input)
      .expect(201)

    expect(res.body.message).toEqual('Post created successfullxy')
    // expect(res.body.post).toEqual({
    //   id: 1,
    //   ...input,
    //   userId: 1
    // })
  })


})