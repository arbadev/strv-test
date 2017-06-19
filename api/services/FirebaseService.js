
import Service from 'proton-service'
import Model from 'proton-mongoose-model'
import firebase from 'firebase'
/*
 * -----------------------------------------------------------------------------
 *                                Constants
 * -----------------------------------------------------------------------------
 */

const databaseURL = process.env.FIREBASE_DB
const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
const serviceAccount = { projectId, clientEmail, privateKey }

firebase.initializeApp({ serviceAccount, databaseURL })

const db = firebase.database()
const contacts = db.ref('contacts')

export default class FirebaseService extends Service {

  generateToken(id) {
    return firebase.auth().createCustomToken(id)
  }

  postContact(id, contact) {
    return contacts.child(`${id}`).push(contact)
    .then(userContact => proton.log.debug('new userContact', userContact))
    .catch(err => proton.log.debug('error', err))
  }

}

/*
 * -----------------------------------------------------------------------------
 *                             FireBase Events
 * -----------------------------------------------------------------------------
 */

contacts.on('child_changed', logContacts)
contacts.on('child_added', logContacts)

// function updateCoordinates(snap) {
//   const _id = Model.parseObjectId(snap.key)
//   const { location } = snap.val()
//   const coordinates = [parseFloat(location.lat), parseFloat(location.lng)]
//   User.findOneAndUpdate({ _id }, { coordinates })
//     .then(user => {})
//     .catch(err => console.log(err))
// }

function logContacts(snap) {
  const _id = Model.parseObjectId(snap.key)
  const contactsSnap = snap.val()
  proton.log.debug(`Firebase ---> user ${_id} contacts`, contactsSnap)
  // return userContacts
}
