export default {

  stores: {
    mongo: {
      connection: {
        uri: process.env.MONGODB_URI || 'localhost:27017/STRV'
      },
      adapter: 'mongoose'
    }
  },

  store: 'mongo'

}
