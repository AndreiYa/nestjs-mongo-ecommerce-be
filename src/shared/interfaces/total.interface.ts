import {CreateProductDTO} from "../../product/dto/createProduct.dto";

export interface ITotal {
  products?: CreateProductDTO[];
  orderPrice: number;
  totalItemsCount: number;
  totalDiscount: number;
  totalPrice: number;
}
