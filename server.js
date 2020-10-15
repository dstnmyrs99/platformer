const express = require("express");
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log('Server listening on http://localhost:8080');
});
