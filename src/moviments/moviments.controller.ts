import { Controller } from '@nestjs/common';
import { MovimentsService } from './moviments.service';

@Controller('moviments')
export class MovimentsController {
  constructor(private readonly movimentsService: MovimentsService) {}
}
