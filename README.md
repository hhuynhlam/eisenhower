# Eisenhower
An open-source PWA to manage your tasks with the Eisenhower Method.

---

## Prerequisites

1. [brew](http://brew.sh)
1. [mongodb](https://www.mongodb.com/download-center/v2/community)

### Ruby on Rails
1. [ruby](https://www.ruby-lang.org/en/documentation/installation/)

  ```sh
  brew install ruby
  ```

1. [rbenv](https://github.com/sstephenson/rbenv#installation)

  ```sh
  brew install rbenv
  ```

1. [bundler](https://bundler.io/)

  ```sh
  gem install bundler
  ```

1. Create `.env` file for local development environment variables. Example:

  ```sh
  # Required
  MONGO_URL=mongodb://localhost:27017/eisenhower
  ```

### Node
1. [node](http://nodejs.org/)

  ```sh
  brew install node
  ```

1. [n](https://github.com/tj/n)

  ```sh
  npm install -g n
  ```

1. [yarn](https://yarnpkg.com/en/docs/getting-started)

  ```sh
  brew install yarn
  ```

---

## Setup
1. `git clone https://github.com/hhuynhlam/eisenhower`

### Client
1. `n $(node -p 'require("./package.json").engines.node')`
1. `yarn install`

### Server
1. `rbenv install $(cat .ruby-version) && rbenv global $(cat .ruby-version)`
1. `bundle`

---

## Workflow
1. Start MongoDB
  ```sh
  mongod
  ```

1. Start backend server
  ```sh
  bin/rails server
  ```

1. Start frontend server
  ```sh
  bin/webpack-dev-server
  ```

---

## Deployment

1. Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
1. `heroku login`
1. `heroku git:remote -a eisenhower-hhlab-dev`
1. `git push -f heroku HEAD:master`

