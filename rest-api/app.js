import express from 'express'
import mongoose from 'mongoose'
import apiRoutes from './routes/apiRoutes.js'

const app = express()

app.use(express.json())


const dbURI = 'mongodb+srv://tauranamirskaite:9SfvGZkWJ0XUQahS@clustertaura.foata.mongodb.net/restapi'

mongoose.connect(dbURI)
    .then(result => app.listen(3002))
    .catch(err => console.log(err))


app.set('view engine', 'ejs')


app.use('/api', apiRoutes)
