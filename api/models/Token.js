'use strict'

import Model from 'proton-mongoose-model'
import hat from 'hat'

/*
 *------------------------------------------------------------------------------
 *                                    Sub Schemas
 *------------------------------------------------------------------------------
 */
const metadataSchema = {
  firstName: String,
  lastName: String,
  gender: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
  },
}

/*
 *------------------------------------------------------------------------------
 *                              Principal Schema
 *------------------------------------------------------------------------------
 */

export default class Token extends Model {

  schema() {
    return {
      value: String,
      scope: String,
      metadata: metadataSchema,
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    }
  }


  * afterCreate(token, next) {
    const criteria = {
      email: token.metadata.email,
    }
    const values = { lastLoginAt: token.createdAt }
    yield User.update(criteria, values)
    next()
  }

  /**
  * @method
  * @description create a token document
  * @return the token value
  */
  static generate(metadata) {
    const tokenData = {
      metadata,
      value: hat(),
      scope: '*',
    }
    const token = new this(tokenData)
    return token.save()
  }

  static findOneByValue(value) {
    return this.findOne({ value }).lean()
  }

}
