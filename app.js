import twit from 'twit';
import config from './config.js';

const twitterClient = new twit(config);
const INTERVAL = 1000 * 60 * 60; // s, m, h

const fetchRandomImage = async () => {
  // fetch something
}

const postTweet = (tweetContent) => {
  twitterClient.post(
    'statuses/update',
    { status: tweetContent },
    function (err, data, response) {
      console.log(data)
    }
  );
}

setTimeout(() => {
  const dogImage = fetchRandomImage();
  postTweet(dogImage);
}, INTERVAL);
