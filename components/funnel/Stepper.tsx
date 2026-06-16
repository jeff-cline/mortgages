const STEPS = ["Goal", "Property", "Profile", "Contact"] as const;

export function Stepper({ current }: { current: number }) {
  // current is a 1-based index of the active step (1..4)
  return (
    <nav aria-label="Progress" className="mb-10">
      <ol className="flex items-center">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < current;
          const isActive = stepNum === current;
          const isLast = i === STEPS.length - 1;
          return (
            <li
              key={label}
              className={["flex items-center", isLast ? "" : "flex-1"].join(" ")}
            >
              <div className="flex flex-col items-center">
                <div
                  aria-current={isActive ? "step" : undefined}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isComplete
                      ? "border-accent bg-accent text-white"
                      : isActive
                        ? "border-brand bg-brand text-white"
                        : "border-line bg-white text-muted",
                  ].join(" ")}
                >
                  {isComplete ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 10.5l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={[
                    "mt-2 hidden text-xs font-medium sm:block",
                    isActive ? "text-brand" : isComplete ? "text-accent" : "text-muted",
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={[
                    "mx-2 h-0.5 flex-1 rounded transition-colors sm:mx-3",
                    stepNum < current ? "bg-accent" : "bg-line",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
