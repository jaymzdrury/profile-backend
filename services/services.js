const pool = require('../db')
const queries = require('../queries/queries')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')
const timer = require('../utils/timer')
const { NotFoundError } = require('../errors/not-found')
const {end, start, responseTime} = timer 

export async function getData() {
    start
    try {
        const profile = await pool.query(queries.get)
        end
        logger.info(`GET: ${responseTime}`)
        return profile.rows
    } catch (error) {
        throw new NotFoundError()
    }
}

export async function postData(body) {
    start
    const {title, email, msg} = body
    try {
        const newMsg = await pool.query(queries.post, [title, email, msg])
        end
        logger.info(`POST: ${responseTime}`)
        return newMsg.rows[0]
    } catch (error) {
        throw new NotFoundError()
    }
}

export async function putData(params, body) {
    start
    const {id} = params
    const {title} = body
    try {
        const editProfile = await pool.query(queries.put, [title, id])
        end
        logger.info(`UPDATE: ${responseTime}`)
        return editProfile
    } catch (error) {
        throw new NotFoundError()
    }
}

export async function deleteData(params){
    start
    const {id} = params
    try {
        const deleteProfile = await pool.query(queries.remove, [id])
        end
        logger.info(`DELETE: ${responseTime}`)
        return deleteProfile
    } catch (error) {
        throw new NotFoundError()
    }
}

export async function signup(body){
    start
    const {email, password} = body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const signedUp = await pool.query(queries.signup, [email, hashedPassword])
        end
        logger.info(`SIGN UP: ${responseTime}`)
        return signedUp
    } catch (error) {
        throw new NotFoundError()
    }
}

export async function login(body){
    start
    const {email} = body
    try {
        const user = await pool.query(queries.login, [email])
        end
        logger.info(`LOG IN: ${responseTime}`)
        return user
    } catch (error) {
        throw new NotFoundError()
    }
}