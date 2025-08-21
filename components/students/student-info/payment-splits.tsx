import Input from "@/components/ui/inputs/input";
import SelectDate from "@/components/ui/select-date";
import { useEffect, useState } from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  FieldErrors,
} from "react-hook-form";

type Installment = {
  amount: number | string;
  payment_date: string;
};

type FormValues = {
  price: number;
  installments: Installment[];
};

type Props = {
  count: number;
};

export default function PaymentSplits({ count = 3 }: Props) {
  const {
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>(); // ✅ typed form context

  const { fields, replace } = useFieldArray({
    control,
    name: "installments", // ✅ keyof FormValues
  });

  const price = Number(watch("price") || 0);
  const installments = watch("installments") || [];

  const [lockedIndexes, setLockedIndexes] = useState<number[]>([]);

  // ✅ Always regenerate splits when count/price changes
  useEffect(() => {
    if (!count || !price) return;

    const each = Math.floor(price / count);
    const rem = price % count;

    const newVals: Installment[] = Array.from({ length: count }, (_, i) => ({
      amount: i === count - 1 ? each + rem : each,
      payment_date: "",
    }));

    replace(newVals); // ensures fields.length === count
    setLockedIndexes([]); // reset locked indexes
  }, [count, price, replace]);

  // ✅ Handle manual amount changes
  const handleAmountChange = (index: number, value: string) => {
    const cleaned = value.replace(/,/g, "");
    const updatedAmount = Number(cleaned);
    if (isNaN(updatedAmount)) return;

    // Lock this index
    setLockedIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );

    setValue(`installments.${index}.amount`, updatedAmount);

    const current = [...installments];
    current[index] = { ...current[index], amount: updatedAmount };

    const locked = [...lockedIndexes, index].filter(
      (item, pos, self) => self.indexOf(item) === pos
    );

    const totalLocked = locked.reduce((acc, i) => {
      const amt = Number(current[i]?.amount || 0);
      return acc + (isNaN(amt) ? 0 : amt);
    }, 0);

    const remaining = price - totalLocked;
    const allIndexes = Array.from({ length: count }, (_, i) => i);
    const autoIndexes = allIndexes.filter((i) => !locked.includes(i));

    if (remaining < 0) {
      autoIndexes.forEach((i) =>
        setValue(`installments.${i}.amount`, "")
      );

      setError("installments", {
        type: "manual",
        message: "Toʻlov summasi ortib ketdi",
      });
      return;
    } else {
      clearErrors("installments");
    }

    const base = Math.floor(remaining / autoIndexes.length);
    const rem = remaining % autoIndexes.length;

    autoIndexes.forEach((i, j) => {
      const final = base + (j === autoIndexes.length - 1 ? rem : 0);
      setValue(`installments.${i}.amount`, final);
    });
  };

  // ✅ Error casting for per-field errors
  let fieldErrors: FieldErrors<Installment>[] = [];
  if (Array.isArray(errors.installments)) {
    fieldErrors = errors.installments as FieldErrors<Installment>[];
  }

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 items-center">
          {count > 1 && (
            <Controller
              name={`installments.${index}.amount`}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  value={field.value?.toString() ?? ""}
                  onChange={(e) => {
                    const val =
                      typeof e === "string" ? e : e; // ✅ safe typing
                    field.onChange(val);
                    handleAmountChange(index, val);
                  }}
                  placeholder="Narxni kiriting"
                />
              )}
            />
          )}

          <Controller
            name={`installments.${index}.payment_date`}
            control={control}
            rules={{ required: "Toʻlov kunini kiriting" }}
            render={({ field }) => (
              <div className="flex flex-col gap-1 w-full">
                <SelectDate {...field} />
                {fieldErrors?.[index]?.payment_date?.message && (
                  <p className="text-red-500 text-xs">
                    {fieldErrors[index].payment_date
                      ?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      ))}

      {errors.installments?.message && (
        <p className="text-red-500 text-sm font-medium">
          {errors.installments.message as string}
        </p>
      )}
    </div>
  );
}
