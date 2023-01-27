const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const schedule = require('node-schedule');
const app = express();
const PORT = process.env.PORT || 3001;
const {newPuzzle} = require('./controllers/puzzle-controller.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

const putPuzzleInDB = async () => {
  const reqBody = { password: process.env.SPASSWORD };
  const reqParams = { num: 42 };
  const req = { body: reqBody, params: reqParams };
  const res = { status: (code) => { return { json: (message) => { console.log('Puzzle created successfully and added to DB'); } } } };
  try {
    await newPuzzle(req, res);
  } catch (error) {
    console.log(error);
  }
};

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.tz = 'America/New_York';
schedule.scheduleJob(rule, putPuzzleInDB);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
});
