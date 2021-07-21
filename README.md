## ManyShiba Bot 🐕

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1a88ec1-3ed1-451e-9f20-d170a3f725ec/deploy-status)](https://app.netlify.com/sites/manyshiba/deploys)

[@ManyShibu](https://twitter.com/manyshiba) Twitter bot posting random (sacred) Shiba Inu pictures.

### 🛠️ Built with:
 - [Shibe.online API](https://shibe.online/)
 - [Node.js](https://nodejs.org/)
 - [twit](https://www.npmjs.com/package/twit)

## ⚙️ Setup

1. [Register a Twitter App](https://developer.twitter.com/) and enable Read/Write permissions in the app settings
2. Create an `.env` file in the root of the project based on `.env.example`
3. `npm install`
4. `npm start`

## Deploying to Heroku

1. Create new heroku app

   ```bash
   heroku create app-name
   ```

2. Set Heroku environment variables

   ```bash
   heroku config:set TWITTER_API_KEY=XXXXX
   heroku config:set TWITTER_API_SECRET=XXXXX
   heroku config:set TWITTER_API_ACCESS_TOKEN=XXXXX
   heroku config:set TWITTER_API_ACCESS_TOKEN_SECRET=XXXXX
   ```

3. Push to Heroku

   ```bash
   git push heroku master
   ```

---

> [spencerlepine.com](https://www.spencerlepine.com) &nbsp;&middot;&nbsp; GitHub [@spencerlepine](https://github.com/spencerlepine) &nbsp;&middot;&nbsp; Twitter [@spencerlepine](http://twitter.com/spencerlepine)