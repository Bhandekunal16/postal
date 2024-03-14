import { Test, TestingModule } from '@nestjs/testing';
import { PostalController } from './postal.controller';
import { PostalService } from './postal.service';

describe('PostalController', () => {
  let controller: PostalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostalController],
      providers: [PostalService],
    }).compile();

    controller = module.get<PostalController>(PostalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
