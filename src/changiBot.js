const { ticketService, baggageService, messageService } = require("./service");

class ChangiBot {
  checkIn(ticket, baggage) {
    if (ticketService.isValid(ticket) && ticketService.isOnTime(ticket)) {
      if (baggageService.isThereBaggage(baggage)) {
        if (baggageService.isWithinWeightLimit(ticket, baggage)) {
          return messageService.getAllowedMessage();
        } else {
          let excessBaggageFees = baggageService.calculateFees(ticket, baggage);
          return messageService.getAllowedMessageWithFees(excessBaggageFees);
        }
      }
      return messageService.getAllowedMessage();
    }
    return messageService.getNotAllowedMessage();
  }
}

module.exports = ChangiBot;
