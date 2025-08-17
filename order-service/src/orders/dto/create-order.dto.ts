import { IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: 'productId must be a string' })
  @IsUUID('all', { message: 'productId must be a valid UUID' })
  productId: string;

  @IsPositive({ message: 'quantity must be a positive number' })
  quantity: number;
}
