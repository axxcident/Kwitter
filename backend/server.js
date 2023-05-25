import { config } from 'dotenv'
import pkg from 'pg'
const { Client } = pkg

import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'

config()
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// databas
const client = new Client({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PORT,
    user: process.env.PGUSER
})

client.connect(function (err) {
    if (err) {
        console.log(err)
        throw err
    }
    // Create Users table
    const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(25) NOT NULL,
  lastname VARCHAR(25),
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
)`;

    client.query(createUsersTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "users" created successfully')
    })

    // Create Posts table
    const createPostsTableQuery = `
CREATE TABLE IF NOT EXISTS posts (
  post_id SERIAL PRIMARY KEY,
  poster_id INT NOT NULL,
  post VARCHAR(255) NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poster_id) REFERENCES Users (id)
)
`;

    client.query(createPostsTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "posts" created successfully')
    })

    // Create Comments table
    const createCommentsTableQuery = `
CREATE TABLE IF NOT EXISTS comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  poster_id INT NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts (post_id),
  FOREIGN KEY (poster_id) REFERENCES Users (id)
)
`;
    client.query(createCommentsTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "comments" created successfully')
    })

    console.log('Database Connected')
})

app.get('/', (req, res) => {
    res.status(200).json('hello there')
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const result = await client.query(
          `SELECT * FROM Users WHERE email=$1 AND password=$2;`,
          [email, password]
        );

        if (result.rows.length === 0) {
          // No matching user found
          res.status(401).send('Unauthorized');
        } else {
          // Successful login
          res.status(200).json(result.rows);
          console.log('Logged in successfully');
        }
      } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
      }
})

app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Users')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).send('Internal Server Error')
        console.log(err)
    }
})
app.get('/users/:poster_id/posts', async (req, res) => {
  const { poster_id } = req.params
    try {
        const result = await client.query(
          `
          SELECT p.post_id, p.poster_id, p.post, p.likes, p.created_at
          FROM posts p
          JOIN users u ON p.poster_id = u.id
          WHERE u.id = $1;
          `,
          [poster_id]);
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).send('Internal Server Error')
        console.log(err)
    }
})

app.post('/users/submit', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const insertUserQuery = `
    INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4)
    `;
    await client.query(insertUserQuery, [firstname, lastname, email, password]);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
})

app.get('/posts', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Posts')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})

app.post('/posts/submit', async (req, res) => {
    const { poster_id, post } = req.body
    try {
        await client.query(
            `INSERT INTO posts (poster_id, post) VALUES($1, $2)`,
            [poster_id, post]
        )
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(400)
        console.log(err)
    }
})

app.get('/comments', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Comments')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).send('Internal Server Error')
        console.log(err)
    }
})

app.post('/comments/submit', async (req, res) => {
  const { post_id, poster_id, comment } = req.body;
  try {
    const insertCommentQuery = `
      INSERT INTO comments (post_id, poster_id, comment) VALUES($1, $2, $3)
    `;
    await client.query(insertCommentQuery, [post_id, poster_id, comment]);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
})

app.listen(8800, () => {
    console.log('server is running Bae')
})
