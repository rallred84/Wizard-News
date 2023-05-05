const express = require('express');
const morgan = require('morgan');
const app = express();
const postBank = require('./postBank');
const postList = require('./postList');
const postDetails = require('./postDetails');
const displayError = require('./displayError');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (post.id) {
    res.send(postDetails(post));
  } else {
    next('This post does not exist. Check your post number and try again');
  }
});

const { PORT = 1338 } = process.env;

app.use(express.static('public'));

app.use((req, res, next) => {
  next('This extension does not exist. Check your URL and try again');
});

app.use((err, req, res, next) => {
  res.status(404).send(displayError(err));
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
