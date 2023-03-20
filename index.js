const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const mongoService = require('./src/services/mongoService');
const carRouter = require('./src/routes/carRoute');

require('dotenv').config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/cars', carRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  next();
});

mongoService.init().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
});
