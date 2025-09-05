import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ name: 'name', description: 'name.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'price', description: 'price.' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ name: 'productTypeId', description: 'productTypeId.' })
  @IsNotEmpty()
  @IsString()
  productTypeId: string;

  @ApiProperty({ name: 'createdAt', description: 'createdAt.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ name: 'updatedAt', description: 'updatedAt.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt?: Date;

}
export class UpdateProductDto extends PartialType(CreateProductDto) {}