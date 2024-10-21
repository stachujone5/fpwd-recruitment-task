"use server";

import { z } from "zod";
import { getEnv } from "./env";

const eurAmountSchema = z.number().positive();

const exchangeRateSchema = z.object({
  rate: z.number().positive(),
});

export async function calculateEurToPlnExchangeRate(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- prev state
  _: any,
  formData: FormData,
) {
  try {
    const eurAmount = eurAmountSchema.parse(Number(formData.get("eurAmount")));

    const res = await fetch(`${getEnv().EXCHANGE_API_URL}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        eurAmount,
      }),
    }).then((r) => r.json());

    const { rate } = exchangeRateSchema.parse(res);

    return {
      success: true,
      data: { plnAmount: rate * eurAmount, eurAmount },
    } as const;
  } catch (e) {
    console.log(e);
    return { success: false, data: "Try again later" } as const;
  }
}
