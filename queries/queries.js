const get = `SELECT * FROM profile WHERE id = '1'`
const post = 'INSERT INTO email(title, email, msg) VALUES($1, $2, $3) RETURNING *'
const put = 'UPDATE profile SET title = $1 WHERE id = $2;'
const remove = 'DELETE FROM profile WHERE id = $1;'
const signup = 'INSERT INTO users (email, hashed_password) VALUES($1, $2)'
const login = 'SELECT * FROM users WHERE email = $1'

module.exports = {get, post, put, remove, signup, login}