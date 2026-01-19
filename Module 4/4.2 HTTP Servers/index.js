import express from 'express'

//create the instance of express in a fresh app.
const app = express()

// route handlers

//this is only for get request .
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/asd', (req, res) => {
  res.send('Hello World from asd')
})

// which port you want to listen on
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})