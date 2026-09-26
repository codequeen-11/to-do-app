"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAdd: (title: string) => void;
  disabled?: boolean;
}

export default function TodoForm({
  onAdd,
  disabled = false,
}: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || disabled) {
      return;
    }

    onAdd(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            disabled={disabled}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            aria-label="Todo title"
            maxLength={200}
            className="
              h-12 w-full rounded-xl border
              border-zinc-200 bg-white
              px-4 text-sm text-zinc-950
              outline-none transition
              placeholder:text-zinc-400
              focus:border-zinc-400
              focus:ring-4 focus:ring-zinc-100
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-white
              dark:placeholder:text-zinc-500
              dark:focus:border-zinc-600
              dark:focus:ring-zinc-800
            "
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="
            inline-flex h-12 items-center justify-center gap-2
            rounded-xl bg-zinc-950 px-5
            text-sm font-medium text-white
            transition
            hover:bg-zinc-800
            focus:outline-none
            focus:ring-4 focus:ring-zinc-200
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:bg-white
            dark:text-zinc-950
            dark:hover:bg-zinc-200
            dark:focus:ring-zinc-800
          "
        >
          <Plus className="h-4 w-4" />
          <span>{disabled ? "Adding..." : "Add task"}</span>
        </button>
      </div>
    </form>
  );
}