import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductTypeDto {
  @ApiProperty({ name: 'id', description: 'id.' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ name: 'name', description: 'name.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'basePrice', description: 'basePrice.' })
  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

}
export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}