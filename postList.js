const timeAgo = require('node-time-ago');
const html = require('html-template-tag');

const postList = (posts) => {
  return html`<html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png" />Wizard News</header>
          ${posts.map(
            (post) => html` <div class="news-item">
              <a href="./posts/${post.id}">
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
          )}
        </div>
      </body>
    </html>
  </html>`;
};

module.exports = postList;
