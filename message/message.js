const moment = require('moment');
const time = moment().format('hh:mm A')
function formatMessage(username, message){
    return {
        username,
        message,
        time: time
    }
}

module.exports = formatMessage;
