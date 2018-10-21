import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { apolloUploadExpress } from 'apollo-upload-server'
import bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import path from 'path'
import models from './models'

const app = express()
const server = require('http').createServer(app)

server.listen(4000, () => {
  console.log('app listen to port 4000')
})

app.get('/helloworld', (req, res, next) => {
  res.json({ message: 'hello world' })
})

console.log('hahaha')

// app.all('*', cors())
//
// app.use(
//   '/graphiql',
//   graphiqlExpress({
//     endpointURL: '/graphql'
//   })
// )
//
// app.use(
//   '/graphql',
//   bodyParser.json(),
//   apolloUploadExpress({ uploadDir: './' }),
//   graphqlExpress(req => ({
//     schema, context: { models }
//   }))
// )

process.on('SIGTERM', () => {
  process.exit(0)
})
