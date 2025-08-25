// components/table/TableNotFoundRow.tsx
import * as React from "react";
import { LuFileSearch } from "react-icons/lu";
import Button from "./button";
import { BiXCircle } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";
// If you don't use shadcn, swap Button with your own

type TableNotFoundRowProps = {
  colSpan: number;                  // columns.length
  title?: string;                   // default: "Ma'lumot topilmadi"
  message?: string;                 // default: "Siz izlayotgan ma'lumot topilmadi. Filtrlarni tekshiring."
  onResetFilters?: () => void;      // optional
  onReload?: () => void;            // optional
  className?: string;               // optional extra styles
};

export function TableNotFoundRow({
  colSpan,
  title = "Ma'lumot topilmadi",
  message = "Siz izlayotgan ma'lumot topilmadi. Filtrlarni tekshiring.",
  onResetFilters,
  onReload,
  className = "",
}: TableNotFoundRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={`p-8`}>
        <div
          className={[
            "w-full rounded-2xl border border-dashed",
            "flex flex-col items-center justify-center gap-3",
            "py-10 text-center bg-muted/20",
            className,
          ].join(" ")}
        >
          <div className="rounded-full p-3 border">
            <LuFileSearch className="h-6 w-6" aria-hidden="true" />
          </div>

          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-[48ch]">{message}</p>

          {(onResetFilters || onReload) && (
            <div className="flex items-center gap-2 mt-2">
              {onResetFilters && (
                <Button variant="outlined"  onClick={onResetFilters}>
                  <BiXCircle className="mr-2 h-4 w-4" />
                  Filtrlarni tozalash
                </Button>
              )}
              {onReload && (
                <Button  onClick={onReload}>
                  <FiRefreshCw className="mr-2 h-4 w-4" />
                  Qayta yuklash
                </Button>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
