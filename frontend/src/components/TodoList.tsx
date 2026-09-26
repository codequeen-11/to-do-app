import { CheckCircle2, ListTodo } from "lucide-react";
import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  updatingId?: string | null;
  deletingId?: string | null;
  activeFilter?: "all" | "active" | "completed";

}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  updatingId,
  deletingId,
  activeFilter = "all",
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div
        className="
          flex min-h-52 flex-col items-center justify-center
          rounded-2xl border border-dashed
          border-zinc-300 px-6 text-center
          dark:border-zinc-800
        "
      >
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-zinc-100
            text-zinc-500
            dark:bg-zinc-900 dark:text-zinc-400
          "
        >
          <ListTodo className="h-5 w-5" />
        </div>

        {/* <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">
          No tasks here
        </h3> */}

        <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-white">
  {activeFilter === "completed"
    ? "No completed tasks"
    : activeFilter === "active"
      ? "No active tasks"
      : "No tasks yet"}
</h3>

        {/* <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          Add a new task or switch to another filter to see your todos.
        </p> */}

        <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
  {activeFilter === "completed"
    ? "Completed tasks will appear here."
    : activeFilter === "active"
      ? "Active tasks will appear here."
      : "Add your first task to get started."}
 </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          // isUpdating={updatingId === todo.id}
          isUpdating={updatingId === todo.id}
          isDeleting={deletingId === todo.id}
        />
      ))}

      <div className="flex items-center justify-center gap-2 pt-3 text-xs text-zinc-400 dark:text-zinc-500">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>
          {todos.length} {todos.length === 1 ? "task" : "tasks"}
        </span>
      </div>
    </div>
  );
}