import { CreatePayerDto } from './createPayer.dto';

export class CreateTransactionDto {
  id: string
  payer: CreatePayerDto;
  points: number;
  timestamp: Date;
}