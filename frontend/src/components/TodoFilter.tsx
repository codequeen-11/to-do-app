"use client";

export type TodoFilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  activeFilter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
}

const filters: { label: string; value: TodoFilterType }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function TodoFilter({
  activeFilter,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div
      className="
        inline-flex w-full items-center gap-1
        rounded-xl border border-zinc-200 bg-zinc-100 p-1
        dark:border-zinc-800 dark:bg-zinc-900
        sm:w-auto
      "
      role="tablist"
      aria-label="Filter todos"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(filter.value)}
            className={`
              flex-1 rounded-lg px-4 py-2
              text-sm font-medium
              transition-all
              sm:flex-none
              ${
                isActive
                  ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}