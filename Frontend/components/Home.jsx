import styles from '../styles/Home.module.css';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tweet from './Tweet';
import { logOutUser } from '../reducers/user'
import moment from 'moment'
import Trends from './Trends';
import { addTweet, deleteTweet, setAllTweets } from '../reducers/allTweets';




export default function Home() {
    const dispatch = useDispatch()
    const [tweet, setTweet] = useState('')
    const [tweets, setTweets] = useState([])
    const user = useSelector(state => state.user);
    console.log(tweets)

    useEffect(() => {
        fetch("http://localhost:3000/tweets/all")
            .then((response) => response.json())
            .then((data) => {
                setTweets(data.data);
                dispatch(setAllTweets(data.data))
            });
    }, []);

    function sendTweet() {
        fetch("http://localhost:3000/tweets/tweetContent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user.username,
                tweetContent: tweet
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setTweets([...tweets, data.data]);
                    dispatch(addTweet(data.data))
                    console.log("Tweet added =>", data.data)
                    setTweet('');
                }
            })
    }

    function removeTweet(tweetId) {

        fetch(`http://localhost:3000/tweets/removeTweet`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: tweetId
            })
        }).then(response => response.json())
            .then(() => {
                setTweets(tweets.filter(tweet => tweet._id !== tweetId));
                dispatch(deleteTweet(tweetId))
            })
    }

    const allTweets = tweets.map((tweet, i) => {
        let time = moment(tweet.date).fromNow()
        let isOwner = false
        let liked = false;

        if (tweet.user.username === user.username) {
            isOwner = true;
        }
        if (user.likedTweets.includes(tweet._id)) {
            liked = true;
        }






        return (
            <Tweet id={tweet._id}
                firstname={tweet.user.firstname}
                username={tweet.user.username}
                date={time}
                isOwner={isOwner}
                liked={liked}
                tweet={tweet.tweetContent}
                removeTweet={() => removeTweet(tweet._id)}
                likeNumber={tweet.likeNumber}
                key={i}

            />)

    })

    return (
        <div className={styles.boardContainer}>
            <div className={styles.leftBoard}>
                <div className={styles.leftTop} >
                    <img className={styles.logo} src="/logo_twitter.webp" />
                </div>
                <div className={styles.leftBottom}>
                    <div className={styles.subleftBottom}>
                        <div className={styles.profilPic}>
                            <Image className={styles.profilPic} src="/egg.jpeg"
                                height={57}
                                width={60} />
                        </div>
                        <div>
                            <p className={styles.firstname}>{user.firstname}</p>
                            <p className={styles.username}>@{user.username}</p>
                        </div>
                    </div>
                    <div>
                        <button type='button' onClick={() => dispatch(logOutUser())} className={styles.logout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={styles.mainBoard}>
                <div className={styles.header}>
                    <h3 className={styles.homeTitle}>Home</h3>
                    <input onChange={(e) => setTweet(e.target.value)} value={tweet} className={styles.tweetInput} type='text' maxLength={280} placeholder="What's up?" ></input>
                    <div className={styles.tweetBtnContainer} >
                        <span className={styles.countTxt}>{tweet.length}/280</span>
                        <button className={styles.tweetBtn} onClick={() => sendTweet()}>Tweet</button>
                    </div>
                </div>
                <div className={styles.tweetContainer}>
                    {allTweets.reverse()}
                </div>
            </div>
            <div className={styles.rightBoard}>
                <Trends />
            </div>
        </div>


    );
}

