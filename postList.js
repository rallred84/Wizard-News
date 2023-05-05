const timeAgo = require('node-time-ago');

const postList = (posts) => {
  return `<!DOCTYPE html>
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
  </html>`;
};

module.exports = postList;
