"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { calculateEurToPlnExchangeRate } from "./actions";
import { useFormState } from "react-dom";

export function CalculatePlnForm() {
  const [state, formAction] = useFormState(calculateEurToPlnExchangeRate, null);

  return (
    <>
      <form className="space-y-3 border p-4 rounded mb-4" action={formAction}>
        <Label htmlFor="eurAmount">Euro amount</Label>
        <Input type="number" name="eurAmount" placeholder="0.123" required />
        <Button type="submit" className="w-full">
          Calculate
        </Button>
        {state && (
          <p>
            {state.success
              ? `${state.data.eurAmount}EUR = ${state.data.plnAmount.toFixed(
                  2,
                )}PLN`
              : "Try again later"}
          </p>
        )}
      </form>
    </>
  );
}
