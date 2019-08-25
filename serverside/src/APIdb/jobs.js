const express = require("express")
const PostRoutes = express.Router()
const cors = require('cors')

const Job = require('../models/Jobs')
const SyncJob = require('../routine/JobSync')
const TimeHelper = require('../DateChecker')
const BrightnessAdaptive = require('../APIdb/chickenhouse')




PostRoutes.use(cors())

PostRoutes.post('/create', (req, res) => {
    constructorJob(req.body.date, req.body.move)
        .then(data => res.send(data))
        .catch(err => res.send(err))

})
PostRoutes.post('/edit', (req, res) => {
    setJob(req.body.id, req.body.date, req.body.move)
        .then(data => res.send(data))
        .catch(err => res.send(err))
})
PostRoutes.post('/delete', (req, res) => {
    removeJob(req.body.id)
        .then(data => res.sendStatus(data))
        .catch(err => res.sendStatus(err))
})

PostRoutes.post('/getall', (req, res) => {
    Job.findAll({
        order: [
            ['date', 'ASC']
        ],
        attributes: ['id', 'date', 'move', 'status']
    }).then((data) => res.send(data))
        .catch((err) => {
            res.send(err)
        })
})
/* TODO: check usage get last job*/
// PostRoutes.post('/getlast', (req, res) => {
//     Job.findOne({
//         order: [
//             ['date', 'ASC']
//         ],
//         attributes: ['id', 'date', 'move', 'status']
//     }).then((data) => res.send(data))
//         .catch((err) => {
//             res.sendStatus(404)
//         })
// })
/**
 * 
 * @param {string} date Date and Time to do the job  
 * @param {var} move 
 */
function constructorJob(date, move) {
    return new Promise((res, rej) => {
        Job.findOne({
            where: {
                date: date,
                move: move
            }
        }).then(check => {
            if (!check && !TimeHelper.checkPastDate(date)) {
                Job.create({
                    date: date,
                    move: move,
                })
                    .then((data) => {
                        BrightnessAdaptive.dbRequest.getAutomatism()
                            .then(auto => {
                                if (auto.dataValues.sun)
                                    SyncJob.newJob(data.dataValues.id, data.dataValues.date, data.dataValues.move)
                            })
                        res(data)
                    })
                    .catch((err) => rej(err))
            } else
                rej("Job giá programmato")
        })

    })
}
/**
 * @param {integer} id Job id
 * @param {string} date Date and Time modified
 * @param {integer} move 1 open 0 close
 */
function setJob(id, date, move) {
    return new Promise((res, rej) => {
        Job.update({
            date: date,
            move: move
        }, {
                where: {
                    id: id
                }
            }).then((data) => {
                BrightnessAdaptive.dbRequest.getAutomatism()
                    .then(data => {
                        if (data.dataValues.sun)
                            SyncJob.editJob(id, date, move)
                    })
                res(JSON.parse(data))
            }).catch((err) => rej(err))
    })
}
/**
 * 
 * @param {integer} id Job id to remove
 */

function removeJob(id) {
    return new Promise((res, rej) => {
        Job.destroy({
            where: {
                id: id
            }
        })
            .then((data) => {
                BrightnessAdaptive.dbRequest.getAutomatism()
                    .then(data => {
                        if (data.dataValues.sun)
                            SyncJob.deleteJob(id)
                    })
                res(200)
            })
            .catch((err) => rej(err))
    })
}
/**
 * @returns {promise} Resolve a list of jobs
 */
function getAllJobs() {
    return new Promise((res, rej) => {
        Job.findAll({
            order: [
                ['date', 'ASC']
            ],
            attributes: ['id', 'date', 'move', 'status']
        })
            .then((data) => res(data))
            .catch((err) => rej(err))
    })
}



module.exports.routes = PostRoutes
module.exports.dbRequest = {
    constructorJob,
    setJob,
    removeJob,
    getAllJobs
}