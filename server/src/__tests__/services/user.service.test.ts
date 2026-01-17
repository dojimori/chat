import { UserService } from "../../modules/users/user.service";
import { UserRepository } from "../../modules/users/user.repository";

const mockUserRepo = {
  findByUsername: jest.fn()
}

describe('user service', () => {
  let userService: UserService;
  beforeEach(() => {
    userService = new UserService(mockUserRepo as any)
  })


  afterEach(() => {
    jest.clearAllMocks();
  })


  it('should return a user by with the username', async () => {
    mockUserRepo.findByUsername.mockResolvedValue({
      id: 1,
      username: 'doujin22',
      password: 'hashed'
    })

    const response = await userService.findByUsername('doujin22');

    expect(response).toMatchObject({
      username: 'doujin22'
    })
  })

})