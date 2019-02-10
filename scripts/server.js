const path = require('path')
const http = require('http')

const connect = require('connect')
const serveStatic = require('serve-static')
const chalk = require('chalk')

const ROOT_DIR = path.join(__dirname, '../dist')
const PORT = process.env.npm_config_port || 4321
const HOST = process.env.npm_config_host

const app = connect()
app.use(serveStatic(ROOT_DIR))
http.createServer(app).listen(PORT, HOST)

// eslint-disable-next-line
console.log(
  chalk.bold(
    `Server running at ${chalk.cyan(
      `http://${HOST || 'localhost'}:${PORT}`,
    )} from ${chalk.green(ROOT_DIR)}`,
  ),
)
