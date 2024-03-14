import { Injectable } from '@nestjs/common';
import { Neo4jQueryService } from 'src/neo4j-query/neo4j-query.service';

@Injectable()
export class PostalService {
  constructor(private readonly neo: Neo4jQueryService) {}
}
