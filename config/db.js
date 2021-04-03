// const localDb = `mongodb://localhost:27017/innerCircle`
// const db = process.env.MONGODB_URI || localDb
const db = `mongodb+srv://sam:${process.env.DB_PASSWORD}@cluster1.hyibd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

module.exports = db
