const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const routes = require('./routeHandler')
const cookieParser = require('cookie-parser')
const responseTime = require('response-time')
const logger = require('./utils/logger')
const { restResponseTimeHistogram, startMetricsServer } = require('./utils/metrics')

const app = express()

const options = {origin: process.env.ORIGIN}
app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    responseTime((req, res, time) => {
        if(req.url){
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.url,
                    status_code: req.statusCode
                },
                time * 1000
            )
        }
    })
)

routes(app)

app.all('*', async (req, res) => {
    throw new Error('Server Not Found')
})

startMetricsServer()

const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err}`)
    server.close(() => process.exit(1))
})

module.exports = app