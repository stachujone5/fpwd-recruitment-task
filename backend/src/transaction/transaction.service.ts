import { Injectable } from '@nestjs/common';
import { Transaction } from './interfaces/transaction.interface';
import { ExchangeService } from '../exchange/exchange.service';
import { randomUUID } from 'crypto';

@Injectable()
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(private readonly exchangeService: ExchangeService) {}

  async createTransaction(eurAmount: number): Promise<Transaction> {
    const { rate } = await this.exchangeService.getExchangeRate();
    const plnAmount = eurAmount * rate;

    const transaction: Transaction = {
      id: randomUUID(),
      eurAmount,
      plnAmount,
      rate,
      timestamp: new Date(),
    };

    this.transactions.push(transaction);
    return transaction;
  }
}
