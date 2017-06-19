'use strict'

import { Strategy } from 'passport-http-bearer'
import moment from 'moment'

export default class BearerStrategy extends Strategy {

  constructor() {
    super(BearerStrategy.strategy)
  }

  static strategy(value, done) {
    // proton.log.debug('token value', value)
    Token.findOneByValue(value)
      .then(token => {
        if (!token) throw new Error('Token not found')
        const now = moment()
        const tokenExpiredAt = moment(token.expiredAt)
        if (now.isAfter(tokenExpiredAt)) throw new Error('Expired Token')
        const criteria = { email: token.metadata.email, password: token.metadata.password }
        return Promise.all([token, User.findByEmailAndPassword(criteria)])
      })
      .then(([token, user]) => {
        if (!user) return done(null, token, 'without user')
        user.token = token
        return done(null, user, token.scope)
      })
      .catch(done)
  }
}
