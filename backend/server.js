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
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(25) NOT NULL,
  lastname VARCHAR(25) NOT NULL,
  posts VARCHAR(255) NOT NULL,
  likes INT NOT NULL
)
`

    client.query(createUsersTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "Users" created successfully')
    })

    // Create Posts table
    const createPostsTableQuery = `
CREATE TABLE IF NOT EXISTS Posts (
  post_id SERIAL PRIMARY KEY,
  poster_id INT NOT NULL,
  post VARCHAR(255) NOT NULL,
  likes INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (poster_id) REFERENCES Users (id)
)
`

    client.query(createPostsTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "Posts" created successfully')
    })

    // Create Comments table
    const createCommentsTableQuery = `
CREATE TABLE IF NOT EXISTS Comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  poster_id INT NOT NULL,
  comment VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts (post_id),
  FOREIGN KEY (poster_id) REFERENCES Users (id)
)
`

    client.query(createCommentsTableQuery, function (err, result) {
        if (err) {
            console.log(err)
            throw err
        }
        console.log('Table "Comments" created successfully')
    })

    console.log('Database Connected')
})

app.get('/', (req, res) => {
    res.status(200).json('hello there')
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
    const { firstname, lastname, posts } = req.body
    try {
        await client.query(
            `INSERT INTO posts(firstname, lastname, posts) VALUES($1, $2, $3)`,
            [firstname, lastname, posts]
        )
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(400)
        console.log(err)
    }
})

app.listen(8800, () => {
    console.log('server is running Bae')
})
