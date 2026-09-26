"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import TodoForm from "@/components/TodoForm";
import TodoFilter, {
  type TodoFilterType,
} from "@/components/TodoFilter";
import TodoList from "@/components/TodoList";
import type { Todo } from "@/types/todo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/lib/todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] =
    useState<TodoFilterType>("all");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);


  const loadTodos = async () => {
  try {
    setIsLoading(true);
    setError(null);

    const data = await getTodos();

    setTodos(data);
  } catch (error) {
    console.error("Failed to load todos:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Unable to connect to the server."
    );
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  loadTodos();
}, []);

  const filteredTodos = useMemo(() => {
    switch (activeFilter) {
      case "active":
        return todos.filter((todo) => !todo.completed);

      case "completed":
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  }, [todos, activeFilter]);

  const activeCount = todos.filter(
    (todo) => !todo.completed
  ).length;

  const handleAddTodo = async (title: string) => {
    try {
      setIsAdding(true);
      setError(null);

      const newTodo = await createTodo(title);

      setTodos((currentTodos) => [
        newTodo,
        ...currentTodos,
      ]);
    } catch (error) {
      console.error("Failed to create todo:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create todo"
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      return;
    }

    try {
      setUpdatingId(id);
      setError(null);

      const updatedTodo = await updateTodo(id, {
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === id ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error("Failed to update todo:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update todo"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleEditTodo = async (
    id: string,
    title: string
  ) => {
    try {
      setUpdatingId(id);
      setError(null);

      const updatedTodo = await updateTodo(id, {
        title,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === id ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error("Failed to edit todo:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to edit todo"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      setDeletingId(id);
      setError(null);

      await deleteTodo(id);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete todo"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <Header />

        <section className="mt-12 sm:mt-16">
          <div className="mb-8">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Today
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              What needs to get done?
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Keep track of your tasks and stay focused on what matters.
            </p>
          </div>

          <TodoForm
            onAdd={handleAddTodo}
            disabled={isAdding}
          />

          

          {error && (
  <div
    role="alert"
    className="
      mt-4 flex flex-col gap-3 rounded-xl border
      border-red-200 bg-red-50 p-4
      dark:border-red-900/50
      dark:bg-red-950/30
      sm:flex-row sm:items-center sm:justify-between
    "
  >
    <div>
      <p className="text-sm font-medium text-red-800 dark:text-red-200">
        Something went wrong
      </p>

      <p className="mt-1 text-xs text-red-600 dark:text-red-300">
        {error}
      </p>
    </div>

    <button
      type="button"
      onClick={loadTodos}
      className="
        inline-flex h-9 shrink-0 items-center
        justify-center rounded-lg
        border border-red-200
        bg-white px-3
        text-xs font-medium text-red-700
        transition
        hover:bg-red-50
        dark:border-red-900
        dark:bg-red-950/40
        dark:text-red-300
        dark:hover:bg-red-950
      "
    >
      Try again
    </button>
  </div>
)}

          <div className="mt-8">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Your tasks
                </h3>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {activeCount === 0
                    ? "Everything is completed."
                    : `${activeCount} ${
                        activeCount === 1
                          ? "task"
                          : "tasks"
                      } remaining`}
                </p>
              </div>

              <TodoFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                      h-20 animate-pulse rounded-2xl
                      border border-zinc-200
                      bg-white
                      dark:border-zinc-800
                      dark:bg-zinc-900
                    "
                  />
                ))}
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                updatingId={updatingId}
                deletingId={deletingId}
                activeFilter={activeFilter}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}