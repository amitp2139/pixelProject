const { exec } = require('child_process');
const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.get('/letestBidprice', async (req, res) => {
    try {
        const curlCommand = 'curl -X POST https://dev.pixelsoftwares.com/api.php -H "token: ab4086ecd47c568d5ba5739d4078988f" -F "symbol=BTCUSDT"';
        exec(curlCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            res.send({ letestBidprice: JSON.parse(stdout).data.bidPrice })
        });

    } catch (e) {
        res.status(500).send('Something went wrong!');
    }
})
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
