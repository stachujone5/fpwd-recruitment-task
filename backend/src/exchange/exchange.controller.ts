import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeRate } from './interfaces/exchange-rate.interface';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getRate(): Promise<ExchangeRate> {
    return this.exchangeService.getExchangeRate();
  }
}
