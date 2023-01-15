import { Payer } from './payer';

export class Transaction {
    id: string;
    payer: Payer;
    points: number;
    timestamp: Date;
  
    constructor(partial: Partial<Transaction>) {
      Object.assign(this, partial);
    }
  }