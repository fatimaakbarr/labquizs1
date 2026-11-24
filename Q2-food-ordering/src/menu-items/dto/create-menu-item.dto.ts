import { IsNotEmpty, IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  restaurantId: number;
}
