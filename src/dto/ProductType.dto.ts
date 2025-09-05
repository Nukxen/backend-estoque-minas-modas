import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductTypeDto {
  @ApiProperty({ name: 'name', description: 'name.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'basePrice', description: 'basePrice.' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  basePrice: number;

}
export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}