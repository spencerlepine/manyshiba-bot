import twit from 'twit';
import config from './config.js';
import fetch from 'node-fetch';

const twitterClient = new twit(config);

const INTERVAL = 1000 * 60 * 60; // s, m, h
const API_ENDPOINT = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';

const fetchRandomImage = async () => {
  const resultList = await fetch(API_ENDPOINT).then(res => res.json());
  const newImage = resultList[0];
  return newImage;
}

const postTweet = (tweetContent) => {
  if (tweetContent) {
    twitterClient.post(
      'statuses/update',
      { status: tweetContent },
      function (err, data, response) {
        console.log(data)
      }
    );
  }
}

setTimeout(async () => {
  const dogImage = await fetchRandomImage();
  postTweet(dogImage);
}, INTERVAL);
