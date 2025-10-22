import { pool } from "./pool.js";

const insertUser = async (first_name, last_name, username, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password],
  );
};

export { getUserByUsername, getUserById, insertUser };
