import express from 'express'

const router = express.Router()

import users from './userRoute'
import categories from './categoryRoute'
import questions from './questionRoute'
import answers from "./answerRoute"

router.use('/v1/users', users)
router.use('/v1/categories', categories)
router.use('/v1/questions', questions)
router.use('/v1/answers', answers)


export default router