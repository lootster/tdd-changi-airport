const moment = require("moment");

const DATE_FORMAT = ["DD/MM/YYYY HHmm"]

class Ticket {
  constructor(bookingReferenceNum, checkInType, dateOfDeparture) {
    this.bookingReferenceNum = bookingReferenceNum;
    this.checkInType = checkInType;
    this.dateOfDeparture = moment(dateOfDeparture, DATE_FORMAT);
  }
}

module.exports = Ticket;
