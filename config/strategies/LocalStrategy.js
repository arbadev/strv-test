'use strict'

import Strategy from 'passport-google-plus-token'

export default class LocalStrategy extends Strategy {

  constructor() {
    super(LocalStrategy.opts(), LocalStrategy.strategy)
  }

  static strategy(req, email, password, done) {
    User.findByEmailAndPassword({ email, password })
    .then(admin => done(null, admin))
    .catch(err => done(err, null))
  }

  static opts() {
    return { usernameField: 'email', session: false, passReqToCallback: true }
  }

  static parserToMetadata(profile) {
    // const languages = []
    // languages.push(profile._json.language)
    const metadata = {
      id: profile.id,
      name: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      email: profile.emails[0].value,
      link: profile._json.url,
      gender: profile._json.gender,
      // birthday
      // languages
    }
    return metadata
  }
}
