import { OrderStatus } from "@/domain/models/order-model";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, ValidationError, validate } from "class-validator";
import { Validator } from "./validator";
import { HttpRequest } from "@/application/controllers/create-order-controller";

export class CreateOrderValidation implements Validator {
  @IsNotEmpty()
  @IsString()
  consumerId!: string;

  @IsNotEmpty()
  @IsNumber()
  value!: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate!: Date;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  async validate (data: HttpRequest): Promise<ValidationError[]>  {
    const order = new CreateOrderValidation();
    order.consumerId = data.consumerId;
    order.value = data.value;
    order.dueDate = data.dueDate;
    order.status = data.status;
    return validate(order).then(errors => {
      if (errors.length > 0) return errors;
      return [];
    });
  }
}