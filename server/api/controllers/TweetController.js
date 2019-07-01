/**
 * TweetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// Access all Tweet Secret Token
const Twit = require("twit");
const T = new Twit({
  consumer_key: sails.config.tweet["consumer_key"],
  consumer_secret: sails.config.tweet["consumer_secret"],
  access_token: sails.config.tweet["access_token"],
  access_token_secret: sails.config.tweet["access_token_secret"]
});

let stream;

module.exports = {
  /**
   * `TweetController.create()`
   */
  create: async function(req, res) {
    const { searchData } = req.body;
    stream && stream.stop();

    stream = T.stream("statuses/filter", { track: searchData });
    stream.on("tweet", async function(tweet) {
      let tweetData = {
        created_at: tweet.created_at,
        text: tweet.text,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        profile_image_url: tweet.user.profile_image_url,
        done: false
      };

      try {
        /**
         * Save the Tweet for later use;
         */
        const newTweet = await Tweet.create(tweetData);
        /**
         * Broadcast the tweets
         */
        sails.sockets.broadcast("subscribeToTweet", "newTweet", tweetData);
      } catch (e) {
        console.error(e);
      }
    });

    return res.json({ msg: `started stream for:${searchData}` });
  },

  subscribeToTweet: function(req, res) {
    if (!req.isSocket) {
      return res.badRequest(
        "Only a client socket can subscribe to subscribeToTweet.  But you look like an HTTP request to me."
      );
    }
    stream && stream.stop();

    var socket = sails.sockets.parseSocket(req);
    sails.sockets.join(socket, "subscribeToTweet");
    console.log(
      "Subscribed socket",
      sails.sockets.getId(socket),
      "to",
      "subscribeToTweet"
    );
    return res.ok();
  },

  unsubscribeToTweet: function(req, res) {
    if (!req.isSocket) {
      return res.badRequest(
        "Only a client socket can subscribe to subscribeToTweet.  But you look like an HTTP request to me."
      );
    }
    stream && stream.stop();
    var socket = sails.sockets.parseSocket(req);
    sails.sockets.leaveAll(socket, "UnsubscribeToTweet");
    console.log(
      "UnSubscribed socket",
      sails.sockets.getId(socket),
      "to",
      "subscribeToTweet"
    );
    return res.ok();
  },

  /**
   * `TweetController.update()`
   */
  update: async function(req, res) {
    return res.json({
      todo: "update() is not implemented yet!"
    });
  },

  /**
   * `TweetController.delete()`
   */
  delete: async function(req, res) {
    return res.json({
      todo: "delete() is not implemented yet!"
    });
  },

  /**
   * `TweetController.find()`
   */
  find: async function(req, res) {
    return res.json({
      todo: "find() is not implemented yet!"
    });
  }
};
