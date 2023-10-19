import { Router } from 'express'

const authController = Router()

authController.get('/auth', (req, res) => {
  return res.send('Hello fuck')
})

export default authController
