import { Injectable } from '@nestjs/common';
import { ExchangeRate } from './interfaces/exchange-rate.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { z } from 'zod';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangeService {
  private cachedRate: ExchangeRate | null = null;

  constructor(private configService: ConfigService) {}

  async getExchangeRate(): Promise<ExchangeRate> {
    if (this.isCacheValid()) {
      return this.cachedRate;
    }

    const rate = await this.fetchCurrentRate();

    this.cachedRate = {
      rate,
      timestamp: new Date(),
    };

    return this.cachedRate;
  }

  private isCacheValid(): boolean {
    if (!this.cachedRate) return false;

    const cacheAge = Date.now() - this.cachedRate.timestamp.getTime();
    return cacheAge < 60_000; // 1 minute in milliseconds
  }

  private async fetchCurrentRate(): Promise<number> {
    const response = await fetch(
      this.configService.getOrThrow<string>('EXCHANGE_API_URL'),
      {
        headers: {
          'x-api-key':
            this.configService.getOrThrow<string>('EXCHANGE_API_KEY'),
        },
      },
    );

    const { exchange_rate } = z
      .object({ exchange_rate: z.number() })
      .parse(await response.json());

    return exchange_rate;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async refreshCache() {
    await this.fetchCurrentRate();
  }
}
