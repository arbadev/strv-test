/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'

const request = supertest(app)

describe('UserController', () => {
  let users = [
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradas@gmail.com',
    },
    {
      firstName: 'strv',
      lastName: 'strv',
      avatar: 'https://www.strv.com/fb-share.png',
      gender: 'other',
      email: 'hello@strv.com',
    },
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradas@gmail.com',
    },
  ]
  const and3 = users[0]
  const strv = users[1]
  const duplicated = users[2]
  // before(function*() {
  //   // and3.token = yield Token.generate(and3)
  //   // strv.token = yield Token.generate(strv)
  //   // duplicated.token = yield Token.generate(duplicated)
  // })

  after(function*() {
    users = users.map(u => u._id)
    yield [User.remove(users)]
  })

  it('should create and3 user', function*() {
    const response = yield request
    .post('/users')
    .send(and3)
    .expect(201)
    // proton.log.debug('and3', response)
  })

  it('should create strv user', function*() {
    const response = yield request
    .post('/users')
    .send(strv)
    .expect(201)
    // proton.log.debug('strv', response)
  })

  it('should not create duplicated user', function*() {
    const response = yield request
    .post('/users')
    .send(duplicated)
    .expect(409)
    // proton.log.debug('duplicated', response)
  })
})
