const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const cron = require('cron');
const { newPuzzle } = require('./controllers/puzzle-controller');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

function putPuzzleInDB() {
  const req = {
    body: {
      "password": process.env.SPASSWORD
    }
  };
  const res = {
    status: function (status) {
      this.status = status;
      return this;
    },
    json: function (json) {
      this.json = json;
      return this;
    }
  };
  newPuzzle(req, res);
}

const job = new cron.CronJob('0 0 * * *', putPuzzleInDB);
job.start();

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});