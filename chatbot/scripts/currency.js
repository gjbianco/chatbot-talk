var http = require('axios');

module.exports = function(robot) {

  robot.respond(/convert (.*)/i, function(res) {
    http.get('http://api.fixer.io/latest?base=USD')
    .then(function(conversion) {
      res.reply(res.match[1] * conversion.data.rates.EUR);
    });
  });

};
