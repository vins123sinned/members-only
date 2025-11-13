import { pool } from "../pool.js";

class Users {
  async getUserByUsername(username) {
    // get username case-insensitive(ly)
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username ILIKE $1 LIMIT 1",
      [username],
    );
    return rows[0];
  }
  async getUserById(userId) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1 LIMIT 1",
      [userId],
    );
    return rows[0];
  }
  async insertUser(first_name, last_name, username, password) {
    await pool.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, username, password],
    );
  }
  async updateMemberStatus(userId) {
    await pool.query("UPDATE users SET is_member = TRUE WHERE id = $1", [
      userId,
    ]);
  }
  async updateAdminStatus(userId) {
    await pool.query("UPDATE users SET is_admin = TRUE where id = $1", [
      userId,
    ]);
  }
}

export const users = new Users();
