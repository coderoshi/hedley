(function() {
  var mongoPort, mongoServer, net, outClient, rep, util, zmqUri;

  mongoPort = 27017;

  mongoServer = 'localhost';

  zmqUri = 'tcp://127.0.0.1:3000';

  util = require('util');

  net = require('net');

  rep = require('zmq').socket('rep');

  outClient = net.connect(mongoPort, mongoServer, function() {
    return console.log("Writing to " + mongoPort);
  });

  rep.on('message', function(msg) {
    console.log("ocd: " + msg);
    outClient = net.connect(mongoPort, mongoServer);
    outClient.on('data', function(buf) {
      console.log("to0mq: " + buf);
      return rep.send(buf);
    });
    return outClient.end(msg);
  });

  rep.bind(zmqUri, function() {
    return console.log("Responding to " + zmqUri);
  });

}).call(this);
