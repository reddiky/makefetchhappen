import { Injectable } from '@nestjs/common';
import { Transaction, Points } from './interface';


@Injectable()
export class AppService {
  private payers: {} = {};
  private balances: {} = {};
  private transactions: Transaction[] = [];
  private availableSpend: Transaction[] = [];

  private getPayerName(transaction: Transaction): string {
    const { payer } = transaction;
    // only need one payer per spelling
    const payerName = payer.toUpperCase();
    return payerName;
  }

  reset() {
    this.payers = {};
    this.balances = {};
    this.transactions = [];
    this.availableSpend = [];
  }

  getBalance(): Object {
    return this.balances;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
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


  // This still has negative transactions edget case. Need to store available spend
  // and throw an error and then restore if spend fails.
  spendPoints(pointsObj: Points): Object {
    let { points } = pointsObj;
    let spend = new Object();
    let spendPointer = this.availableSpend.length - 1;
    while (points > 0) {
      let transaction = this.availableSpend[spendPointer];

      const payerName = this.getPayerName(transaction)
      
      if (transaction.points < 0) {
        this.balances[payerName] =  this.balances[payerName] - transaction.points;
        spend[payerName] = Number.isInteger(spend[payerName]) ? spend[payerName] - transaction.points : -transaction.points;
        points = points - transaction.points;
        this.availableSpend.pop();
        spendPointer -= 1;
        continue;
      }
      
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
          points = points - transaction.points;
          break;
        }
    }
    return spend;
  }
}
