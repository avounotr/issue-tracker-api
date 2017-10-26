const axios = require('axios');
const express = require('express');
const cors = require('cors');
const env = require('node-env-file');

const app = express();
app.use(cors());
env('./.env');

const port = 3333;

app.get('/access_token', function (req, res) {
  const { code } = req.query;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId, client_secret: clientSecret, code,
  }).then(({ data }) => {
    if (data.indexOf('access_token') !== -1) {
      const accessToken = data.split('access_token=')[1].split('&')[0];
      res.send({ accessToken });
    } else {
      throw new Error(data);
    }
  });
});

app.listen(port);
