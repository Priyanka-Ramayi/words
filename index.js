const express = require('express');
const port = process.env.PORT || 3000
const wordsRouter = require('./routers/words')

const app = express()

app.use(express.json())

app.use(wordsRouter) // middleware for words

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})