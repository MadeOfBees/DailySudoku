const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

newPuzzleAtMidnight();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});


const apiCall = () => {
  // run newPuzzle api call
  try {
    fetch('/api/puzzles/new', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (err) {
    console.log(err);
  }
}

var i = 0

// the first time this is opened run the api call to create a new puzzle
if (i === 0) {
  apiCall();
  i = 1;
}


function newPuzzleAtMidnight() {
  var now = new Date();
  var night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, 0, 0, 0
  );

  var msToMidnight = night.getTime() - now.getTime();
  setTimeout(function() {
      apiCall(); 
      resetAtMidnight();
  }, msToMidnight);
}
