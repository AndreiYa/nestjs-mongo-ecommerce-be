import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {DeliveryMethod} from "./schema/deliveryMethod.schema";
import {Model} from "mongoose";
import {DeliveryMethodDTO} from "./dto/deliveryMethod.dto";


@Injectable()
export class DeliveryMethodService {
  constructor(@InjectModel('DeliveryMethod') private readonly deliveryMethodModel: Model<DeliveryMethod>) {}

  async getDeliveryMethods(): Promise<DeliveryMethod[]> {
    return this.deliveryMethodModel.find().exec()
  }

  async getDeliveryMethodById(id: string): Promise<DeliveryMethod> {
    return this.deliveryMethodModel.findById(id).exec()
  }

  async addDeliveryMethod(deliveryMethodDTO: DeliveryMethodDTO): Promise<DeliveryMethod> {
    const newDeliveryMethod = await this.deliveryMethodModel.create(deliveryMethodDTO)
    return newDeliveryMethod.save()
  }

  async updateDeliveryMethod(id: string, deliveryMethodDTO: DeliveryMethodDTO): Promise<DeliveryMethod> {
    return this.deliveryMethodModel.findByIdAndUpdate(id, deliveryMethodDTO, {new: true})
  }

  async deleteDeliveryMethod(id: string): Promise<DeliveryMethod> {
    return this.deliveryMethodModel.findByIdAndRemove(id)
  }
}
