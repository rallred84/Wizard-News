const express = require('express');
const morgan = require('morgan');
const app = express();
const postBank = require('./postBank');
const timeAgo = require('node-time-ago');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  const posts = postBank.list();

  res.send(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts
          .map(
            (post) => `
          <div class='news-item'>
            <a href='./posts/${post.id}'>
              <p>
                <span class="news-position">${post.id}. ▲</span>
                ${post.title}
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${timeAgo(post.date)}
              </small>
            </a>
          </div>`
          )
          .join('')}
      </div>
    </body>
  </html>`
  );
});

app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (post.id) {
    res.send(
      `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <a href='/'>
          <header><img src="/logo.png"/>Wizard News</header>
        </a>
          <div class='news-item'>
            <p>
              ${post.title}
              <small>(by ${post.name})</small>
            </p>
            <p>${post.content}</p>
          </div>
      </div>
    </body>
  </html>`
    );
  } else {
    next('This post does not exist. Check your post number and try again');
  }
});

const { PORT = 1338 } = process.env;

app.use(express.static('public'));

app.get('/:anyExtension', (req, res, next) => {
  if (req.params.anyExtension !== 'posts/') {
    next('This extension does not exist. Check your URL and try again');
  }
});

app.use((err, req, res, next) => {
  res.status(404).send(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <a href='/'>
          <header><img src="/logo.png"/>Wizard News</header>
        </a>
          <div class='news-item'>
            <p>${err}</p>
          </div>
      </div>
    </body>
  </html>`
  );
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
