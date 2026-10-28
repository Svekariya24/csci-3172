const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Cookie counter is running. Visit <a href="/visit-count">/visit-count</a>.');
});

app.use(cookieParser());

app.get('/visit-count', (req, res) => {
  const visits = parseInt(req.cookies.visits, 10) || 0;
  const newCount = visits + 1;

  res.cookie('visits', newCount, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  });

  res.send(`You have visited this page ${newCount} time(s).`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
