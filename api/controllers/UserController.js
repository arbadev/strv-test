'use strict'

import Controller from 'proton-controller'
import Crypto from 'crypto'

export default class UserController extends Controller {
  * create() {
    try {
      const { body } = this.request
      body.password = Crypto.createHash('sha256')
        .update(`${process.env.STRV_SECRET_KEY_SIGNATURE}:${body.password}`)
        .digest('base64')
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
