export class Points {
    points: number;
  
    constructor(partial: Partial<Points>) {
      Object.assign(this, partial);
    }
  }