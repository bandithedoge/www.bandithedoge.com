const { DateTime } = require("luxon");
module.exports = () => DateTime.now().toObject();
