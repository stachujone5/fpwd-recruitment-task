import { z } from "zod";
import { getEnv } from "./env";
import { CalculatePlnForm } from "./calculate-pln-form";
import { unstable_noStore } from "next/cache";

const eurPlnExchangeRateSchama = z.object({
  rate: z.number().positive(),
});

export default async function Home() {
  unstable_noStore();

  const eurPlnExchangeRate = await fetch(
    `${getEnv().EXCHANGE_API_URL}/exchange/rate`,
  ).then((r) => r.json());

  const { data, error } =
    eurPlnExchangeRateSchama.safeParse(eurPlnExchangeRate);

  if (error) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p>Error fetching exchange rate</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-lg font-medium">
        EUR:PLN Exchange rate: <span className="font-bold">{data.rate}</span>
      </h1>

      <CalculatePlnForm />
    </main>
  );
}
