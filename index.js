const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    try {
        const profile = await pool.query(`SELECT * FROM profile WHERE id = '1'`)
        res.json(profile.rows)
    } catch (err) {
        console.log(err)
    }
})

app.post('/', async (req, res) => {
    const {title, email, msg} = req.body
    try {
        const newMsg = await pool.query('INSERT INTO email(title, email, msg) VALUES($1, $2, $3) RETURNING *', [title, email, msg])
        res.json(newMsg.rows[0])
    } catch (err) {
        console.log(err)
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title } = req.body
    try {
        const editProfile = await pool.query('UPDATE profile SET title = $1 WHERE id = $2;', [title, id])
        res.json(editProfile)
    } catch (err) {
        console.log(err)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteProfile = await pool.query('DELETE FROM profile WHERE id = $1;', [id])
        res.json(deleteProfile)
    } catch (err) {
        console.log(err)
    }
})

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        await pool.query('INSERT INTO users (email, hashed_password) VALUES($1, $2)', [email, hashedPassword])
        const token = jwt.sign({ email}, 'secret', {expiresIn: '1hr'})
        res.json({ email, token})
    } catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(!user.rows.length) return res.json({detail: 'User does not exist!' })

        const success = await bcrypt.compare(password, user.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        if(success){
            res.json({ 'email': user.rows[0].email, token})
        } else {
            res.json({detail: 'Log in failed'})
        }
    } catch (err) {
        console.log(err)
    }
})

app.all('*', async (req, res) => {
    throw new Error('Server Not Found')
})

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
process.on('unhandledRejection', (err) => {
    server.close(() => process.exit(1))
})

module.exports = app