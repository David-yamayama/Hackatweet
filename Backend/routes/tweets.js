var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');
const { checkBody } = require("../modules/checkBody");




router.post("/tweetContent", (req, res) => {

    if (!checkBody(req.body, ['tweetContent'])) {
        return res.json({ result: false, error: 'Missing or empty fields' });
    }

    User.findOne({ username: req.body.username }).then(userFound => {
        if (userFound) {
            const newTweet = new Tweet({
                user: userFound._id,
                tweetContent: req.body.tweetContent,
                isLiked: false,
                likeNumber: 0,
                date: new Date()
            });
            newTweet.save().then(data => {
                data.user = userFound;
                res.json({
                    result: true,
                    data: data
                })
            })
        } else {
            res.json({ result: false, error: "User doesn't exist" })

        }
    });

});


router.get('/all', (req, res) => {
    Tweet.find().populate('user').then(allTweets => {
        res.json({
            result: true, data: allTweets
        })
    })
})



router.patch('/like', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(userFound => {
            if (!userFound) {
                return res.json({ result: false, error: "User not found" });
            }

            if (!userFound.likedTweets.includes(req.body.id)) {
                userFound.likedTweets.push(req.body.id)
                User.updateOne({ username: req.body.username }, { likedTweets: userFound.likedTweets })
                    .then((data => {

                        Tweet.findById(req.body.id).then(tweet => {
                            let newLikedNumber = 0
                            newLikedNumber = tweet.likeNumber + 1
                            Tweet.updateOne({ _id: req.body.id }, { likeNumber: newLikedNumber }).then(data => {
                                res.json({
                                    result: true,
                                    likeNumber: newLikedNumber
                                })
                            })
                        })
                    }))
            } else {
                let newTab = userFound.likedTweets.filter(id => id !== req.body.id);
                User.updateOne({ username: req.body.username }, { likedTweets: newTab })
                    .then((data => {

                        Tweet.findById(req.body.id).then(tweet => {
                            let newLikedNumber = 0
                            newLikedNumber = tweet.likeNumber - 1
                            Tweet.updateOne({ _id: req.body.id }, { likeNumber: newLikedNumber }).then(data => {
                                res.json({
                                    result: true,
                                    likeNumber: newLikedNumber
                                })
                            })
                        })
                    }))
            }
        })
})

router.delete('/removeTweet', (req, res) => {
    Tweet.deleteOne({ _id: req.body.id })
        .then(data => {
            res.json({
                result: true,
                infos: data
            })
        })
})

module.exports = router;


//route patch pour modifier le nombre de like