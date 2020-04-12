const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = 3000;

const app = express();

app.listen(port, () => console.log(`This app listening at http://localhost:${port}`))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
