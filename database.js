const pgp = require('pg-promise')();

// const database = "test_posts"

// const connection = 'postgres://postgres:SUMANdhakalsd@1@host:5432/' + database

// const db = pgp(connection)

const connection = {
    user:"postgres",
    password:"SUMANdhakalsd@1",
    host: "localhost",
    port: 5432,
    database: "mrcoffee" 
}

const db = pgp(connection)

module.exports = db