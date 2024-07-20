const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', routes)

const PORT = process.env.PORT || 6010

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})