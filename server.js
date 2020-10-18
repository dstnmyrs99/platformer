const express = require("express");
const app = express();
const Pool = require('pg').Pool


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
ssl: {
  rejectUnauthorized: false
},
});

//client.connect();

const query = `
SELECT * FROM scores ORDER BY score DESC
`;

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/scores', function (req, res) {
    console.log('server');
  pool.query(query, (err, results) => {
    res.json(results.rows)
      if (err) {
          console.error(err);
          return;
      }
    });
});

app.post('/newScore', (req, res)=>{
  console.log('working');
  const { name, score } = req.body;
  console.log(name, score);

  pool.query(`INSERT INTO scores(name, score) VALUES ($1, $2)`, [name, score], (err, results) => {
      if (err) {
          console.error(err);
          return;
      }
    });
})

app.listen(port, () => {
  console.log('Server listening on http://localhost:8080');
});
