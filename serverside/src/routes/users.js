const express = require("express")

const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const user = require("../models/User")

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/login', (req, res ) => {
    const today = new Date()
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
})