import {IsNotEmpty, IsString} from "class-validator";

export class DeliveryMethodFieldValueDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
