const localDb = `mongodb://localhost/socialmediaapp`
const db = process.env.MONGODB_URI || localDb

module.exports = db
