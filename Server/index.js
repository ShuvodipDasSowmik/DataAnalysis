require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
// const https = require('https')
const bodyParser = require('body-parser')
const crypto = require('crypto')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const axios = require('axios');
const { access } = require('fs');

const url = `${process.env.API_URL}?$api_key=${process.env.API_KEY}&columns=day,application,package_name,network,country,attempts,responses,fill_rate,impressions,estimated_revenue,ecpm&start=2024-11-17&end=2024-11-19&format=json`


const PORT = 4000 || process.env.PORT

let Data = []

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.get('/', async(req, res) => {
    await axios.get(process.env.API_URL, {
        params: {
            api_key: process.env.API_KEY,
            columns: 'day,application,package_name,network,country,attempts,responses,fill_rate,impressions,estimated_revenue,ecpm',
            start: '2024-11-11',
            end: '2024-11-19',
            format: 'json'
        }
    })
        .then(response => {
            console.log(response.data)
            res.json(response.data);
            Data = response.data;
        })
        .catch(error => console.error('Error:', error.response ? error.response.data : error.message));
})



const timestamp = Math.floor(Date.now() / 1000);
const timestampHash = crypto.createHash('md5').update(timestamp.toString()).digest('hex');
const token = crypto.createHash('md5').update(process.env.SECRET + timestampHash).digest('hex');

app.get('/revenue', async(req, res) => {
    await axios.get(process.env.REV_URL, {
        params: {
            skey: process.env.SKEY,
            time: timestamp,
            sign: token,
            start: "20241010",
            end: "20241203"
        }
    })
    .then(response => {
        console.log(response.data.data.lists);
        res.json(response.data.data.lists);        
    })
})

const spendToken = crypto.createHash('md5').update(process.env.SPEND_KEY + timestampHash).digest('hex');


app.get('/spend', async(req, res) => {
    await axios.get(process.env.SPEND_URL, {
        headers: {
            // api_key: process.env.SPEND_KEY,
            // timestamp: timestamp,
            // token: spendToken,
        },
        params: {
            api_key: process.env.SPEND_KEY,
            // timestamp: timestamp,
            // token: spendToken,
            start_date: "2024-11-17",
            end_date: "2024-11-19",
            page: 1,
            per_page: 50,
            utc: "+8",
        }
    })
    .then(response => {
        console.log(response.data);
        res.json(response.data);
    })
})