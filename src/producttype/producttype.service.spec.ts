import { Test, TestingModule } from '@nestjs/testing';
import { ProducttypeService } from './producttype.service';

describe('ProducttypeService', () => {
  let service: ProducttypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducttypeService],
    }).compile();

    service = module.get<ProducttypeService>(ProducttypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
