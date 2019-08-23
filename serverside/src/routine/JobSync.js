var schedule = require('node-schedule')
var moment = require('moment');
var axios = require('axios')
var doorController = require('../DoorController')
var Job = require('../models/Jobs')

var doorJobsId = []

module.exports.newJob = createJobScheduled = (id, date, move) => {
    console.log('Lavoro creato: ' + id + ', ' + moment(date).utc().toDate() + ', ' + move)
    doorJobsId.push(`${id}`)
    schedule.scheduleJob(`${id}`, moment(date).utc().toDate(), () => {
        switch (move) {
            case 0:
                doorController.close('programmazione')
                break;
            case 1:
                doorController.open('programmazione')
                break;
            default:
                break;
        }
        /**
 * FIXME: not use post request but controller
 */
        axios.post('http://localhost:5000/job/delete', {
            id: id
        }).then()
            .catch((err) => console.log(err))
    })
    console.log(doorJobs)
}

module.exports.editJob = editJobScheduled = (id, date, move) => {
    deleteJobScheduled(id)
    createJobScheduled(id, date, move)
}

module.exports.deleteJob = deleteJobScheduled = (id) => {
    schedule.cancelJob(`${id}`)
    console.log(`Lavaro ${id} cancellato`)
}

module.exports.syncAllJob = syncAllJobScheduled = () => {
    /**
     * TODO: Make a controller or a facade to manage obj
     */
    Job.findAll({
        order: [
            ['date', 'ASC']
        ],
        attributes: ['id', 'date', 'move', 'status']
    }).then((data) => {
        data.map(job => {
            createJobScheduled(job.dataValue.id, job.dataValue.date, job.dataValue.move)
        })
    }).catch((err) => {
    })
}
module.exports.deSyncAllJob = deSyncAllJobScheduled = () => {
    doorJobsId.map(id => {
        schedule.cancelJob(`${id}`)
    })
}

