import { Payer } from './payer';

export class Balance {
    payer: Payer;
    points: number;
  
    constructor(partial: Partial<Balance>) {
      Object.assign(this, partial);
    }
  }