import Input from "@/components/ui/inputs/input";
import SelectDate from "@/components/ui/select-date";
import { IStudentPaymentSplits } from "@/lib/types/student.types";
import { useEffect, useState } from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  FieldErrors,
} from "react-hook-form";


type FormValues = {
  contract: number;
  installment_payments: IStudentPaymentSplits[];
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
    name: "installment_payments", // ✅ keyof FormValues
  });

  const contract = Number(watch("contract") || 0);
  const installment_payments = watch("installment_payments") || [];

  const [lockedIndexes, setLockedIndexes] = useState<number[]>([]);

  // ✅ Always regenerate splits when count/contract changes
  useEffect(() => {
    if (!count || !contract || fields.length === count) return;

    const each = Math.floor(contract / count);
    const rem = contract % count;

    const newVals: IStudentPaymentSplits[] = Array.from({ length: count }, (_, i) => ({
      amount: i === count - 1 ? String(each + rem) : String(each),
      payment_date: fields[i]?.payment_date || "",
      left: 0,
    }));

    replace(newVals); // ensures fields.length === count
    setLockedIndexes([]); // reset locked indexes
  }, [count, contract, replace, fields]);

  // ✅ Handle manual amount changes
  const handleAmountChange = (index: number, value: string) => {
    const cleaned = value.replace(/,/g, "");
    const updatedAmount = Number(cleaned);
    if (isNaN(updatedAmount)) return;

    // Lock this index
    setLockedIndexes((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );

    setValue(`installment_payments.${index}.amount`, updatedAmount?.toString());

    const current = [...installment_payments];
    current[index] = { ...current[index], amount: updatedAmount?.toString() };

    const locked = [...lockedIndexes, index].filter(
      (item, pos, self) => self.indexOf(item) === pos
    );

    const totalLocked = locked.reduce((acc, i) => {
      const amt = Number(current[i]?.amount || 0);
      return acc + (isNaN(amt) ? 0 : amt);
    }, 0);

    const remaining = contract - totalLocked;
    const allIndexes = Array.from({ length: count }, (_, i) => i);
    const autoIndexes = allIndexes.filter((i) => !locked.includes(i));

    if (remaining < 0) {
      autoIndexes.forEach((i) =>
        setValue(`installment_payments.${i}.amount`, "")
      );

      setError("installment_payments", {
        type: "manual",
        message: "Toʻlov summasi ortib ketdi",
      });
      return;
    } else {
      clearErrors("installment_payments");
    }

    const base = Math.floor(remaining / autoIndexes.length);
    const rem = remaining % autoIndexes.length;

    autoIndexes.forEach((i, j) => {
      const final = base + (j === autoIndexes.length - 1 ? rem : 0);
      setValue(`installment_payments.${i}.amount`, final?.toString());
    });
  };

  // ✅ Error casting for per-field errors
  let fieldErrors: FieldErrors<IStudentPaymentSplits>[] = [];
  if (Array.isArray(errors.installment_payments)) {
    fieldErrors = errors.installment_payments as FieldErrors<IStudentPaymentSplits>[];
  }

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 items-center">
          {count > 1 && (
            <Controller
              name={`installment_payments.${index}.amount`}
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
            name={`installment_payments.${index}.payment_date`}
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

      {errors.installment_payments?.message && (
        <p className="text-red-500 text-sm font-medium">
          {errors.installment_payments.message as string}
        </p>
      )}
    </div>
  );
}
