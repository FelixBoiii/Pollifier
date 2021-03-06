require('dotenv').config()

const express = require('express')
var cors = require('cors');
const app = express()
const mongoose = require('mongoose')

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database!'))

app.use(express.json())

const pollRouter = require('./routes/polls')
app.use('/polls', pollRouter)

app.listen(3000, () => console.log('Server Started'))