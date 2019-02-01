const ALLOWED_MESSAGE = "Allowed";
const NOT_ALLOWED_MESSAGE = "Not Allowed";

class MessageService {
  getAllowedMessage() {
    return ALLOWED_MESSAGE;
  }
  getNotAllowedMessage() {
    return NOT_ALLOWED_MESSAGE;
  }
  getAllowedMessageWithFees(extraFees) {
    return `Allowed with ${extraFees}.0 SGD extra fee`;
  }
}

module.exports = MessageService;
