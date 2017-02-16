const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

const start = (res) => {
  console.log('Request handler "Start" was called.');

  const body = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
      </head>
      <body>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="upload" multiple="multiple">
          <input type="submit" value="Upload file">
        </form>
      </body>
    </html>

    `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();

};

const upload = (res, req) => {
  console.log('Request handler "Upload" was called.');

  const form = new formidable.IncomingForm();
  console.log('About to parse');
  form.parse(req, (err, fields, files) => {
    fs.renameSync(files.upload.path, '/tmp/test.png');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('received image: <br>');
    res.write('<img src="/show">');
    res.end();
  });
};

const show = (res) => {
  console.log('Request handler "show" was called.');
  fs.readFile('/tmp/test.png', 'binary', (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write(`${err}`);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(file, 'binary');
      res.end();
    }
  });
};

exports.start = start;
exports.upload = upload;
exports.show = show;
