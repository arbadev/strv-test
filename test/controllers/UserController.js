/* eslint no-undef: 0 */

import supertest from 'co-supertest'
import app from '../../server.js'
import { expect } from 'chai'

const request = supertest(app)

describe.skip('UserController', () => {

  let users = [
    {
      firstName: 'andres',
      lastName: 'barradas',
      avatar: 'https://plus.google.com/u/0/photos/102649207486252015624/albums/profile/6166370300506278162'
      gender: 'male'
      birthdate: '22/03/1991'
      email
    },
    {
      firstName: 'luis',
      email: 'luis@yahoo.io',
      facebookId: 2,
      avatar: 'http://res.cloudinary.com/nucleos/image/upload/v1468541626/1f84ab06f0513b197ffd282c0b615669.jpg',
      message: 'message.mp3',
      coordinates: [7.833070, -62.744980],
      languages: ['5849ebc7d9b29a247da85bbd'],
      gender: 'male',
    },
  ]

  before(function*() {
    barbara = yield User.create(users[0])
    luis = yield User.create(users[1])
    mariangela = yield User.create(users[2])
    andres = yield User.create(users[3])
    barbara.token = yield Token.generate(barbara.facebookId, metadata)
    luis.token = yield Token.generate(luis.facebookId, metadata)
    mariangela.token = yield Token.generate(mariangela.facebookId, metadata)
    andres.token = yield Token.generate(andres.facebookId, metadata)
  })

  after(function*() {
    users = users.map(u => u._id)
    // yield [User.remove(users), Like.remove({}), Purchase.remove({})]
  })


  it('should return a list with the test user', function*() {
    const { body } = yield request
    .get('/users?appLanguage=es')
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(200)
    barbaraTestUser = body[0]
    expect(body).to.not.be.empty
  })


  it('Barbara likes the test user', function*() {
    const response = yield request
    .post(`/users/${barbaraTestUser._id}/like`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(201)
  })

  it('should return a list of users', function*() {
    const { body } = yield request
    .get('/users?appLanguage=es')
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(200)
    barbaraTestUser = body[0]
    expect(body).to.not.be.empty
  })

  it('Barbara dislikes Luis', function*() {
    const { body } = yield request
    .post(`/users/${luis._id}/dislike`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(201)
  })

  // Only execute this test if the process.env.DEFAULT_ALLOWED_LIKES is 1
  it('should return an error because the user dont have permission of see more profiles', function*() {
    const { body } = yield request
    .get('/users?appLanguage=es')
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(402)
  })


  it('should update the subscription to fb of barbara', function*() {
    const { body } = yield request
    .put('/users/me/subscription')
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .send({ type: 'fb' })
    .expect(200)
  })

  it('should update the subscription to inapp of barbara', function*() {
    const purchase = {
      signature: 'ViaRxLCH3PZIdYBGNGyhvNWHlpAU0C2BtElEEj5XB7I9e/ngsT2tS3KVunX7neBPzMmilyGkwxEC1B+LzxYkZKp2MrvMGKjg/Ojwv6Z/i+t19yrFr9uz+I1Cqjr+aVzrakJsh4SKcQjfBEyggzHczw1MuBVm1jRXptTQv93hwAk6KZx0MXZtDsrtneGBNjG1oWWqQKWj1IYBdImQDz/KkjzxGU6X6oeoYU76/4EHoKiU5VMpXXW4MKX74JVZzEMb30KbGqitKooYaO352wr1L+lMovhfpXvbUT/YnJXR+ivkaNk2GVh4ITvxwkI1bddOKu1Zn6qF4BzGgCP8WC2olw==',
      data: {
        orderId: 'GPA.1393-9662-9468-73792',
        packageName: 'com.buffaloapps.android.trivialdrivesample',
        productId: 'infinite_users_monthly',
        purchaseTime: 1484986679943,
        purchaseState: 0,
        purchaseToken: 'nmibfhkmibbnfcoekjdolkmc.AO-J1OwCQ_iorfFvdXORoJDOshDNFYeZmpyngz4dyqwQijRWF4VDl7pwy5zAisXznA15DGvRKQWZ2a8m_0LDZX6Usm_2H-8CpCA9LZ1W-ofpFI4GfPu60Ho-OYRys_opFXBlrV_J6EjIJNMQCkzM8OQAtkp7s9skSkcyFMN44LU5_dbLdhtPWUc',
        autoRenewing: true,
      },
    }
    const { body } = yield request
    .put('/users/me/subscription')
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .send({ type: 'inapp', purchase })
    .expect(200)
  })

  xit('Luis likes Barbara', function*() {
    yield request
    .post(`/users/${barbara._id}/like`)
    .set('Authorization', `Bearer ${luis.token.value}`)
    .expect(201)
  })


  xit('Barbara likes Andres', function*() {
    yield request
    .post(`/users/${andres._id}/like`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(201)
  })

  xit('FindOne', function*() {
    const { body } = yield request
    .get(`/users/${andres._id}`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(200)
    proton.log.debug('findOne', body)
  })


  xit('Andres likes Mariangela', function*() {
    yield request
    .post(`/users/${mariangela._id}/like`)
    .set('Authorization', `Bearer ${andres.token.value}`)
    .expect(201)
  })

  xit('Mariangela likes Andres', function*() {
    yield request
    .post(`/users/${andres._id}/like`)
    .set('Authorization', `Bearer ${mariangela.token.value}`)
    .expect(201)
  })

  xit('Barbara still likes luis', function*() {
    yield request
    .post(`/users/${luis._id}/like`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(201)
  })

  xit('Barbara likes Luis', function*() {
    yield request
    .post(`/users/${luis._id}/like`)
    .set('Authorization', `Bearer ${barbara.token.value}`)
    .expect(201)
  })

  xit('Luis not like Barbara', function*() {
    yield request
    .post(`/users/${barbara._id}/dislike`)
    .set('Authorization', `Bearer ${luis.token.value}`)
    .expect(201)
  })

  xit('Update a user profile', function*() {
    const { body } = yield request
    .put('/users/me')
    .set('Authorization', `Bearer ${luis.token.value}`)
    .send({ firstName: 'Mechas', languages: ['en', 'es'] })
    .expect(200)
    expect(body).to.have.property('languages').and.to.have.lengthOf(2)
  })

  xit('Mariangela still likes Andres', function*() {
    yield request
    .post(`/users/${andres._id}/like`)
    .set('Authorization', `Bearer ${mariangela.token.value}`)
    .expect(201)
  })

  xit('Andres still likes Mariangela', function*() {
    yield request
    .post(`/users/${mariangela._id}/like`)
    .set('Authorization', `Bearer ${andres.token.value}`)
    .expect(201)
  })

  xit('Find me', function*() {
    const { body } = yield request
    .get('/users/me')
    .set('Authorization', `Bearer ${luis.token.value}`)
    .expect(200)
    expect(body).to.have.property('firstName')
    expect(body).to.have.property('email')
    expect(body).to.have.property('facebookId')
    expect(body).to.have.property('status')
    expect(body).to.have.property('avatar')
    expect(body).to.have.property('publicAvatar')
    expect(body).to.have.property('languages').an('array')
  })

  describe.skip('reports on sparks', () => {
    const aReason = 'Photo'
    const aDescription = 'a description'

    it('Mariangela report Andres', function*() {
      yield request
      .post(`/users/${andres._id}/report`)
      .set('Authorization', `Bearer ${mariangela.token.value}`)
      .send({ reason: aReason, description: aDescription })
      .expect(201)
    })
    it('Andres report Mariangela', function*() {
      yield request
      .post(`/users/${mariangela._id}/report`)
      .set('Authorization', `Bearer ${andres.token.value}`)
      .send({ reason: aReason, description: aDescription })
      .expect(201)
    })
  })

  describe.skip('Sparkd Feedbacks', () => {
    const aTitle = 'My title'
    const aDescription = 'a description'

    it('Mariangela sends Feedbacks', function*() {
      yield request
      .post('/users/feedback')
      .set('Authorization', `Bearer ${mariangela.token.value}`)
      .send({ title: aTitle, description: aDescription })
      .expect(201)
    })
    it('Andres sends Feedbacks', function*() {
      yield request
      .post('/users/feedback')
      .set('Authorization', `Bearer ${andres.token.value}`)
      .send({ title: aTitle, description: aDescription })
      .expect(201)
    })
  })

  describe.skip('Create user with FB languages', () => {
    const accessToken = 'EAAIjRkSocuoBAADeULPJ4AiJ0rLwxAVhjmYXFZAOP9HLJhE31W6C3sY4ts4D2qEtEK0XXJ5TnMrY4tcK6YXHrk59e1GOKEcvFsK95YuwojJofAb5MbFuZBE0L0ldVxOaOpH628gyW2vNBQWYZAFrht8Dax9e3YEm13fCwzpCBMxW9uh0Jki1UZCcFWeLzD0R9IENDZAIAhdKwtT3ZCEa8N'
    it('User post', function*() {
      yield request
      .post('/users')
      .set('Authorization', accessToken)
      .expect(200)
    })
  })
})
