'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/users' })
const { AuthPolicies } = proton.app.policies
const { UserController, AuthController } = proton.app.controllers

router.post('/', UserController.create)

router.post('/auth', AuthPolicies.local, AuthController.authenticate)

module.exports = router
