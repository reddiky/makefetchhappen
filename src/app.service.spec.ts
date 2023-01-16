import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';


describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('balance', () => {
    it('should return an empty array', () => {
      expect(appService.getBalance()).toEqual({})
    });

    it('should return the combined points total of any 2 transactions', () => {
      appService.addTransaction({ payer: 'test', points: 100, timestamp: new Date()});
      appService.addTransaction({ payer: 'test', points: 200, timestamp: new Date()});
      

      expect(appService.getBalance()).toEqual({ 'TEST': 300})
    });


    it('should return the combined points total of any 2 transactions even if payer is cased differently', () => {
      appService.addTransaction({ payer: 'test', points: 100, timestamp: new Date()})
      appService.addTransaction({ payer: 'TEST', points: 200, timestamp: new Date()})
      
      expect(appService.getBalance()).toEqual({'TEST': 300})
    });

    it('should return the combined points total of any 3 or more transactions', () => {
      appService.addTransaction({ payer: 'test', points: 100, timestamp: new Date()})
      appService.addTransaction({ payer: 'other seller', points: 200, timestamp: new Date()})
      appService.addTransaction({ payer: 'third seller', points: 300, timestamp: new Date()})
      
      expect(appService.getBalance()).toEqual({'TEST': 100, 'OTHER SELLER': 200, 'THIRD SELLER': 300})
    });

    it('should return the combined points total of any 3 or more transactions including negatives', () => {
      appService.addTransaction({ payer:'test', points: 100, timestamp: new Date()})
      appService.addTransaction({ payer:'other seller', points: 200, timestamp: new Date()})
      appService.addTransaction({ payer:'third seller', points: 300, timestamp: new Date()})
      appService.addTransaction({ payer:'third seller', points: -200, timestamp: new Date()})
      
      expect(appService.getBalance()).toEqual({ 'TEST': 100,'OTHER SELLER': 200, 'THIRD SELLER': 100})
    });
  });

  describe('addTransaction', () => {
    it.skip('should call appService.addTransaction should add transaction to balance and availableSpend', () => {});
  });

  describe('spendPoints', () => {
    it('should return total points spent', () => {
      appService.addTransaction({ payer: 'test', points: 100, timestamp: new Date()});
      appService.addTransaction({ payer: 'test', points: 200, timestamp: new Date()});
      

      expect(appService.spendPoints({points: 10})).toEqual({ 'TEST': -10})
    });

    it('should spend points in order', () => {
      appService.addTransaction({ payer: 'test1', points: 100, timestamp: new Date('December 17, 1996 03:24:00')});
      appService.addTransaction({ payer: 'test2', points: 100, timestamp: new Date('December 17, 1995 03:24:00')});
      

      expect(appService.spendPoints({points: 110})).toEqual({ 'TEST1': -10, 'TEST2': -100})
    });

    it('should spend points in order and handle negative transactions', () => {
      appService.addTransaction({ payer: 'test1', points: 100, timestamp: new Date('December 17, 1996 03:24:00')});
      appService.addTransaction({ payer: 'test2', points: 100, timestamp: new Date('December 17, 1995 03:24:00')});
      appService.addTransaction({ payer: 'test2', points: -50, timestamp: new Date('December 18, 1995 03:24:00')});
      

      expect(appService.spendPoints({points: 110})).toEqual({ 'TEST1': -60, 'TEST2': -50})
    });
  });
});
