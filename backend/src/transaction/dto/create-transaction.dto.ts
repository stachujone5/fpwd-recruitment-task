import { IsNumber, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  eurAmount: number;
}
