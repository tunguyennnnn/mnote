import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { apolloUploadExpress } from 'apollo-upload-server'
import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import path from 'path'
import models from './models'
import schema from './graphql'
import { authCheck } from './services/authentication'

const app = express()
const server = require('http').createServer(app)

server.listen(4000, () => {
  console.log('app listen to port 4000')
})

app.all('*', cors())

app.use(express.static(path.join(__dirname, 'public')))
app.get('/instagram', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/mynotes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/noters', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/noters/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

app.use(authCheck)

app.use(
  '/graphql',
  bodyParser.json(),
  apolloUploadExpress({ uploadDir: './' }),
  graphqlExpress(req => ({
    schema, context: { models, user: req.user }
  }))
)

process.on('SIGTERM', () => {
  process.exit(0)
})
