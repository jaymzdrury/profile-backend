const pino = require('pino')

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd-mm-yyyy',
            ignore: 'pid,hostname'
        }
    }
})

module.exports = logger