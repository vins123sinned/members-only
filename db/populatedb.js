import { argv } from "node:process";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 64 ) NOT NULL,
  last_name VARCHAR ( 64 ),
  username VARCHAR ( 255 ) NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  is_member BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title VARCHAR ( 255 ) NOT NULL,
  text VARCHAR ( 1000 ) NOT NULL,
	timestamp DATE DEFAULT CURRENT_DATE,
	author INTEGER REFERENCES USERS ( id )
);

INSERT INTO users (first_name, last_name, email, password, is_member)
VALUES
  ('Walter', 'White', 'heisenberg@gmail.com', '1234567', 'true');

INSERT INTO messages (title, text, author)
VALUES
 ('My easy riddle', 'What has one voice but goes on four legs in the morning, two in the afternoon, and three in the evening?', 1);
`;

const main = async () => {
  console.log("seeding");
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
};

main();
