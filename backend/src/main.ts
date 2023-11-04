import App from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import authController from './auth/auth.controller'

const app = App()

/** Setup the middleware */
app.use(morgan('combined'))
app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(rateLimit({ limit: 60, windowMs: 1000 * 60 }))
app.use(App.json())

/** Register all of the router */
app.use([authController])

app.listen(4000, () => {
  console.log(`Backend Running on port 4000`)
})

export default app
