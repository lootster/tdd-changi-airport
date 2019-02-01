const moment = require("moment");

const BOOKING_REFERENCE_NUM_LENGTH = 6;
const ECONOMY_TYPE = "economy";
const PREMIUM_TYPE = "premium economy";
const BUSINESS_TYPE = "business class";

function isBookingReferenceNumValid(ticket) {
  return (
    ticket.bookingReferenceNum &&
    ticket.bookingReferenceNum.length === BOOKING_REFERENCE_NUM_LENGTH
  );
}

function isCheckInTypeValid(ticket) {
  return (
    ticket.checkInType &&
    (ticket.checkInType === ECONOMY_TYPE ||
      ticket.checkInType === PREMIUM_TYPE ||
      ticket.checkInType === BUSINESS_TYPE)
  );
}

function isDateOfDepartureValid(ticket) {
  return ticket.dateOfDeparture && ticket.dateOfDeparture.isValid();
}

class TicketService {
  isValid(ticket) {
    return (
      ticket &&
      isBookingReferenceNumValid(ticket) &&
      isCheckInTypeValid(ticket) &&
      isDateOfDepartureValid(ticket)
    );
  }
  isOnTime(ticket) {
    let now = moment();
    let limitTime = ticket.dateOfDeparture.clone().subtract(1, "hours");
    return now.isBefore(limitTime);
  }
  isBusinessClass(ticket) {
    return ticket.checkInType === BUSINESS_TYPE;
  }
  isPremiumEconomy(ticket) {
    return ticket.checkInType === PREMIUM_TYPE;
  }
  isEconomy(ticket) {
    return ticket.checkInType === ECONOMY_TYPE;
  }
}

module.exports = TicketService;
