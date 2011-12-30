(function() {
  var connPort, connServer, inServer, net, req, util, zmqUri;

  connPort = 1337;

  connServer = 'localhost';

  zmqUri = 'tcp://127.0.0.1:3000';

  util = require('util');

  net = require('net');

  req = require('zmq').socket('req');

  req.connect(zmqUri);

  console.log("Requesting from " + zmqUri);

  inServer = net.createServer(function(inStream) {
    inStream.on('connect', function() {
      return console.log('is connected');
    });
    inStream.on('data', function(buf) {
      console.log("isd: " + buf);
      return req.send(buf);
    });
    inStream.on('end', function(buf) {
      return console.log('is ended');
    });
    return req.on('message', function(msg) {
      console.log("to0mq: " + (msg.toString()));
      return inStream.write(msg);
    });
  });

  console.log("Listing on " + connPort);

  inServer.listen(connPort, connServer);

}).call(this);
