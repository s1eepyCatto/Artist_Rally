import http from 'node:http';
import mysql from 'mysql2';
import 'dotenv/config';
 
const PORT = 8000

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

con.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const server = http.createServer((req, res) => {
  if (req.url === '/api' && req.method === 'GET') {
    console.log("hi from the server")
    res.end('This is from the server')
  }
  if (req.url === '/maps' && req.method === 'GET') {
    con.query('SELECT name FROM maps', (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(results));
    });
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))