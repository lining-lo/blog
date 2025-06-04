const express = require('express')
const config = require('./config/default')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})