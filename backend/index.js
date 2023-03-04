const axios = require('axios');
const FormData = require('form-data');
const rateLimit = require('express-rate-limit');
const apiUrl = 'https://dev.pixelsoftwares.com/api.php';
const symbol = 'BTCUSDT';
const token = 'ab4086ecd47c568d5ba5739d4078988f';

const data = new FormData();
data.append('symbol', symbol);
const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100 // 100 requests per window
});
app.use(limiter);
app.get('/letestBidprice', async (req, res) => {
    try {
        let response = await letestBidprice()
        res.send({ letestBidprice: response.data.bidPrice });
    } catch (e) {
        res.status(500).send('Something went wrong!');
    }
})
const server = app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
server.on('connection', (socket) => {
    socket.on('error', (err) => {
      if (err.code === 'ECONNRESET') {
        console.log('Socket hang up error detected. Restarting server...');
        server.close(() => {
          console.log('Server closed.');
          process.exit(1);
        });
      }
    });
  });
server.timeout = 120000;
const letestBidprice = async () => {
    let res
    await axios.post(apiUrl, data, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'token': token
        }
    }).then(response => {
        res = response.data
    }).catch(error => {
        console.error(error);
    })
    return res
}
