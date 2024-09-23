const db = require("../database");

const createTask = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const { task_name, is_done } = req.body;
    const query = "INSERT INTO tasks (task_name, is_done) VALUES(?,?)";
    const [result] = await conn.execute(query, [task_name, is_done]);
    console.log(result.insertId);
    res.status(201).json({
      data: "Tasks created",
    });
  } catch (error) {
    console.log("Failed to create tasks: " + error);
    res.status(500).json({
      error: "failed to create tasks",
    });
  } finally {
    //release connection
    conn.release();
  }
};

const fetchAllTask = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const query = "SELECT * FROM tasks";
    const [rows] = await conn.execute(query);
    res.status(200).json({
      data: rows,
    });
  } catch (error) {
    console.log("Failed to get all tasks: ");
    res.status(500).json({
      error: "failed to get all tasks",
    });
  } finally {
    //release connection
    conn.release();
  }
};

const fetchTaskById = async (req, res) => {
  let conn;
  try {
    const id = parseInt(req.params.id);
    conn = await db.getConnection();
    const query = `SELECT * FROM tasks where id=${id}`;
    const [rows] = await conn.execute(query);
    res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    console.log("Failed to get  tasks ");
    res.status(500).json({
      error: "failed to get  tasks",
    });
  } finally {
    //release connection
    conn.release();
  }
};

const updateTaskById = async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const id = parseInt(req.params.id);
    const { task_name, is_done } = req.body;
    const query = `UPDATE tasks SET task_name=?,is_done=?,updated_at=? where id=?`;
    const [result] = await conn.execute(query, [
      task_name,
      is_done,
      new Date(),
      id,
    ]);
    res.status(201).json({
      data: "Tasks updated",
    });
  } catch (error) {
    console.log("Failed to updated tasks: " + error);
    res.status(500).json({
      error: "failed to updated tasks",
    });
  } finally {
    //release connection
    conn.release();
  }
};
const deleteTaskById = async (req, res) => {
  let conn;
  try {
    const id = parseInt(req.params.id);
    conn = await db.getConnection();
    const query = `DELETE FROM tasks where id=${id}`;
    const [result] = await conn.execute(query);
    res.status(200).json({
      data: "Task is deleted successfully!",
    });
  } catch (error) {
    console.log("Failed to delete tasks ");
    res.status(500).json({
      error: "failed to delete tasks",
    });
  } finally {
    //release connection
    conn.release();
  }
};

module.exports = {
  createTask,
  fetchAllTask,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
};
