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
  email VARCHAR(50) NOT NULL UNIQUE,
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
  FOREIGN KEY (poster_id) REFERENCES Users (id) ON DELETE CASCADE
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
  FOREIGN KEY (post_id) REFERENCES Posts (post_id) ON DELETE CASCADE,
  FOREIGN KEY (poster_id) REFERENCES Users (id) ON DELETE CASCADE
)
`;
    client.query(createCommentsTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "comments" created successfully')
    })

    // Create Likes table
const createLikesTableQuery = `
CREATE TABLE IF NOT EXISTS likes (
  like_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  poster_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE,
  FOREIGN KEY (poster_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT unique_like_per_user_per_post UNIQUE (post_id, poster_id)
)
`;
client.query(createLikesTableQuery, function (err, result) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Table "likes" created successfully');
})
    console.log('Database Connected')
})

//  ------------------------------------- HUVUDSIDAN
app.get('/', (req, res) => {
    res.status(200).json('hello there')
})

//  ------------------------------------- LOGGA IN
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

//  ------------------------------------- HÄMTA ANVÄNDARE
app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Users')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).send('Internal Server Error')
        console.log(err)
    }
})


//  ------------------------------------- HÄMTA EN ANVÄNDARE
app.get('/users/:id', async (req, res) => {
    const poster_id = req.params.id;
    try {
        const result = await client.query(
          `SELECT * FROM Users WHERE id=$1;`,
          [poster_id]
        );

        if (result.rows.length === 0) {
          // No matching user found
          res.status(401).send('Unauthorized');
        } else {
          // Successful Fetch
          res.status(200).json(result.rows[0]);
          console.log('Användare hämtad');
        }
      } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
      }
})

//  ------------------------------------- HÄMTA ALLA INLÄGG FRÅN EN ANVÄNDARE
app.get('/users/:poster_id/posts', async (req, res) => {
  const { poster_id } = req.params
    try {
        const result = await client.query(
          `
          SELECT p.post_id, p.poster_id, p.post, p.likes, p.created_at,
          (
            SELECT COUNT(*) FROM likes WHERE post_id = p.post_id
          ) AS total_likes
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

// ------------------------------------- LÄGG TILL ANVÄNDARE
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

// ------------------------------------- RADERA ANVÄNDARE
app.delete('/users/:poster_id/delete', async (req, res) => {
  const { poster_id } = req.params;
  try {
    await client.query('DELETE FROM users WHERE id = $1', [poster_id]);
    res.status(204).send('användare raderad');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

// ------------------------------------- ÄNDRA ANVÄNDARE
app.put('/users/:poster_id/put', async (req, res) => {
  const { poster_id } = req.params;
  const { firstname, lastname, email, password } = req.body;
  try {
    await client.query(`
    UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5`,
    [firstname, lastname, email, password, poster_id]);
    res.status(204).send('användare updaterad');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

//  ------------------------------------- HÄMTA ALLA Likes
app.get('/likes', async (req, res) => {
  try {
      const result = await client.query('SELECT * FROM likes')
      res.status(200).json(result.rows)
  } catch (err) {
      res.status(500)
      console.log(err)
  }
})

//  ------------------------------------- HÄMTA ALLA INLÄGG
app.get('/posts', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Posts')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})

//  ------------------------------------- HÄMTA ETT INLÄGG
app.get('/posts/:post_id', async (req, res) => {
    const post_id = req.params.post_id;
    try {
        const result = await client.query(
          `SELECT * FROM posts WHERE post_id=$1;`,
          [post_id]
        );

        if (result.rows.length === 0) {
          // No matching user found
          res.status(401).send('Unauthorized');
        } else {
          // Successful Post Fetch
          res.status(200).json(result.rows);
          console.log('Inlägg Hämtat');
          console.log(result.rows[0].likes); // KOLLA ALLA LIKES ETT INLÄGG HAR
        }
      } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
      }
})

//  ------------------------------------- LÄGG TILL INLÄGG
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


// ------------------------------------- RADERA INLÄGG
app.delete('/posts/:post_id/delete', async (req, res) => {
  const { post_id } = req.params;
  try {
    await client.query('DELETE FROM posts WHERE post_id = $1', [post_id]);
    res.status(204).send('inlägg raderat');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

// ------------------------------------- ÄNDRA INLÄGG
app.put('/posts/:post_id/put', async (req, res) => {
  const { post_id } = req.params;
  const { firstname, lastname, email, password } = req.body;
  try {
    await client.query(`
    UPDATE posts SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE post_id = $5`,
    [firstname, lastname, email, password, post_id]);
    res.status(204).send('inlägg updaterat');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

//  ------------------------------------- HÄMTA ALLA KOMMENTARER
app.get('/comments', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Comments')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).send('Internal Server Error')
        console.log(err)
    }
})

//  -------------------------------------  LÄGG TILL KOMMENTAR
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

// ------------------------------------- RADERA KOMMENTAR
app.delete('/comments/:comments_id/delete', async (req, res) => {
  const { comments_id } = req.params;
  try {
    await client.query('DELETE FROM comments WHERE id = $1', [comments_id]);
    res.status(204).send('kommentar raderad');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

// ------------------------------------- ÄNDRA KOMMENTAR
app.put('/comments/:comments_id/put', async (req, res) => {
  const { comments_id } = req.params;
  const { firstname, lastname, email, password } = req.body;
  try {
    await client.query(`
    UPDATE comments SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE comments_id = $5`,
    [firstname, lastname, email, password, comments_id]);
    res.status(204).send('kommentar updaterad');
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

//  ------------------------------------- HÄMTA ALLA GILLADE INLÄGG AV EN ANVÄNDARE
app.get('/users/:poster_id/liked-posts', async (req, res) => {
  const { poster_id } = req.params;
  try {
    const result = await client.query(
      `
      SELECT p.post_id, p.poster_id, p.post, p.likes, p.created_at
      FROM posts p
      JOIN likes l ON p.post_id = l.post_id
      WHERE l.poster_id = $1;
      `,
      [poster_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.log(err);
  }
})

//  ------------------------------------- GILLA ETT INLÄGG
app.post('/posts/:post_id/like', async (req, res) => {
  const { post_id } = req.params;
  const { poster_id } = req.body;
  try {
    const likeQuery = `
      INSERT INTO likes (post_id, poster_id) VALUES ($1, $2)
    `;
    await client.query(likeQuery, [post_id, poster_id]);

    const updateLikesQuery = `
      UPDATE posts SET likes = likes + 1 WHERE post_id = $1
    `;
    await client.query(updateLikesQuery, [post_id]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
})

//  ------------------------------------- OGILLA ETT INLÄGG
app.post('/posts/:post_id/dislike', async (req, res) => {
  const { post_id } = req.params;
  const { poster_id } = req.body;
  try {
    const disLikeQuery = `
      DELETE FROM likes WHERE post_id = $1 AND poster_id = $2`;
    await client.query(disLikeQuery, [post_id, poster_id]);

    const updateLikesQuery = `
      UPDATE posts SET likes = likes - 1 WHERE post_id = $1
    `;
    await client.query(updateLikesQuery, [post_id]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
})

//  ------------------------------------- SERVER IS RUNNING BAE
app.listen(8800, () => {
    console.log('server is running Bae')
})
