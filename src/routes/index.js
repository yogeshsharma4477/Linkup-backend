const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const educationRouter = require('./educationRoute')

router.use('/users',userRouter)
router.use('/education',educationRouter)

module.exports = router