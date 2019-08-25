const DoorStatus_Log = require('./models/DoorStatus_Log')
const DoorDB = require('./APIdb/chickenhouse')


module.exports.open = open = (auth) => {
    DoorStatus_Log.create({
        user_authorized: auth,
        movement: 1
    })
    DoorDB.dbRequest.getDoorStatus()
        .then(data => {
            if (data.dataValues.doorStatus === 0) {
                DoorDB.dbRequest.setDoorStatus(2)
                    .then( data => {
                        require('./ScriptPy/index').runOpendoor()
                        setTimeout(() => {
                            DoorDB.dbRequest.setDoorStatus(1)
                        }, 30000)
                    })
            }})
}

module.exports.close = close = (auth) => {
    DoorStatus_Log.create({
        user_authorized: auth,
        movement: 0
    })
    DoorDB.dbRequest.getDoorStatus()
    .then(data => {
        if (data.dataValues.doorStatus === 1) {
            DoorDB.dbRequest.setDoorStatus(2)
                .then( data => {
                    require('./ScriptPy/index').runOpendoor()
                    setTimeout(() => {
                        DoorDB.dbRequest.setDoorStatus(0)
                    }, 30000)
                })
        }})
}