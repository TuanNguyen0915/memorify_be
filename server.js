import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './configs/database.js'
import { router as userRouter } from './routers/auth.router.js'
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

app.use('/api/auth', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
