import { Controller } from '@nestjs/common';
import { ProducttypeService } from './producttype.service';

@Controller('producttype')
export class ProducttypeController {
  constructor(private readonly producttypeService: ProducttypeService) {}
}
