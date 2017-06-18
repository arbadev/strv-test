'use strict'

import Controller from 'proton-controller'
import Crypto from 'crypto'

export default class UserController extends Controller {
  * create() {
    try {
      const { body } = this.request
      body.password = yield User.signPassword(body.password)
      const user = yield User.create(body)
      const token = yield Token.generate(user)
      this.response.body = { user, token }
      return this.response.status = 201
    } catch(err) {
      const userMessage = (err.message.includes('email')) ?
        'The email is already in use' : 'Something wrong happend'
      this.response.body = {
        code: 4409,
        description: err.message,
        userMessage,
      }
      return this.response.status = 409
    }
  }
}
