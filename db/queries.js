import { pool } from "./pool.js";

const getUserByUsername = async (username) => {
  // get username case-insensitive(ly)
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username ILIKE $1 LIMIT 1",
    [username],
  );
  return rows[0];
};

const getUserById = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [userId],
  );
  return rows[0];
};

const insertUser = async (first_name, last_name, username, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password],
  );
};

const updateMemberStatus = async (userId) => {
  await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [userId]);
};

const updateAdminStatus = async (userId) => {
  await pool.query("UPDATE users SET is_admin = TRUE where id = $1", [userId]);
};

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const insertMessage = async (title, text, authorId) => {
  await pool.query(
    "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)",
    [title, text, authorId],
  );
};

const deleteMessage = async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

export {
  getUserByUsername,
  getUserById,
  insertUser,
  updateMemberStatus,
  updateAdminStatus,
  getAllMessages,
  insertMessage,
  deleteMessage,
};
