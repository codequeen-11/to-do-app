import { CheckSquare } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
          <CheckSquare className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-base font-semibold tracking-tight sm:text-lg">
            My Todos
          </h1>

          <p className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:block">
            Stay organized, one task at a time.
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}