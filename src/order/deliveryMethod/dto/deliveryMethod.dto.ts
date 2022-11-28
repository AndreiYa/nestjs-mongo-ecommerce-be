import {IsNotEmpty, IsString} from "class-validator";

export class DeliveryMethodDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  media: string;
}
