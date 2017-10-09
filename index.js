const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();

const staticFileMiddleware = express.static('./');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', (req, res) => {
  res.send('login');
});

const port = 3092;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
