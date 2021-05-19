# This app's architecture

This app contains:

* Two CRUD (Create, Read, Update, and Delete) apps
   * A personal relationship manager
   * A journal inspired by [OhLife](http://ohlife.com/index.php)
* A blog

## High-level infrastructure

The application host is [NearlyFreeSpeech.NET](https://www.nearlyfreespeech.net/), the runtime is [Node.js](https://nodejs.org/en/), and the web server is [Express.js](http://expressjs.com/).

## The blog

Blog posts are written in [Markdown](https://daringfireball.net/projects/markdown/), [markdown-styles](https://github.com/mixu/markdown-styles) converts them into HTML files, and [serve-index](https://github.com/expressjs/serve-index) serves the list of files.

## The CRUD apps

The front-end is written using [React](https://reactjs.org/) and [React Router](https://reactrouter.com/web/guides/philosophy). [Axios](https://axios-http.com/) sends network requests to the back-end, which in turn uses [MariaDB's Node.js connector](https://mariadb.com/kb/en/about-mariadb-connector-nodejs/) to talk to a MariaDB database.

The CRUD apps require authentication.

### The journal

[nodemailer](https://nodemailer.com/about/) periodically sends a randomly-selected journal entry using an email server.