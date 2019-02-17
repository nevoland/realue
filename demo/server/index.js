import Koa from 'koa'
import cors from '@koa/cors'
import chokidar from 'chokidar'
import bodyParser from 'koa-bodyparser'

const PORT = 4000

const watcher = chokidar.watch(__dirname)

watcher.on('ready', async () => {
  watcher.on('all', (event, path) => {
    // eslint-disable-next-line no-console
    console.log(`Updated "${path}"`)
    Object.keys(require.cache).forEach((id) => {
      if (id !== __filename && id.startsWith(__dirname)) {
        delete require.cache[id]
      }
    })
  })
})

const app = new Koa()

app.use(cors())

app.use(bodyParser())

app.use(async (context, next) =>
  require('./middlewares').default(context, next),
)

app.listen(PORT)

// eslint-disable-next-line no-console
console.log(`Listening on port ${PORT}…`)
