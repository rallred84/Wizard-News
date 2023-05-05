const html = require('html-template-tag');

const displayError = (err) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <a href="/">
            <header><img src="/logo.png" />Wizard News</header>
          </a>
          <div class="news-item">
            <p>${err}</p>
          </div>
        </div>
      </body>
    </html>`;
};

module.exports = displayError;
