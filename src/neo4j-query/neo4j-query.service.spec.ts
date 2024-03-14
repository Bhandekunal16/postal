import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jQueryService } from './neo4j-query.service';

describe('Neo4jQueryService', () => {
  let service: Neo4jQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jQueryService],
    }).compile();

    service = module.get<Neo4jQueryService>(Neo4jQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
