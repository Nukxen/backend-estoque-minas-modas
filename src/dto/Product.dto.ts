import { ApiProperty,PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsDate, IsEnum, IsOptional, IsArray, IsUUID, IsJSON, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ name: 'id', description: 'id.' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ name: 'name', description: 'name.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ name: 'price', description: 'price.' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ name: 'createdAt', description: 'createdAt.' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt?: Date;

  @ApiProperty({ name: 'updatedAt', description: 'updatedAt.' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  updatedAt?: Date;

  @ApiProperty({ name: 'productTypeId', description: 'productTypeId.' })
  @IsNotEmpty()
  @IsString()
  productTypeId: string;

}
export class UpdateProductDto extends PartialType(CreateProductDto) {}