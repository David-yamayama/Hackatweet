const mongoose = require('mongoose');

//Model tweets for comments collection
const tweetSchema = mongoose.Schema({
    hashtags: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;