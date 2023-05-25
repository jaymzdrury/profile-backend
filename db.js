const Pool = require('pg').Pool
const { BadRequestError } = require('./errors/bad-request')
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'postgres'
})

const db = pool.connect((err, client, done) => {
    if(err) throw new BadRequestError(`Postgres Failed: ${err}`)
    return client
})

module.exports = db