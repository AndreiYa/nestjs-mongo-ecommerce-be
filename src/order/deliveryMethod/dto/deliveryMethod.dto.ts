import {IsArray, IsNotEmpty, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class DeliveryMethodFieldDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class DeliveryMethodDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @Type(() => DeliveryMethodFieldDTO)
  @IsNotEmpty()
  @IsArray()
  fields: DeliveryMethodFieldDTO

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  paymentMethods: string[];
}
