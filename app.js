import twit from 'twit';
import config from './config.js';

const twitterClient = new twit(config);

const postTweet = (tweetContent) => {
  twitterClient.post(
    'statuses/update',
    { status: tweetContent },
    function (err, data, response) {
      console.log(data)
    }
  );
}

postTweet('https://cdn.shibe.online/shibes/fc962a6218715fd998d41fc4f551863ed45635a4.jpg')