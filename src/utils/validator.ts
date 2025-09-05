import { IsNotEmpty, IsUUID } from "class-validator";

export class UUID {
  constructor(id:string){
    this.id = id;
  }

  @IsUUID()
  @IsNotEmpty()
  id:string
}
