export class Transaction {
    payer: string;
    points: number;
    timestamp: Date;
  
    constructor(partial: Partial<Transaction>) {
      Object.assign(this, partial);
    }
  }