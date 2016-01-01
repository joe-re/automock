const express = require('express');
const app = express();

app.use(express.static(__dirname + '/assets'));

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
