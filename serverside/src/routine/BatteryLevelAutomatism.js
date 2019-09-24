const ScriptGetBattery = require('../ScriptPy')
var schedule = require('node-schedule')
var ogniOra = '0 * * * *'

var startBatteryGet = schedule.scheduleJob(ogniOra, function(){
    ScriptGetBattery.startBatteryLevelTakeOver()
})

module.exports.startBatteryScript = startBatteryGet