import twit from 'twit';
import config from './config.js';
import fetch from 'node-fetch';
import http from 'http';

const twitterClient = new twit(config);

const INTERVAL = 1000 * 60 * 60; // s, m, h
const API_ENDPOINT = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false';

const urlToBase64 = async (imgUrl, callback) => {
  await http.get(imgUrl, async (httpRes) => {
    httpRes.setEncoding('base64');
    let body = "data:" + httpRes.headers["content-type"] + ";base64,";
    let withoutPrefix = "";
    await httpRes.on('data', (data) => {
      body += data;
      withoutPrefix += data;
    });
    await httpRes.on('end', () => {
      callback(withoutPrefix);
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

const fetchRandomImage = async () => {
  const resultList = await fetch(API_ENDPOINT).then(res => res.json());
  const newImage = resultList[0];

  // Convert the image to base64
  var b64content;
  await urlToBase64(newImage, (result) => {
    tweetImage(result);
  });

  return b64content;
}

const tweetImage = (tweetContent) => {
  if (tweetContent) {
    twitterClient.post('media/upload', { media_data: tweetContent }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var altText = "Shiba Inu"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      twitterClient.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: '', media_ids: [mediaIdStr] }

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
