import {config} from 'dotenv';
import pkg from 'pg';
const {Client} = pkg;

import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express'

config()
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true
  })
)
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// databaser
const tablesToCreate = [
  {
    name: 'Users',
    columns: [
      { name: 'id', type: 'SERIAL', primaryKey: true },
      { name: 'firstname', type: 'VARCHAR(25)', notNull: true },
      { name: 'lastname', type: 'VARCHAR(25)', notNull: true },
      { name: 'posts', type: 'VARCHAR(255)', notNull: true },
      { name: 'likes', type: 'INTEGER', notNull: true }
    ]
  },
  // Add more objects for each table you want to create
  {
    name: 'Posts',
    columns: [
      { name: 'post_id', type: 'SERIAL', primaryKey: true },
      { name: 'poster_id', type: 'INTEGER', notNull: true },
      { name: 'post', type: 'VARCHAR(255)', notNull: true },
      { name: 'post', type: 'VARCHAR(255)', notNull: true },
    ]
  },
  {
    name: 'Comments',
    columns: [
      { name: 'comment_id', type: 'SERIAL', primaryKey: true },
      { name: 'post_id', type: 'VARCHAR(25)', notNull: true },
      { name: 'poster_id', type: 'VARCHAR(25)', notNull: true },
      { name: 'post_id', type: 'VARCHAR(25)', notNull: true },
      { name: 'post_id', type: 'VARCHAR(25)', notNull: true },
    ]
  }
];

// databas
const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PORT,
  user: process.env.PGUSER
})
client.connect(function(err) {
  client.query(
    `CREATE TABLE IF NOT EXISTS inlägg (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(25),
      lastname VARCHAR(25),
      posts VARCHAR(255),
      likes INTEGER
    )`
  );
  if(err) {
    console.log(err)
    throw err
  }
  console.log('Database Connected')
})

// Lägg till detta sen för att skapa de Collections som vi behöver:
// CREATE TABLE IF NOT EXISTS Users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   email VARCHAR(50) NOT NULL,
//   password VARCHAR(50) NOT NULL
// );

// -- Create the Posts table
// CREATE TABLE IF NOT EXISTS Posts (
//   post_id SERIAL PRIMARY KEY,
//   poster_id INT NOT NULL,
//   post TEXT NOT NULL,
//   likes INT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (poster_id) REFERENCES Users(id)
// );

// -- Create the Comments table
// CREATE TABLE IF NOT EXISTS Comments (
//   comment_id SERIAL PRIMARY KEY,
//   post_id INT NOT NULL,
//   poster_id INT NOT NULL,
//   comment VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (post_id) REFERENCES Posts(post_id)
//   FOREIGN KEY (poster_id) REFERENCES Users(id)
// );

app.get("/", (req, res) => {
  res.status(200).json('hello there')
})

app.get("/posts", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM inlägg')
    res.status(200).json(result.rows);
  }
  catch(err) {
    res.status(500)
    console.log(err)
  }
})

app.post("/posts/submit", async(req, res) => {
  const {firstname, lastname, posts} = req.body;
  try {
    await client.query(
      `INSERT INTO inlägg(firstname, lastname, posts) VALUES($1, $2, $3)`,
      [firstname, lastname, posts]
    )
    res.sendStatus(201)
  }
  catch(err) {
    res.sendStatus(400)
    console.log(err)
  }
})

app.listen(8800, () => {
  console.log("server is running Bae")
})
