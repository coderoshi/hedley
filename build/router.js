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
    inStream.on('connect', function() {});
    inStream.on('data', function(buf) {
      return req.send(buf);
    });
    inStream.on('end', function(buf) {
      return console.log('client disconnected');
    });
    return req.on('message', function(msg) {
      return inStream.write(msg);
    });
  });

  console.log("Listing on " + connPort);

  inServer.listen(connPort, connServer);

}).call(this);
