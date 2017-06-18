'use strict'

import Controller from 'proton-controller'

export default class FirebaseController extends Controller {

  * createToken() {
    try {
      const { user } = this.request
      const { FirebaseService } = proton.app.services
      const token = FirebaseService.generateToken(user._id.toString())
      this.response.status = 201
      this.response.body = { token }
    } catch (err) {
      proton.log.error('An error ocurred creating a FireBase token', err)
      this.status = 400
    }
  }

}
