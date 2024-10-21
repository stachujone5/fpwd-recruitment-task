import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ExchangeModule } from './exchange/exchange.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ExchangeModule,
    TransactionModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
