import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsString, IsUUID } from "class-validator"

export class FilterDto{
  @IsString()
  name?:string

  @IsArray()
  priceInterval?: [number, number]

  @IsUUID()
  type?: string
}

export class MovimentFilterDto{
  @ApiProperty({ type: String, format: 'date-time', example: '2025-09-01T00:00:00Z' })
  @Type(() => Date)   // tenta converter string -> Date antes de validar
  @IsDate()
  startDate?: Date;

  @ApiProperty({ type: String, format: 'date-time', example: '2025-09-30T23:59:59Z' })
  @Type(() => Date)
  @IsDate()
  endDate: Date
}
