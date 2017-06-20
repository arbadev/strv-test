'use strict'
import Router from 'koa-router'

const router = new Router({ prefix: '/users' })
const { AuthPolicies } = proton.app.policies
const { UserController, AuthController } = proton.app.controllers

router.post('/', UserController.create)

router.post('/auth', AuthPolicies.local, AuthController.authenticate)

router.get('/:id/contacts', AuthPolicies.bearer, UserController.retrieveContacts)

router.get('/me/contacts', AuthPolicies.bearer, UserController.retrieveContacts)

router.post('/:id/contacts', AuthPolicies.bearer, UserController.addContact)

router.post('/me/contacts', AuthPolicies.bearer, UserController.addContact)


module.exports = router
