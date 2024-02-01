import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './configs/database.js'

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
  })
)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
