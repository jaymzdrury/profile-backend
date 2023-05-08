const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../index')
const pool = require('../db')

describe('Test the endpoints', function(){

    before(function(done){
        pool.connect()
        .then(() => done())
        .catch((err) => done(err))
    })

    after(function(done){
        pool.end()
        .then(() => done())
        .catch((err) => done(err))
    })

    it('should return profile data for GET /', function(done){
        try {
            supertest(app)
            .get('/')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('id');
                expect(res.body[0]).to.have.property('title');
                done();
            })
            .catch((err) => done(err))
        } catch (err) {
            done(err)
        }
    })

    it('should create a new message for POST /', function(done){
        try {
            const message = {
                title: 'Test Title',
                email: 'test@example.com',
                msg: 'Test message'
            }
            supertest(app)
                .post('/')
                .send(message)
                .expect(200)
                .then((res) => {
                    expect(res.body).to.have.property('title');
                    expect(res.body.title).to.equal(message.title);
                    expect(res.body).to.have.property('email');
                    expect(res.body.email).to.equal(message.email);
                    expect(res.body).to.have.property('msg');
                    expect(res.body.msg).to.equal(message.msg);
                    done()
                })
                .catch((err) => done(err))            
        } catch (err) {
            done(err)
        }
    })
})