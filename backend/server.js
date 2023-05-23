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
