'use strict'

import Controller from 'proton-controller'

export default class FeedbackController extends Controller {
  // test
  * create() {
    try {
      const from = this.request.user._id
      const { title } = this.request.body
      const { description } = this.request.body
      const criteria = { _id: from }
      const userReporter = yield User.findOne(criteria)
      const userName = `${userReporter.firstName} ${userReporter.lastName}`
      const userEmail = userReporter.email
      const content = { title, description, from, userName, userEmail }
      const { EmailService } = proton.app.services
      const subject = 'FEEDBACK SPARKD'
      EmailService.sendFeedbackMail(subject, content)
      yield Feedback.create({ from, title, description })
      this.response.status = 201
    } catch (err) {
      proton.log.error('An error ocurred creating a feedback', err)
      this.status = 400
    }
  }
}
