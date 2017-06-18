'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/users' })
const { AuthPolicies, UserPolicies } = proton.app.policies
const { UserController } = proton.app.controllers

router.post('/', UserController.create)

module.exports = router
