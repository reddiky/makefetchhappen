import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Balance } from './interface'
import { CreateTransactionDto } from './dto/createTransaction.dto'; 
import { PointsDto } from './dto/points.dto'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance')
  balance(): string {
    // I'm going to hell for this
    return JSON.stringify(Object.assign({}, this.appService.getBalance()));
  }

  @Post('addTransaction')
  addTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    this.appService.addTransaction(createTransactionDto);
  }

  @Post('spendPoints')
  spendPoints(@Body() pointsDto: PointsDto): string {
    // still going to hell
    return JSON.stringify(Object.assign({}, this.appService.spendPoints(pointsDto)));
  }
}
