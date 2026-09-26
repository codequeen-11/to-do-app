const todoService = require("../services/todoService");

async function getTodos(req, res) {
  try {
    const { status } = req.query;

    let todos = await todoService.getAllTodos();

    if (status === "active") {
      todos = todos.filter((todo) => !todo.completed);
    }

    if (status === "completed") {
      todos = todos.filter((todo) => todo.completed);
    }

    res.json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);

    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
}

async function createTodo(req, res) {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Todo title is required",
      });
    }

    const todo = await todoService.createTodo(title.trim());

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);

    res.status(500).json({
      message: "Failed to create todo",
    });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updates = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          message: "Todo title cannot be empty",
        });
      }

      updates.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be a boolean",
        });
      }

      updates.completed = completed;
    }

    const todo = await todoService.updateTodo(id, updates);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);

    res.status(500).json({
      message: "Failed to update todo",
    });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const deletedTodo = await todoService.deleteTodo(id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);

    res.status(500).json({
      message: "Failed to delete todo",
    });
  }
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};