'use strict'

import { Strategy } from 'passport-http-bearer'

export default class BearerStrategy extends Strategy {

  constructor() {
    super(BearerStrategy.strategy)
  }

  static strategy(value, done) {
    // proton.log.debug('token value', value)
    Token.findOneByValue(value)
      .then(token => {
        if (!token) throw new Error('Token not found')

        const criteria = token.facebookId ?
          { facebookId: token.facebookId } :
          { googleId: token.googleId }
        return Promise.all([token, User.findOne(criteria)])
      })
      .then(([token, user]) => {
        if (!user) return done(null, token, 'without user')
        user.token = token
        return done(null, user, token.scope)
      })
      .catch(done)
  }
}
