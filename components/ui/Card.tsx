import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={["rounded-xl border border-line bg-white shadow-[var(--shadow-card)]", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={["p-6", className].filter(Boolean).join(" ")}>{children}</div>;
}
