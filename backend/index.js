const { exec } = require('child_process');
const express = require('express');
const app = express();
const mysql = require('mysql')
const rateLimit = require("express-rate-limit");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pixel'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('connected to db successfully');
})
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 3000, // limit total number of requests to 3000 per windowMs
    keyGenerator: function(req) {
      // generate a unique key based on the user's IP address
      return req.ip;
    }
  });
app.use(limiter);
app.get('/letestBidprice', async (req, res) => {
    try {
        const curlCommand = 'curl -X POST https://dev.pixelsoftwares.com/api.php -H "token: ab4086ecd47c568d5ba5739d4078988f" -F "symbol=BTCUSDT"';
        exec(curlCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            let reqBody = {
                bid_value: JSON.parse(stdout).data.bidPrice
            }
            let query1 = 'INSERT INTO bid_price SET ?'
            db.query(query1, reqBody, (error) => {
                if (error) throw error
            })
            let query = 'SELECT bid_value FROM bid_price ORDER BY id DESC LIMIT 6 OFFSET 1'
            let bidArray = []
            db.query(query, (error,result) => {
                if (error) throw error
                result.map((value)=>{
                    bidArray.push(value.bid_value)
                })
                res.send({ letestBidprice: JSON.parse(stdout).data.bidPrice,bidArray })
            })
        });

    } catch (e) {
        res.status(500).send('Something went wrong!');
    }
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
