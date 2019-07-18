const express = require("express")
const job = express.Router()
const cors = require('cors')

const Job = require('../models/Jobs')
job.use(cors())

job.post('/create', (req, res)=>{
    Job.create({
        date: req.body.date,
        move: req.body.move,
        status: 0
    }).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(400)
    })
})
job.post('/edit', (req,res)=>{
    Job.update({
        date: req.body.date,
        move: req.body.move
    },{
        where: {
            id: req.body.id
        }
    }).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(404)
    })
})
job.post('/delete', (req,res)=>{
    Job.destroy({
        where: {
            id: req.body.id
        }
    }).then(()=> res.sendStatus(200))
    .catch(()=> res.sendStatus(400))
})

job.post('/getall', (req,res)=>{
    Job.findAll({
        order: [
            ['date_time','DESC']
        ]
    }).then((data)=>res.send(data))
    .catch(()=>{
        res.sendStatus(404)
    })
})

job.post('/getlast',(req,res)=>{
    Job.findOne({
        order: [
            ['date_time','DESC']
        ],
        where: {
            status: 0
        }
    }).then((data)=>res.send(data))
    .catch(()=>{
        res.sendStatus(404)
    })
})

module.exports = job