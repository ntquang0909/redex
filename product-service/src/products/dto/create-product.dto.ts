import { IsDecimal, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({
    message: 'name must be a string',
  })
  @Length(5, 25, {
    message: 'name must be between 5 and 25 characters',
  })
  name: string;

  @IsString({
    message: 'description must be a string',
  })
  @Length(25, 255, {
    message: 'description must be between 25 and 255 characters',
  })
  description: string;

  @IsDecimal(
    {
      decimal_digits: '2',
    },
    {
      message: 'price must be a decimal number',
    },
  )
  price: number;
}
