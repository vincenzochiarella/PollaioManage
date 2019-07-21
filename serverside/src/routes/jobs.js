const express = require("express")
const job = express.Router()
const cors = require('cors')

const Job = require('../models/Jobs')
job.use(cors())

job.post('/create', (req, res) => {
    Job.create({
        date: req.body.date,
        move: req.body.move,
        status: 0
    }).then(( data )=>{
        createJobScheduled(data.id, data.date, data.move) = require('../routine/JobSync')
    }).catch(() => {
        res.sendStatus(400)
    })
})
job.post('/edit', (req, res) => {
    Job.update({
        date: req.body.date,
        move: req.body.move
    }, {
            where: {
                id: req.body.id
            }
        }).then((data) => {
            editJobScheduled(data.id, data.date, data.move) = require('../routine/JobSync')
        }).catch(() => {
            res.sendStatus(404)
        })
    
})
job.post('/delete', (req, res) => {
    Job.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        deleteJobScheduled(req.body.id) = require('../routine/JobSync')
    }).catch(() => res.sendStatus(400))
})

job.post('/getall', (req, res) => {
    Job.findAll({
        order: [
            ['date', 'ASC']
        ],
        attributes: ['id','date','move','status']
    }).then((data) => res.send(data))
        .catch((err) => {
            res.sendStatus(404)
        })
})

job.post('/getlast', (req, res) => {
    Job.findOne({
        order: [
            ['date', 'ASC']
        ],
        attributes: ['id','date','move','status']
    }).then((data) => res.send(data))
    .catch(() => {
        res.sendStatus(404)
    })
})

module.exports = job