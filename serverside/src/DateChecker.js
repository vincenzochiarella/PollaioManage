const moment = require('moment')
/**
 * 
 * @param {string} date Converted by moment
 * @returns {boolean} True if past date
 */
function pastDate( date ) {
    var today = moment()
    return (today.diff(date) >= 0)
}

module.exports.checkPastDate = pastDate