import { Test, TestingModule } from '@nestjs/testing';
import { PostalNeo4jService } from './postal-neo4j.service';

describe('PostalNeo4jService', () => {
  let service: PostalNeo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostalNeo4jService],
    }).compile();

    service = module.get<PostalNeo4jService>(PostalNeo4jService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
