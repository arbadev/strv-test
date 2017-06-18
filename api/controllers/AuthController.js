
import Controller from 'proton-controller'

export default class AuthController extends Controller {

  * authenticate() {
    try {
      const { metadata, metadata: { email }, facebookId, googleId } = this.request
      const authInformation = facebookId ?
        { facebookId, type: 'facebook' } :
        { googleId, type: 'google' }
      const token = yield Token.generate(authInformation, metadata)
      const criteria = email ? { email } : { facebookId }
      const user = yield User.me(criteria)
      this.response.body = { user, token: token.value }
    } catch (err) {
      proton.log.error('Error authenticating a user', err)
      this.response.status = 400
    }
  }
}
