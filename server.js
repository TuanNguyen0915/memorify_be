//* .env config
import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//* database
import './configs/database.js'

//* routers
import { router as authRouter } from './routers/auth.router.js'
import { router as userRouter } from './routers/user.router.js'

const app = express()
const PORT = process.env.PORT

//* middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
  })
)
//* user routers
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
