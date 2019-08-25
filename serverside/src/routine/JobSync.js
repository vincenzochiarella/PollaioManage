var schedule = require('node-schedule')
var moment = require('moment');
var doorController = require('../DoorController')

var JobDB = require('../APIdb/jobs')

var doorJobsId = []
/**
 * 
 * @param {integer} id Job id
 * @param {string} date Date of job execution
 * @param {integer} move Move to do: 1 open 0 close
 */
function createJobScheduled(id, date, move) {
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
        JobDB.dbRequest.removeJob(id)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    })
    console.log(doorJobsId)
}
/**
 * 
 * @param {integer} id Job id getted from db
 * @param {string} date Date modified
 * @param {integer} move Move modified
 */
function editJobScheduled(id, date, move) {
    deleteJobScheduled(id)
    createJobScheduled(id, date, move)
}
/**
 * 
 * @param {integer} id Remove job id
 */
function deleteJobScheduled(id) {
    schedule.cancelJob(`${id}`)
    var index = doorJobsId.indexOf(id);
    console.log(index) 
    if (index > -1) {
        doorJobsId = doorJobsId.splice(index, 1)
    }
    console.log(`Lavaro ${id} cancellato`)
}

function syncAllJobScheduled() {
    JobDB.dbRequest.getAllJobs()
        .then(data => {            
            data.map(job => {
                createJobScheduled(job.id, job.date, job.move)
            })
        })
        .catch(err => console.log(err))
}
function deSyncAllJobScheduled(){
    doorJobsId.map(id => {
        schedule.cancelJob(`${id}`)
    })
}

module.exports.newJob = createJobScheduled
module.exports.editJob = editJobScheduled
module.exports.deleteJob = deleteJobScheduled
module.exports.syncAllJob = syncAllJobScheduled
module.exports.deSyncAllJob = deSyncAllJobScheduled