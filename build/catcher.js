(function() {
  var mongoPort, mongoServer, net, rep, zmqUri;

  mongoPort = 27017;

  mongoServer = 'localhost';

  zmqUri = 'tcp://127.0.0.1:3000';

  net = require('net');

  rep = require('zmq').socket('rep');

  rep.on('message', function(msg) {
    var outClient;
    outClient = net.connect(mongoPort, mongoServer);
    outClient.on('data', function(buf) {
      return rep.send(buf);
    });
    return outClient.end(msg);
  });

  rep.bind(zmqUri);

}).call(this);
