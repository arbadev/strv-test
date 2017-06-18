'use strict'

import Strategy from 'passport-google-plus-token'

export default class GooglePlusStrategy extends Strategy {

  constructor() {
    super(GooglePlusStrategy.opts(), GooglePlusStrategy.strategy)
  }

  static strategy(req, accessToken, refreshToken, profile, done) {
    const metadata = GooglePlusStrategy.parserToMetadata(profile)
    done(null, metadata)
  }

  static opts() {
    return {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    }
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
