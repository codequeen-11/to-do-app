const fs = require("fs/promises");
const path = require("path");

const dataPath = path.join(__dirname, "../data/todos.json");

async function readTodos() {
  const data = await fs.readFile(dataPath, "utf-8");

  return JSON.parse(data);
}

async function writeTodos(todos) {
  await fs.writeFile(
    dataPath,
    JSON.stringify(todos, null, 2),
    "utf-8"
  );
}

async function getAllTodos() {
  return readTodos();
}

async function createTodo(title) {
  const todos = await readTodos();

  const newTodo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.unshift(newTodo);

  await writeTodos(todos);

  return newTodo;
}

async function updateTodo(id, updates) {
  const todos = await readTodos();

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return null;
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...updates,
  };

  await writeTodos(todos);

  return todos[todoIndex];
}

async function deleteTodo(id) {
  const todos = await readTodos();

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return null;
  }

  const [deletedTodo] = todos.splice(todoIndex, 1);

  await writeTodos(todos);

  return deletedTodo;
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};