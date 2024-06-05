const mongoose = require('mongoose');

//Model tweets for comments collection
const tweetSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: Date,
    tweetContent: String,
    isLiked: Boolean,
    likeNumber: Number,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;