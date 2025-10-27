import { pool } from "./pool.js";

const getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 LIMIT 1",
    [username],
  );
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0];
};

const insertUser = async (first_name, last_name, username, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password],
  );
};

const updateMemberStatus = async (id) => {
  await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [id]);
};

const insertMessage = async (title, text, authorId) => {
  await pool.query(
    "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)",
    [title, text, authorId],
  );
};

export {
  getUserByUsername,
  getUserById,
  insertUser,
  updateMemberStatus,
  insertMessage,
};
