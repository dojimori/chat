import { AppError } from "../../errors/app.error";
import { IPostRepository } from "../../modules/posts/post.interface";
import { PostService } from "../../modules/posts/post.service";

// Testing the post service by mocking the post repo
describe('post service test', () => {
  let postService: any;
  let mockPostRepo: any;

  // here, we mock the post repo
  beforeEach(() => {
    mockPostRepo = {
      create: jest.fn(),
      update: jest.fn(),
      getAll: jest.fn()
    } as any;

    // created a new instance of the service and pass in the mocked repo
    postService = new PostService(mockPostRepo as IPostRepository)
  })

  it('should create post', async () => {
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

  it('should update post', async () => {
    const postId = 1;
    const input = { title: 'updated title', description: 'updated description' };
    const payload = { id: postId, ...input };
    const mockOutput = {
      id: postId,
      ...input,
      userId: 1
    }

    mockPostRepo.update.mockResolvedValue(mockOutput)

    const result = await postService.update(payload)

    expect(result).toEqual(mockOutput)
    expect(mockPostRepo.update).toHaveBeenCalledWith({ ...payload })

  })

  it('should throw error `Description is required`', async () => {
    const input = { title: 'title only' }
    const appError = new AppError('Description is required', 400);

    mockPostRepo.update.mockRejectedValue(appError);

    await expect(postService.update(input)).rejects.toBeInstanceOf(AppError)

  })

  it('should get all of the posts', async () => {
    const mockOutput = [
      {
        id: 1,
        title: 'hahaha',
        description: 'www',
        userId: 1
      },
      {
        id: 2,
        title: 'hahaha',
        description: 'www',
        userId: 1
      },
    ];

    mockPostRepo.getAll.mockResolvedValue(mockOutput);

    const result = await postService.getAll();

    expect(result).toEqual(mockOutput)
  })


})