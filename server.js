const http = require('http');
const url = require('url');

const start = (route, handle) => {

  const onReq = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received.`);
    route(handle, pathname, res, req);
  };

  http.createServer(onReq).listen(8000);
  console.log('Server has started.');

};

exports.start = start;
