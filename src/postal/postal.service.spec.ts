import { Test, TestingModule } from '@nestjs/testing';
import { PostalService } from './postal.service';

describe('PostalService', () => {
  let service: PostalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostalService],
    }).compile();

    service = module.get<PostalService>(PostalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
