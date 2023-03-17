import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BidPrice() {
  const [latestBidPrice, setLatestBidPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/letestBidprice');
        setLatestBidPrice(response.data.letestBidprice);
      } catch (error) {
        console.error(error);
      }
    };
    // const interval = setInterval(() => {
      fetchData();
    // }, 1000);
    // return () => clearInterval(interval);
  });

  return (
    <div style={{ textAlign: "center",paddingTop: '150px' }}>
        <h3>Latest Price From CoinMarketCap</h3>
        <h3>Connection Status:<b>Connection Stabalished</b></h3>
      <h3>Latest Bid Price: {latestBidPrice}</h3>
    </div>
  );
}

export default BidPrice;
