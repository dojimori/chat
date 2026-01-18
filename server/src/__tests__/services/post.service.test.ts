import { IPostRepository } from "../../modules/posts/post.interface";
import { PostService } from "../../modules/posts/post.service";

// Testing the post service by mocking the post repo
describe('post service test', () => {
  let postService: any;
  let mockPostRepo: any;

  // here, we mock the post repo
  beforeEach(() => {
    mockPostRepo = {
      create: jest.fn()
    } as any;

    // created a new instance of the service and pass in the mocked repo
    postService = new PostService(mockPostRepo as IPostRepository)
  })

  it('should create user', async () => {
    // this will the the payload sent to the service
    const input = { title: 'ww', description: 'ss' }
    /* 
      this is the expected output or return value of the method
      `create`
    */
    const mockOutput = { id: 1, ...input, userId: 1 };

    /*
      here we tell the `create` method to return the expected output
      when resolved
    */
    mockPostRepo.create.mockResolvedValue(mockOutput)

    //  execute the method
    const result = await postService.create(input);

    // check if the result if equal to the mock output
    expect(result).toEqual(mockOutput)
    // check if the `create` method is properly called    
    expect(mockPostRepo.create).toHaveBeenCalledWith({ ...input })

  })


})