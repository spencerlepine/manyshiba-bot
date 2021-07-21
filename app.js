import twit from 'twit';
import config from './config.js';
import fetch from 'node-fetch';
import fs from 'fs';

const twitterClient = new twit(config);

const INTERVAL = 1000 * 60 * 60; // s, m, h
const API_ENDPOINT = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';

const fetchRandomImage = async () => {
  const resultList = await fetch(API_ENDPOINT).then(res => res.json());
  const newImage = resultList[0];

  var b64content = fs.readFileSync(newImage, { encoding: 'base64' })
  return b64content;
}

const tweetImage = (tweetContent) => {
  if (tweetContent) {
    twitterClient.post('media/upload', { media_data: tweetContent }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var altText = "Small flowers in a planter on a sunny balcony, blossoming."
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      twitterClient.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { media_ids: [mediaIdStr] }

          twitterClient.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })
  }
}

setTimeout(async () => {
  const dogImage = await fetchRandomImage();
  tweetImage(dogImage);
}, INTERVAL);

const dogImage = await fetchRandomImage();
tweetImage(dogImage);