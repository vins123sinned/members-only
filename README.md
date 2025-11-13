# members-only

A website for riddle enjoyers only! This Node/Express project is made to practice with authentication using Passport.js so that while outsiders can see posts, only members will know who wrote it and when. There will also be an admin level where they can delete posts on top of the existing member privileges.

The strategy used in this project will be passport-local’s “LocalStrategy.” It takes a username and password, does some verification, and then either logs the user in or sends an error message. Using this, users will be able to register, log in, log out, or do anything that an account offers. Login information will also be saved while the user moves around the website through the power of sessions which is built into Passport.js as well. All in all, authentication is one of the most common website features so doing this project will set a great foundation for whichever project I’ll be doing in the future. It also seems really awesome and cool to do so I’m excited for this project!

<img width="1710" height="857" alt="A screenshot of the homepage" src="https://github.com/user-attachments/assets/91e9f92e-27a7-406d-93d9-a50850665ef7" />

<p align="center">
  <a href="https://equivalent-ajay-vinson-969440ef.koyeb.app/">
    View live site
  </a>
</p>

## Features
- A fully fledged message/forum website
- Ability to log in, sign up, and log out
- Create messages to share with other riddlers
- Member status to allow users to see the authors and dates of other messages
- Admin status to delete any inappropriate message
- User authentication with Passport.js
- Securing of passwords using bcryptjs
- Forms validated with express-validator
- And much more!

## Built With

-- **Node.js**: JavaScript runtime environment allowing JavaScript code outside of a web browser
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **EJS**: Simple, unopinionated templating language that lets you generate HTML markup with plain JavaScript
- **express-validator**: Set of express.js middlewares that validates and sanitizes incoming request data from forms
- **node-postgres (pg)**: Collection of node.js modules for interfacing with PostgreSQL databases
- **Passport.js**: Authentication middleware for Node.js applications built with Express
- **passport-local**: Passport.js strategy for username and password log in
- **express-session**: Session middleware that Passport.js uses as a dependency in the background
- **bcryptjs**: Library with zero dependencies that secures passwords by hashing them with a salt
- **dotenv**: Zero-dependency module that loads environment variables from a .env file into process.env
- **connect-pg-simple**: Minimal PostgreSQL session store for Express/Connect, used to store Passport.js' sessions
- **PostgreSQL**: Powerful, open source object-relational database system
- **Prettier**: Opinionated code formatter for making code pretty ✨

## Installation
Make sure you have [Node.js installed](https://www.theodinproject.com/lessons/foundations-installing-node-js) before following along!

- Clone the repository to your local computer:

```bash
git clone git@github.com:<your-username>/members-only.git
```

- Navigate into the directory

```bash
cd members-only
```

- Install all dependencies

```bash
npm install
```

- Open up the PostgreSQL shell ([Tutorial](https://www.theodinproject.com/lessons/nodejs-installing-postgresql) if you haven't installed PostgreSQL yet)

```bash
psql
```

- Create a database for the project

```bash
CREATE DATABASE members_only;
```

- Quit the PostgreSQL shell

```bash
\q
```

- Run the populate script with your new database URL

```bash
npm run populatedb -- postgresql://<role_name>:<role_password>@localhost:5432/members_only
```

- Start the Node server

```bash
node --watch app.js
```

Now you're all set. Have fun!

## Reflections
I am content with the way this project went. I decided to first go for all of the necessary functionalities for my project like user authentication and forms before moving onto styling and polishing the website. By completing my project in this manner, I was able to hyperfocus on only one small feature at a time. This was a big boost over my previous projects where I essentially had to multitask between multiple files and features. Instead of constantly switching around and getting lost, I was able to divide and conquer this project successfully and complete it in a relatively quick timeframe. In fact, I've heard that [multitasking is actually a myth](https://www.npr.org/2008/10/02/95256794/think-youre-multitasking-think-again) and my experience with this project did indeed support what the article discovered. In other words: instead of multitasking multiple features at once, build one small feature, complete it, and go from there.

Another thing I would like to reflect on is the time this project took. Looking back at the commits log I saw that I created this repository on October 14th and worked on it until November 12th. While it took about the same time as my previous project it actually doesn't seem to be the case. Here's a quick background to explain what I mean: a month ago I suddenly became burnt out on programming and began to procrastinate by spending all of my time on social media. This sudden change put a dent on my progress and it halted even though I still spent at least an hour to program everyday. In fact this was exactly around the time I started my Mini Message Board project where I spent over a month slogging through it at 4 hours per day. I'm still battling my phone usage right now but it definitely has gotten much better. For this project however, I spent only 1-2 hour a day to work on it yet I was able to complete my project faster than before. On top of it all, I was enjoying it rather than hating it.

The root cause of this began outside of my computer and in my personal life. To remedy my burnout, I decided to quit my phone and social media (still working on it, but much better now) and begin some new hobbies that related to web development. In the end I came up with two new hobbies: Blender and Roblox Studio. I also picked up reading again and started to meditate as well. These were all some big changes to my life but as time went on they started to sprout the fruits of their labor. Doing all of these good habits directly helped the progress of everything I'm doing and I am starting to pick back up steam again. Turns out that what you do outside of programming also influences what you do inside of it.

Today I plan on increasing my web development time to at least 3 hour a day as I plan for a job search. Apologies if my writing seems a bit... dense but I had to get it out for my reflection 😅. Anyways I plan on continuing to build up better habits not just for the sake of my web development journey, but also for the sake of my personal health too. I see the progress I've made so far and it's huge, but there is still so many more for me to do. So I'll see you in the next one; Have a nice day.

P.S. Did you see the use of the elusive semicolon at the end there?


