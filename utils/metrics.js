const express = require('express')
const client = require('prom-client')
const logger = require('./logger')

const app = express()

export const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time',
    help: 'REST API time in seconds',
    labelNames: ['method', 'route', 'status_code']
})

export function startMetricsServer(){
    const collectDefaultMetrics = client.collectDefaultMetrics
    collectDefaultMetrics()

    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType)
        return res.send(await client.register.metrics())
    })

    app.listen(9100, () => logger.info('Metrics server started at port 9100'))
}

