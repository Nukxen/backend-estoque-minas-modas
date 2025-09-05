import { IsArray, IsNumber, IsString, IsUUID } from "class-validator"

export class FilterDto{
  @IsString()
  name?:string

  @IsArray()
  priceInterval?: [number, number]

  @IsUUID()
  type?: string
}
