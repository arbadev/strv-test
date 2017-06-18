'use strict'

import Router from 'koa-router'

const router = new Router({ prefix: '/auth' })
const { AuthPolicies } = proton.app.policies
const { AuthController } = proton.app.controllers

module.exports = router
