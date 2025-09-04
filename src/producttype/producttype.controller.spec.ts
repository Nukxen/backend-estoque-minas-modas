import { Test, TestingModule } from '@nestjs/testing';
import { ProducttypeController } from './producttype.controller';
import { ProducttypeService } from './producttype.service';

describe('ProducttypeController', () => {
  let controller: ProducttypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducttypeController],
      providers: [ProducttypeService],
    }).compile();

    controller = module.get<ProducttypeController>(ProducttypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
