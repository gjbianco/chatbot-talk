module.exports = function(robot) {
  robot.hear(/ping/, function(res) {
    res.send('pong');
  });
};
