const sinon = require('sinon');
const ChangiBot = require("../src/changiBot");
const Ticket = require("../src/model/ticket");
const Baggage = require('../src/model/baggage');

test('should return message "Not Allowed" if there is no input', () => {
  let bot = new ChangiBot();
  let message = bot.checkIn();
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if there is no booking reference number', () => {
  let ticket = new Ticket();
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if booking reference is less than 6 digit', () => {
  let ticket = new Ticket("FTY22");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if booking reference is more than 6 digit', () => {
  let ticket = new Ticket("FTY22XX");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if there is no check in type', () => {
  let ticket = new Ticket("FTY22X", null);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if there is no departure date', () => {
  let ticket = new Ticket("FTY22X", "premium", null);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if check in type is not "economy", "premium economy" or "business class" ', () => {
  let ticket = new Ticket("FTY22X", "budget", "date");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Not Allowed" if departure date format is incorrect', () => {
  let ticket = new Ticket("FTY22X", "economy", "date");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  expect(message).toBe("Not Allowed");
});

test('should return message "Allowed" if input is valid', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "economy", "31/01/2019 1500");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  clock.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Not Allowed" if ticket is not check in 1 hour before the actual flight timing', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}); // 13:30
  let ticket = new Ticket("FTY22X", "economy", "31/01/2019 1400");
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket);
  clock.restore();
  expect(message).toBe("Not Allowed");
});

test('should return message "Allowed" if there is a baggage', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "economy", "31/01/2019 1500");
  let baggage = new Baggage();
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Allowed" if baggage weight is 7KG for economy check in type', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "economy", "31/01/2019 1500");
  let baggage = new Baggage(7);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Allowed" if baggage weight is 15KG for premium economy check in type', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "premium economy", "31/01/2019 1500");
  let baggage = new Baggage(15);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Allowed" if baggage weight is 25KG for business class check in type', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "business class", "31/01/2019 1500");
  let baggage = new Baggage(25);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed");
});

test('should return message "Allowed with 20.0 SGD extra fee" if baggage is 9KG and check in type is "economy"', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "economy", "31/01/2019 1500");
  let baggage = new Baggage(9);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed with 20.0 SGD extra fee");
});

test('should return message "Allowed with 10.0 SGD extra fee" if baggage is 16KG and check in type is "premium economy"', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "premium economy", "31/01/2019 1500");
  let baggage = new Baggage(16);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed with 10.0 SGD extra fee");
});

test('should return message "Allowed with 30.0 SGD extra fee" if baggage is 16KG and check in type is "premium economy"', () => {
  const clock = sinon.useFakeTimers({now: 1548912600000}) // 13:30
  let ticket = new Ticket("FTY22X", "business class", "31/01/2019 1500");
  let baggage = new Baggage(28);
  let bot = new ChangiBot();
  let message = bot.checkIn(ticket, baggage);
  clock.restore();
  expect(message).toBe("Allowed with 30.0 SGD extra fee");
});