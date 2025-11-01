import { argv } from "node:process";
import { Client } from "pg";
import bcrypt from "bcryptjs";

const hashedPasswords = await Promise.all([
  bcrypt.hash("sphinxie2@", 10),
  bcrypt.hash("sumerPride3#", 10),
  bcrypt.hash("heisenberg1!", 10),
]);

// remove initial users and messages to deal with bcrypt password hashes
const SQL = `
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 64 ) NOT NULL,
  last_name VARCHAR ( 64 ),
  username VARCHAR ( 255 ) NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title VARCHAR ( 255 ) NOT NULL,
  text VARCHAR ( 1000 ) NOT NULL,
	timestamp DATE DEFAULT CURRENT_DATE,
	author INTEGER REFERENCES USERS ( id )
);
`;

const main = async () => {
  console.log("seeding");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.query(
    `
    INSERT INTO users (first_name, last_name, username, password, is_member, is_admin) VALUES
      ('Egyptian', 'Sphinx', 'sphinxie', $1, FALSE, FALSE),
      ('Sumerian', 'Riddler', 'ogRIDDLER', $2, TRUE, FALSE),
      ('Walter', 'White', 'Heisenberger', $3, TRUE, TRUE);
  `,
    hashedPasswords,
  );
  await client.query(`
    INSERT INTO messages (title, text, author) VALUES
      ('Who are you talking to right now?', 'Who is it you think you see? Do you know how much I make a year? I mean, even if I told you, you wouldn''t believe it. Do you know what would happen if I suddenly decided to stop going into work? A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. No, you clearly don''t know who you''re talking to, so let me clue you in. I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks!', 3),
      ('My second riddle', 'Which is the creature that has one voice, but has four feet in the morning, two feet in the afternoon, and three feet at night?', 1),
      ('My first riddle', 'There are two sisters; one gives birth to the other, who in turn gives birth to the first. Who are they?', 2);
  `);
  await client.end();
  console.log("done");
};

main();
