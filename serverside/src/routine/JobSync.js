var schedule = require('node-schedule')
var moment = require('moment');
var axios = require('axios')
var doorController = require('../DoorController')

const jobs = []

module.exports.newJob = createJobScheduled = (id, date, move) => {
    console.log('Lavoro creato: ' + id + ', ' + moment(date).utc().toDate() + ', ' + move)
    jobs[id] = schedule.scheduleJob(moment(date).utc().toDate(), () => {
        console.log('IN ESECUZIONE' + move)
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
        axios.post('http://localhost:5000/job/delete',{
            id: id
        }).then()
        .catch((err)=>console.log(err))
    })
}

module.exports.editJob = editJobScheduled = (id, date, move) => {
    deleteJobScheduled(id)
    createJobScheduled(id, date, move)
}

module.exports.deleteJob = deleteJobScheduled = (id) => {
    console.log('Lavoro rimosso: ' + id)
    jobs[id].cancel()
}

module.exports.syncAllJob = syncAllJobScheduled = () => {
    axios.post('http://localhost:5000/job/getall').then(data => {
        if (data.data) {
            data.data.forEach(job => {
                createJobScheduled(job.id, job.date, job.move)
            });
        }
    })
}