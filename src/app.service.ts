import { Injectable } from '@nestjs/common';
import { Balance, Payer, Transaction, Points } from './interface';


@Injectable()
export class AppService {
  private readonly payers: {} = {};
  private readonly balances: Balance[] = [];
  private readonly transactions: Transaction[] = [];
  private readonly availableSpend: Transaction[] = [];

  private getPayerName(transaction: Transaction): string {
    const payer = new Payer(transaction.payer)
    // only need one payer per spelling
    const payerName = payer.name.toUpperCase();
    return payerName;
  }

  
  getBalance(): Balance[] {
    return this.balances;
  }

  
  
  addTransaction(transaction: Transaction) {
    const payerName = this.getPayerName(transaction)
    this.payers[payerName];

    // make sure balance is defined and not zero
    this.balances[payerName] = this.balances[payerName] ? this.balances[payerName] : 0
    const points = this.balances[payerName] + transaction.points > 0 ? this.balances[payerName] + transaction.points : 0;
    this.balances[payerName] =  points;

    this.transactions.push(transaction)
    this.availableSpend.push(transaction)
    this.availableSpend.sort((t1, t2) => 
        new Date(t1.timestamp) < new Date(t2.timestamp) ? 1: -1)
  }

  spendPoints(pointsObj: Points): Object {
    let { points } = pointsObj;
    let spend = new Object();
    let spendPointer = this.availableSpend.length - 1;
    while (points > 0) {
      let transaction = this.availableSpend[spendPointer];


      console.log('spend', spend)
      console.log('balance', this.balances)
      console.log('available spend', this.availableSpend)
      console.log('transaction', transaction)
      console.log('points', points)
      const payerName = this.getPayerName(transaction)
      
      if (transaction.points < 0) {
        this.balances[payerName] =  this.balances[payerName] - transaction.points;
        spend[payerName] = Number.isInteger(spend[payerName]) ? spend[payerName] - transaction.points : -transaction.points;
        points = points - transaction.points;
        this.availableSpend.pop();
        spendPointer -= 1;
        continue;
      }
      
      // transaction is less than balance
      //if (this.balances[payerName] >= transaction.points  ) 
        // transaction is less than total spend
        if (transaction.points <= points) {
          {
            this.balances[payerName] =  this.balances[payerName] - transaction.points;
            spend[payerName] = Number.isInteger(spend[payerName]) ? spend[payerName] - transaction.points : -transaction.points;
            this.availableSpend.pop();
            points = points - transaction.points;
            spendPointer -= 1;
            continue;
          }
        }
        // transaction greater than total spend
        if (transaction.points >= points) {
          this.balances[payerName] =  this.balances[payerName] - points;
          spend[payerName] = Number.isInteger(spend[payerName]) ? spend[payerName] - points : -points;
          this.availableSpend[spendPointer].points = this.availableSpend[spendPointer].points - points;
          // commented this line at 6;14
          points = points - transaction.points;
          break;
        }
    }
    console.log('RETURNINGGGGSJFSD:LKFJSD:LFJSD:LFJSD:LFJ')
    console.log('spend', spend)
    console.log('balance', this.balances)
    console.log('available spend', this.availableSpend)
    console.log('points', points)

    return spend;
  }
}
