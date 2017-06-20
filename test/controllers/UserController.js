/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'
import hat from 'hat'

const request = supertest(app)

describe('UserController', () => {
  let [and3, strv, duplicated, testContacts] = []

  let users = [
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradas@gmail.com',
      password: '87985748a3',
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
    {
      firstName: 'andresTestContacts',
      lastName: 'barradasTestContacts',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162',
      gender: 'male',
      email: 'a3barradasTest@gmail.com',
      password: '87985748a3',
    },
  ]

  const crendentials = { email: 'a3barradas@gmail.com', password: '87985748a3' }
  const value = hat()
  const strvContact = { contact: `${value}@strv.com` }

  and3 = users[0]
  strv = users[1]
  duplicated = users[2]
  before(function*() {
    testContacts = yield User.create(users[3])
    testContacts.token = yield Token.generate(testContacts)
    // strv.token = yield Token.generate(strv)
    // duplicated.token = yield Token.generate(duplicated)
  })

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

  it('should auth and3 user', function*() {
    const response = yield request
    .post('/users/auth')
    .send(crendentials)
    .expect(200)
    // proton.log.debug('user', response)
  })

  it('should add STRV as and3 testContacts', function*() {
    const response = yield request
    .post('/users/me/contacts')
    .set('Authorization', `Bearer ${testContacts.token.value}`)
    .send(strvContact)
    .expect(201)
    // proton.log.debug('response', response)
  })

  it('should not add STRV as and3 testContacts', function*() {
    const response = yield request
    .post('/users/me/contacts')
    .set('Authorization', `Bearer ${testContacts.token.value}`)
    .send(strvContact)
    .expect(409)
    // proton.log.debug('response', response)
  })
})
