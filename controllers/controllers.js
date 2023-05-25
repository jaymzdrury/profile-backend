const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { getData, postData, putData, deleteData, signup, login } = require('../services/services')

const get = async (req, res) => {
    const result = await getData()
    return res.status(200).json(result)
}

const post = async (req, res) => {
    const result = await postData(req.body)
    return res.status(200).json(result)
}

const put = async (req, res) => {
    const result = await putData(req.params, req.body)
    return res.status(200).json(result)
}

const remove = async (req, res) => {
    const result = await deleteData(req.params)
    return res.status(200).json(result)
}

const signedUp = async (req, res) => {
    await signup(req.body)
    const token = jwt.sign(req.body.email, 'secret', {expiresIn: '1hr'})
    return res.status(200).json({...req.body.email, token})
}

const login = async (req, res) => {
    const result = await login(req.body)
    if(!result.rows.length) return res.json({detail: 'User does not exist'})

    const success = await bcrypt.compare(req.body.password, result.rows[0].hashed_password)
    const token = jwt.sign(req.body.email, 'secret', {expiresIn: '1hr'})

    if(success){
        res.status(200).json({email: user.rows[0].email, token })
    } else {
        res.status(400).json({detail: 'Log in failed'})
    }
}

module.exports = {get, post, put, remove, signedUp, login}