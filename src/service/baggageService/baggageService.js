const ticketService = require("../ticketService");

const ECONOMY_WEIGHT_LIMIT = 7;
const PREMIUM_ECONOMY_WEIGHT_LIMIT = 15;
const BUSINESS_CLASS_WEIGHT_LIMIT = 25;
const FEES_PER_KG = 10;

function getWeightLimit(ticket) {
  if (ticketService.isEconomy(ticket)) return ECONOMY_WEIGHT_LIMIT;
  if (ticketService.isPremiumEconomy(ticket))
    return PREMIUM_ECONOMY_WEIGHT_LIMIT;
  if (ticketService.isBusinessClass(ticket)) return BUSINESS_CLASS_WEIGHT_LIMIT;
}

class BaggageService {
  isThereBaggage(baggage) {
    return baggage !== undefined;
  }
  isWithinWeightLimit(ticket, baggage) {
    return baggage.weight <= getWeightLimit(ticket);
  }
  calculateFees(ticket, baggage) {
    let weightLimit = getWeightLimit(ticket);
    let extraFees = (baggage.weight - weightLimit) * FEES_PER_KG;
    return extraFees;
  }
}

module.exports = BaggageService;
