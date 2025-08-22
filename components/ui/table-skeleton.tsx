"use client";
import * as React from "react";

type ColumnDef = { width?: number | string; align?: "left" | "center" | "right" };
type Props = {
  rows?: number;
  columns?: number | ColumnDef[];
  withHeader?: boolean;
  cellHeight?: number;
  rowPaddingY?: number;
  border?: boolean;
};

const LIGHT = "#e6e6e6"; // light gray

function seeded(key: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967296;
}

export default function TableSkeleton({
  rows = 8,
  columns = 6,
  withHeader = true,
  cellHeight = 12,
  rowPaddingY = 10,
  border = false,
}: Props) {
  const colDefs: ColumnDef[] = React.useMemo(() => {
    if (Array.isArray(columns)) return columns;
    return Array.from({ length: Math.max(1, columns) }, () => ({}));
  }, [columns]);

  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse" }}
      aria-busy="true"
      role="status"
      aria-label="Loading table"
    >
      <colgroup>
        {colDefs.map((c, i) => {
          const w = typeof c.width === "number" ? `${c.width}px` : c.width || undefined;
          return <col key={i} style={w ? { width: w } : undefined} />;
        })}
      </colgroup>

      {withHeader && (
        <thead>
          <tr>
            {colDefs.map((c, i) => (
              <th
                key={i}
                style={{
                  textAlign: c.align ?? "left",
                  padding: `${rowPaddingY}px 12px`,
                  borderBottom: border ? `1px solid ${LIGHT}` : undefined,
                }}
                scope="col"
              >
                <div
                  className="animate-pulse"
                  style={{
                    width: 64,
                    height: 10,
                    borderRadius: 4,
                    backgroundColor: LIGHT,
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {Array.from({ length: rows }).map((_, rIdx) => (
          <tr key={rIdx}>
            {colDefs.map((c, cIdx) => {
              const w = 55 + Math.round(seeded(`${rIdx}:${cIdx}`) * 35); // 55–90%
              return (
                <td
                  key={cIdx}
                  style={{
                    textAlign: c.align ?? "left",
                    padding: `${rowPaddingY}px 12px`,
                    borderBottom: border ? `1px solid ${LIGHT}` : undefined,
                  }}
                >
                  <div
                    className="animate-pulse"
                    style={{
                      width: `${w}%`,
                      height: cellHeight,
                      borderRadius: 6,
                      backgroundColor: LIGHT,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
