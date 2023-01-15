export class Payer {
    id: string;
    name: string;
  
    constructor(partial: Partial<Payer>) {
      Object.assign(this, partial);
    }
  }