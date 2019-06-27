const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require("../models/User")

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => res.json({ status: user.email + ' registered' }))
                    .catch(err => {
                        res.send("error" + err)
                    })
            })
        } else {
            res.json({ error: "Un altro utente ha il tuo stesso username" })
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
    User.findOne({
        where: {
           username: req.body.username
        }
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    //espresso in minuti quindi un giorno di validità
                    expiresIn: 1440
                })
                res.send(token)
            }
        } else {
            res.status(400).json({ error: "L'utente non esiste" })
        }
    })
})


module.exports = users