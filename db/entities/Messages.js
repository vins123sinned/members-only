import { pool } from "../pool.js";

class Messages {
  async getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
  }
  async insertMessage(title, text, authorId) {
    await pool.query(
      "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)",
      [title, text, authorId],
    );
  }
  async deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  }
}

export const messages = new Messages();
