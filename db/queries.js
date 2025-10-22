import { pool } from "./pool.js";

const getUserByUsername = async (username) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 LIMIT 1",
    [username],
  );
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = pool.query("SELECT * FROM users WHERE id = $1 LIMIT 1", [
    id,
  ]);
  return rows[0];
};

const insertUser = async (first_name, last_name, username, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password],
  );
};

export { getUserByUsername, getUserById, insertUser };
