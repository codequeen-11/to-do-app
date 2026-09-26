"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isUpdating,
  isDeleting,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isConfirmingDelete, setIsConfirmingDelete] =
  useState(false);
  const handleSave = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onEdit(todo.id, trimmedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <article
      className="
        group rounded-2xl border
        border-zinc-200 bg-white p-4
        shadow-sm transition
        hover:border-zinc-300 hover:shadow-md
        dark:border-zinc-800
        dark:bg-zinc-900
        dark:hover:border-zinc-700
      "
    >
      <div className="flex items-start gap-3 disabled:cursor-not-allowed
disabled:opacity-50">
        {/* Completion button */}
        <button
          type="button"
          disabled={isUpdating || isDeleting}
          onClick={() => onToggle(todo.id)}
          aria-label={
            todo.completed
              ? `Mark "${todo.title}" as incomplete`
              : `Mark "${todo.title}" as completed`
          }
          className={`
            mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
            rounded-full border-2 transition-all
            ${
              todo.completed
                ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                : "border-zinc-300 hover:border-zinc-950 dark:border-zinc-600 dark:hover:border-white"
            }
          `}
        >
          {todo.completed && <Check className="h-3.5 w-3.5" />}
        </button>

        {/* Todo content */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                autoFocus
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSave();
                  }

                  if (event.key === "Escape") {
                    handleCancel();
                  }
                }}
                maxLength={200}
                className="
                  h-10 min-w-0 flex-1 rounded-lg border
                  border-zinc-300 bg-white px-3
                  text-sm text-zinc-950 outline-none
                  focus:border-zinc-500
                  focus:ring-4 focus:ring-zinc-100
                  dark:border-zinc-700
                  dark:bg-zinc-950
                  dark:text-white
                  dark:focus:border-zinc-500
                  dark:focus:ring-zinc-800
                "
                aria-label="Edit todo title"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="
                    inline-flex h-10 items-center justify-center
                    rounded-lg bg-zinc-950 px-3
                    text-sm font-medium text-white
                    hover:bg-zinc-800
                    dark:bg-white dark:text-zinc-950
                    dark:hover:bg-zinc-200
                  "
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  aria-label="Cancel editing"
                  className="
                    inline-flex h-10 w-10 items-center justify-center
                    rounded-lg border
                    border-zinc-200 text-zinc-500
                    hover:bg-zinc-100
                    dark:border-zinc-800
                    dark:hover:bg-zinc-800
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`
                  break-words text-sm font-medium leading-6
                  ${
                    todo.completed
                      ? "text-zinc-400 line-through dark:text-zinc-500"
                      : "text-zinc-900 dark:text-zinc-100"
                  }
                `}
              >
                {todo.title}
              </p>

              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                {todo.completed ? "Completed" : "Active"}
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div
            className="
              flex shrink-0 items-center gap-1
              opacity-100 sm:opacity-0
              sm:transition-opacity
              sm:group-hover:opacity-100
              sm:group-focus-within:opacity-100
            "
          >
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit "${todo.title}"`}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-lg text-zinc-400
                transition-colors
                hover:bg-zinc-100 hover:text-zinc-900
                dark:hover:bg-zinc-800 dark:hover:text-white
              "
            >
              <Pencil className="h-4 w-4" />
            </button>

            {isConfirmingDelete ? (
  <div className="flex items-center gap-1">
    <button
      type="button"
      disabled={isDeleting}
      onClick={() => onDelete(todo.id)}
      className="
        h-9 rounded-lg px-2.5
        text-xs font-medium
        text-red-600
        transition
        hover:bg-red-50
        disabled:cursor-not-allowed
        disabled:opacity-50
        dark:text-red-400
        dark:hover:bg-red-950/40
      "
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>

    <button
      type="button"
      disabled={isDeleting}
      onClick={() => setIsConfirmingDelete(false)}
      className="
        flex h-9 w-9 items-center justify-center
        rounded-lg text-zinc-400
        transition
        hover:bg-zinc-100 hover:text-zinc-900
        disabled:cursor-not-allowed
        dark:hover:bg-zinc-800
        dark:hover:text-white
      "
      aria-label="Cancel delete"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
) : (
  <button
    type="button"
    disabled={isUpdating || isDeleting}
    onClick={() => setIsConfirmingDelete(true)}
    aria-label={`Delete "${todo.title}"`}
    className="
      flex h-9 w-9 items-center justify-center
      rounded-lg text-zinc-400
      transition-colors
      hover:bg-red-50 hover:text-red-600
      disabled:cursor-not-allowed
      disabled:opacity-50
      dark:hover:bg-red-950/40
      dark:hover:text-red-400
    "
  >
    <Trash2 className="h-4 w-4" />
  </button>
)}
          </div>
        )}
      </div>
    </article>
  );
}