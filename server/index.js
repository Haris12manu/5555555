var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.json());

// get the client
const mysql = require('mysql2');

var host = 'localhost';
if(process.env.NODE_ENV == 'production')  {
    host = 'mysql-server'
}


// create the connection to database
const connection = mysql.createConnection({
  host: host,
  user: 'root',
  password: '1234',
  database: 'haris_db'
});

app.get('/User', function (req, res, next) {
    connection.query(
  'SELECT * FROM ris_tb',
  function(err, results, fields) {
    res.json(results);
    
   
    }
  );
  

})

app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO ris_tb (ris_username, ris_email, ris_password) VALUES (?,?,?)",
    [req.body.ris_username,  req.body.ris_email, req.body.ris_password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({error: "Error inserting data into database"});
      } else {
        res.json({message: "Data inserted successfully"});
      }
    }
  );
});



app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})